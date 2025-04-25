import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as FileSystem from 'expo-file-system';
import Model from '../../components/Model';

// showing video on screen
const VideoPlayer = ({ videoUrl }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    // player.play();
  })

  return(
    <VideoView 
      player={player} 
      style={styles.video}
      allowsFullscreen
      allowsPictureInPicture 
    />
  )
}

const HomeScreen = () => {
  const [video, setVideo] = useState(null);
  // const [detectionResult, setDetectionResult] = useState(null); // old way - before json value being passed
  const [prediction, setPrediction] = useState(null); // for predictedClass
  const [distances, setDistances] = useState(null); // for distances

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'video/*', // Hanya video yang bisa diupload
        copyToCacheDirectory: true
      })

      console.log("Result Document Picker: ", res);

      if (res.type === "cancel") {
        Alert.alert("Cancelled", "Video Batal Dipilih");
        return;
      }

      const videoData = res.assets ? res.assets[0] : res;
      console.log(res.assets[0].uri)

      const originalUri = videoData.uri;
      const fileName = originalUri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;
      console.log("📁 File asli:", originalUri);
      console.log("📁 Target path:", newPath);

      // copy ke documentDirectory agar stabil
      await FileSystem.copyAsync({ from: originalUri, to: newPath });

      // setVideo(videoData);
      setVideo({ ...videoData, uri: newPath }); // salin semua videoData, ganti uri-nya saja
      setPrediction(null);
      setDistances(null);
      // setDetectionResult(null); // reset deteksi lama
      Alert.alert("Video Dipilih!", `File: ${videoData.name}\nUkuran: ${videoData.size} bytes`);
    } catch (err) {
      Alert.alert("Error", "Gagal Pilih Video");
      console.error(err);
    }
  };

  const clearVideo = () => {
    setVideo(null);
    setPrediction(null);
    setDistances(null);
    console.log("Video is cleared...");
  }

  const handleDetection = (result) => {
    console.log("Model detection result:", result);
    
    try {
      if (result.error) {
        Alert.alert("Error", result.error);
        return;
      }
      // parse JSON from result
      const { predictedClass, distances } = result;
      setPrediction(predictedClass);
      setDistances(distances);
    } catch (error) {
      console.error("Failed to parse detection result:", error);
      Alert.alert("Error", "Failed to proceed detection result");
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pilih Video" onPress={pickVideo} color='#000071'/>
      {video && (
        <View style={styles.videoInfo}>
          <VideoPlayer style={styles.video} videoUrl={video.uri} />
          <Text style={styles.label}>Video Terpilih!</Text>
          <Text style={styles.label}>{video.name}</Text>

          {/* WebView untuk model deteksi */}
          <Model
            inputVideoUri={video.uri}
            onDetection={handleDetection}
          />

          {prediction && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Hasil Deteksi:</Text>
              <Text style={styles.resultText}>{prediction}</Text>
            </View>
          )}

          {distances && (
            <ScrollView style={styles.distancesBox}>
              <Text style={styles.resultText}>Jarak ke Setiap Class:</Text>
              {Object.entries(distances).map(([className, distance]) => (
                <Text key={className} style={styles.distanceText}>
                  {className}: {distance.toFixed(4)}
                </Text>
              ))}
            </ScrollView>
          )}

          {/* {detectionResult && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Hasil Deteksi:</Text>
              <Text style={styles.resultText}>{detectionResult}</Text>
            </View>
          )} */}
        </View>
      )}
      <Button title="Hapus Video" onPress={clearVideo} color='#C0C0C0'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoInfo: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  video: {
    width: Dimensions.get("window").width * 0.9,
    height: 220,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e6e6ff',
    borderRadius: 8,
    width: '90%',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 16,
  },
  distancesBox: {
    marginTop: 10,
    maxHeight: 150,
    width: '100%',
  },
  distanceText: {
    fontSize: 14,
    color: '#333',
  }
});

export default HomeScreen;

// export default function HomeScreen() { 
//     return (
//         <SafeAreaView>
//             <Text>Ini adalah layar Bisikan App.</Text>
//         </SafeAreaView>
//     )
//  }
 /*
SafeAreaView -> memungkinkan tampilan sesuai di layar yang terlihat (misal, tidak di atas sekali)

 export default function InputScreen({ navigation }) { 
    return (
        <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress = {() => navigation.navigate('Input')}
                style = {{ fontSize: 26, fontWeight: 'bold' }}>
                Input Screen
            </Text>
        </View>
    )
 }

 old style

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  videoInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get("window").width * (9/10),
    height: 220,
    marginBottom: 20
  }
});
 */