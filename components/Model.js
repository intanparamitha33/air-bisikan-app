import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';

export default function Model({ inputVideoUri, onDetection }) {
  const webViewRef = useRef(null);
  // const [base64Sent, setBase64Sent] = useState(false); // track if base64 is sent
  const [modelLoaded, setModelLoaded] = useState(false);

  // convert file uri to base64 data
  async function getBase64(videoUri) {
    const info = await FileSystem.getInfoAsync(videoUri);
    console.log("📁 File info:", info);
      
    try {
      const base64Format = await FileSystem.readAsStringAsync(videoUri, { encoding: FileSystem.EncodingType.Base64 });
      // return `data:video/mp4;base64,${base64Format}`;
      console.log("Base64 data in func getBase64:", base64Format.slice(0, 30)); // only for test the base64 data\
      console.log('📁 Base64 generated, length:', base64Format.length);
      return base64Format;
    } catch (err) {
      console.error("❌ Error reading base64:", err);
      return null;
    }
  }

  console.log("Starting test Model.js -", inputVideoUri)
  useEffect(() => {
    console.log("useEffect triggered:", { inputVideoUri, modelLoaded });
    if (inputVideoUri && webViewRef.current   ) {
      // send uri when both WebView & uri are ready
      // webViewRef.current.postMessage(`VIDEO_URI:${inputVideoUri}`);
      console.log("Input video uri: ", inputVideoUri);

      // console.log("Base64 data: ", getBase64(inputVideoUri));

      // konversi base64, lalu kirim ke WV
      getBase64(inputVideoUri).then((base64Video) => {
        console.log("base64 data:", base64Video.slice(0, 100));
        if (base64Video) {
          console.log("📤 Sending base64 to WebView with length:", base64Video.length); // done check the data
          // webViewRef.current.postMessage(`VIDEO_BASE64:${base64Video}`);
          webViewRef.current.postMessage(JSON.stringify({ type: 'VIDEO_BASE64', data: base64Video }));
          // setBase64Sent(true); // prevent re-sending
          console.log("📤 Done sent base64 to WebView!");
        }
      }).catch(err => {
        console.error("❌ Error converting to base64:", err);
      })
    }
  }, [inputVideoUri, modelLoaded])

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      // source={{ uri: 'http://192.168.1.6:8080/index.html' }} // ganti IP-mu -> cek ipconfig wifi
      source={require('../index.html')}
      style={{ flex: 1 }}
      // injectedJavaScript={`
      //   window.postMessage(${JSON.stringify(inputVideoUri)}, "*");
      //   true;
      //   `}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      webviewDebuggingEnabled={true} // enable debugging webview
      onMessage={(event) => {
        const msg = event.nativeEvent.data;
        console.log(msg);

        // handle message non-JSON
        if (msg === "MODEL_LOADED") {
          setModelLoaded(true);
          console.log("✅ Model loaded - ready in WebView - setModelLoaded True");
          return;
        }

        if (msg.startsWith("ERROR:")) {
          const errorMsg = msg.replace("ERROR:", "");
          console.error("WebView Error:", errorMsg);
          onDetection({ error: errorMsg }); // send error to HomeScreen
          return;
        }

        if (msg.startsWith("LOG:")) {
          console.log("WebView Log:", msg.replace("LOG:", "")); // handle log from index.html
          return;
        }

        // parse JSON msg (prediction result)
        try {
          const data = JSON.parse(msg);

          if (data.predictedClass) {
            console.log("Prediction Result:", data.predictedClass);
            console.log("Distances:", data.distances);

            // send result to parent component (HomeScreen) via onDetection
            onDetection(data);
          } else if (data.error) {
            console.error("WebView Error (JSON):", data.error);
            onDetection({ error: data.error }); // handle err in json format
          } else {
            console.warn("Unknown message format:", data);
          }

          // old way - before json value being passed
          // if (msg === "MODEL_LOADED") {
          //   // Model ready, send videoUri
          //   setModelLoaded(true);
          //   console.log("✅ Model loaded - ready in WebView - setModelLoaded True");
          // } else if (msg.startsWith("RESULT:")) {
          //   const result = msg.replace("RESULT:", "");
          //   console.log("Detection Result:", result);
          //   onDetection(result);
          //   // update UI with result
          // } else if (msg.startsWith("ERROR:")) {
          //   // handle errors
          //   console.error("WebView Error:", msg);
          // }
        } catch (error) {
          console.error("❌ Failed to parse WebView message:", error);
          onDetection({ error: "Invalid WebView message format" });
        }
        
      }}
      onLoadEnd={() => console.log("✅ WebView fully loaded")}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error("❌ WebView load error:", nativeEvent);
      }}
    />
  );
}

/*
Versi WebView kirim input berbentuk tensor ke local server utk dilempar ke model

export default function Model({ inputToModel, onDetection }) {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'http://192.168.1.6:8080/index.html' }} // ganti IP-mu -> cek ipconfig wifi
        style={{ flex: 1 }}
        injectedJavaScript={`
          window.postMessage(${JSON.stringify(inputToModel)}, "*");
          true;
          `}
        onMessage={(event) => {
          const detection = event.nativeEvent.data;
          onDetection(detection)
        }}
      />
    );
  }
    */