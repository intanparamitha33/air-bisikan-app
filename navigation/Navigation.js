import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GestureDetailScreen from './screens/GestureDetailScreen';

// Screen names
const homeName = 'Utama';
const libraryName = 'Kamus';

// Stack navigation for gesture
const LibStack = createNativeStackNavigator();

// For each gesture
function LibStackGroup() {
    return(
        // specify the screen in stack
        <LibStack.Navigator>
            <LibStack.Screen name='LibraryScreen' component={LibraryScreen} />
            <LibStack.Screen name='GestureDetailScreen' component={GestureDetailScreen} />
        </LibStack.Navigator>
    )
}

// Create tab navigator
const Tab = createBottomTabNavigator();

// Create a component that contains the Tab
function TabGroup() {
    // Navigation container which will contains the tabs that we want in app
    return (
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({color, focused, size}) => {
                let iconName;

                if (route.name === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === libraryName) {
                    iconName = focused ? 'list' : 'list-outline';
                }

                return <Ionicons name={iconName} size={24} color={color}/>
            },
            tabBarActiveTintColor: '#000071',
        })}
        >
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={libraryName} component={LibStackGroup} options={{ headerShown: false }}/>
            {/* <Tab.Screen name={libraryName} component={LibraryScreen}/> */}
        </Tab.Navigator>
    )
}

export default function Navigation() { 
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
 }

 /*
 export default function Navigation() { 
    return (
        <NavigationContainer>
            <Tab.Navigator
            // Set which screen will appear first
            initialRouteName = {inputName}
            // Create some screen options so we have flexibility to customize the layout's look
            // route is the location that we're on, inside parenthesis bcs it's an arrow func
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === inputName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routeName === libraryName) {
                        iconName = focused ? 'list' : 'list-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            // Customizing
            tabBarOptions={{ 
                // Set some attr
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 }
             }}
            >

            <Tab.Screen name={inputName} component={InputScreen}/>
            <Tab.Screen name={libraryName} component={LibraryScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
 }
 */