import React, { useContext, useState } from "react";
import { Text, View, StatusBar } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../pages/LoginScreen";
import LoginScreen2 from "../pages/LoginScreen";
import HomeScreen from "../pages/HomeScreen";
import WelcomeScreen from "../pages/WelcomeScreen";

import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo.result.type_text);
  const [StatePage, setStatePage] = useState();

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {userInfo.result ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
    // <NavigationContainer>
  );
};

export default Navigation;
