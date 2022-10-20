import React, { useContext } from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

import Home from "../pages/Home";
import LogoutScreen from "../pages/LogoutScreen";
import AboutScreen from "../pages/AboutScreen";
import DashboardScreen from "../pages/DashboardScreen";
import ServicesScreen from "../pages/ServicesScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const Logout = logout;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "transparent",
          paddingHorizontal: 5,
          paddingTop: 0,
          paddingBottom: 5,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name="Servers"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="monitor" size={size} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="cloud" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="bar-graph" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="info" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="log-out" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
