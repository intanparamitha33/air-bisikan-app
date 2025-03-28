import React from "react";
import { StyleSheet, View, Text } from 'react-native';

const GestureContent = ({ gesture }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{gesture.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    }
})

export default GestureContent;