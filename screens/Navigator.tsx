import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Test from './Test';
import Result from "./Result";
import Training from './Training';
import Settings from './Settings';
import History from "./History";
import Stats from "./Stats";
import {useColorMode, useColorModeValue} from "native-base";


export default function MainContainer() {
    const Tab = createBottomTabNavigator();
    const {toggleColorMode} = useColorMode();
    const [light, setLight] = useState("white");
    const [dark, setDark] = useState("muted.800");
    const settings = {
        bg: useColorModeValue(light, dark),
        mode: useColorModeValue("light", "dark"),
    };
    const [answers, setAnswers] = useState(null);

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === "Home") {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === "Test") {
                            iconName = focused ? 'reader' : 'reader-outline';
                        } else if (rn === "Trénink") {
                            iconName = focused ? 'barbell' : 'barbell-outline';
                        } else if (rn === "Nastavení") {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === "Historie") {
                            iconName = focused ? 'time' : 'time-outline';
                        } else if (rn === "Statistiky") {
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#66B2FF',
                    inactiveTintColor: 'white',
                    labelStyle: {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, height: '11%', backgroundColor: 'black'},
                }}
            >
                <Tab.Screen name="Home" children={() => <Home settings={settings}/>}/>
                <Tab.Screen name="Test" children={() => <Test settings={settings} setAnswers={setAnswers}/>}/>
                <Tab.Screen name="Výsledek" children={() => <Result settings={settings} answers={answers}/>}
                            options={{headerShown: false} as object}/>
                <Tab.Screen name="Trénink" children={() => <Training settings={settings}/>}/>
                <Tab.Screen name="Historie" children={() => <History settings={settings}/>}/>
                <Tab.Screen name="Statistiky" children={() => <Stats settings={settings}/>}/>
                <Tab.Screen name="Nastavení"
                            children={() => <Settings darkMode={toggleColorMode} settings={settings} setLight={setLight}
                                                      setDark={setDark}/>}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}