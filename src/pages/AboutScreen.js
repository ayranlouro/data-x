import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

export default function About() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About Screen!!!</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});
