import React from "react";

import { StyleSheet, Text, View, LogBox, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
