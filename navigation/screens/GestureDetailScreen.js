import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import { useLayoutEffect } from "react";
import { useVideoPlayer, VideoView } from 'expo-video';

// showing video on screen
const VideoPlayer = ({ videoUrl }) => {
    const player = useVideoPlayer(videoUrl, (player) => {
        player.loop = false;
        player.play();
    })

    return(
        <VideoView player={player} style={styles.video}
        allowsFullscreen
        allowsPictureInPicture />
    )
}


export default function GestureDetailScreen() {
    const navigation = useNavigation();
    const {
        params: { gesture }
    } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: gesture.name
            // headerTitle: 'Huruf ' + gesture.name
        })
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <VideoPlayer style={styles.video} videoUrl={gesture.video} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        width: Dimensions.get("window").width * (9/10),
        height: 220
    }
})