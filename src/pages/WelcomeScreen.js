import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require("../../assets/logo.png")}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.containerForm}>
        <Animatable.View delay={300} animation="fadeIn">
          <Text style={styles.title}>
            Monitore seus negócios de qualquer lugar
          </Text>
          <Text style={styles.text}>Faça login para começar</Text>
        </Animatable.View>
        <Animatable.View delay={400} animation="bounceIn">
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login", { screen: "Login" })}
            activeOpacity={0.5}
          >
            <AntDesign name="arrowright" size={32} color="#fff" />
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerLogo: {
    flex: 1.2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    color: "#a1a1a1",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#274060",
    borderRadius: 100,
    padding: 20,
    marginBottom: 50,
  },
});
