import React, { useLayoutEffect } from "react";
import { FlatList, Linking, SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { gestures } from '../../data/gestures';
import Gesture from "../../components/Gesture";
import { useNavigation } from "@react-navigation/native";
// import { useVideoPlayer, VideoView } from 'expo-video';

// betomoedano - 20.18

// showing video on screen
// const VideoPlayer = ({ videoUrl }) => {
//     const player = useVideoPlayer(videoUrl, (player) => {
//         player.loop = false;
//         player.play();
//     })

//     return(
//         <VideoView player={player} style={styles.video}
//         allowsFullscreen
//         allowsPictureInPicture />
//     )
// }

export default function LibraryScreen() { 
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Kamus BISINDO'
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
            // 2 mandatory props
            // data -> pass the array of items that will be render in the list (source of info)
            // renderItem -> func that returns jsx for rendering each items in the list
            data={gestures}
            renderItem={({ item }) => {
                return <Gesture gesture={item} />
            }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
})
 
/*
SafeAreaView -> memungkinkan tampilan sesuai di layar yang terlihat (misal, tidak di atas sekali)

<Text>Ini adalah layar Kamus BISINDO.</Text>

export default function LibraryScreen({ navigation }) { 
    return (
        <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress = {() => alert('This is the "Library" screen.')}
                style = {{ fontSize: 26, fontWeight: 'bold' }}>
                Library Screen
            </Text>
        </View>
    )
 }
 */

 // const VideoPlayer = ({ videoUrl }) => {
//     return (
//         <View style={styles.container}>
//             <Video
//             style={styles.video}
//             source={{ videoUrl }}
//             // source={{ uri: videoUrl }}
//             controls={true}
//             resizeMode='contain'/>
//         </View>
//     )
// }

// <FlatList 
// // 2 mandatory props
// // data -> pass the array of items that will be render in the list (source of info)
// // renderItem -> func that returns jsx for rendering each items in the list
// data={gestures}
// renderItem={({ item }) => {
//     return (
//         <View style={styles.itemContainer} key={item.id}>
//             <Text style={styles.text}>{item.name}</Text>
//             {/* <Text style={styles.link} onPress={() => Linking.openURL(item.video)}>Open Video</Text> */}
//             {/* <VideoPlayer videoUrl={item.video} /> */}
//         </View>
//     )
// }}
// />