import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useVideoPlayer, VideoView } from 'expo-video';

// showing video on screen
const VideoPlayer = ({ videoUrl }) => {
    const player = useVideoPlayer(videoUrl, (player) => {
        player.loop = false;
        // player.play();
    })

    return(
        <VideoView player={player} style={styles.video}
        allowsFullscreen
        allowsPictureInPicture />
    )
}

const HomeScreen = () => {
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'video/*', // Hanya video
      });

      console.log(res);

      if (res.type === 'cancel') {
        Alert.alert('Cancelled', 'Video Batal Dipilih');
        return;
      }

      const videoData = res.assets ? res.assets[0] : res;

      setVideo(videoData);
      Alert.alert('Video Dipilih!', `File: ${videoData.name}\nUkuran: ${videoData.size} bytes`);
    } catch (err) {
      Alert.alert('Error', 'Gagal Pilih Video');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pilih Video Input" onPress={pickVideo} color='#000071' />
      {video && (
        <View style={styles.videoInfo}>
          <VideoPlayer style={styles.video} videoUrl={video.uri} />
          <Text>Video Terpilih!</Text>
          <Text>{video.name}</Text>
        </View>
      )}
    </View>
  );
};

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
 */