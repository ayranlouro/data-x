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

  // setStatePage(true);

  // userInfo.result ? true : false;
  // if (userInfo.result.type_text === "Success") {
  //   setStatePage(true);
  // }else{
  //   setStatePage(false);
  // }

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      /> */}

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

      {/* {userInfo.result ? (
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      ) : ''} */}

      {/* {userInfo.result ? (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Login2"
        component={LoginScreen2}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
    // <NavigationContainer>
  );
};

export default Navigation;
