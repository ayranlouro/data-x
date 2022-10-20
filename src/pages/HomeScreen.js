import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";
import AboutScreen from "../pages/AboutScreen";
import DashboardScreen from "../pages/DashboardScreen";
import ServicesScreen from "../pages/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const Logout = logout;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          padding: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 11,
        },
        tabBarActiveTintColor: "#274060",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Servers"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="server" size={size} color={color} />
          ),
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="alert-circle" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="log-out" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
