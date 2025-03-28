import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from 'react-native';
import GestureContent from "./GestureContent";

const Gesture = ({ gesture }) => {
    const { navigate } = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigate('GestureDetailScreen', { gesture })
            }}
        >
            <GestureContent gesture={gesture} />
        </Pressable>
    )
}

export default Gesture; 