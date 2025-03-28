import { SafeAreaView, Text } from 'react-native';

export default function HomeScreen() { 
    return (
        <SafeAreaView>
            <Text>Ini adalah layar Bisikan App.</Text>
        </SafeAreaView>
    )
 }

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