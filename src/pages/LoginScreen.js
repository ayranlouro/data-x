import React, { useContext, useState } from "react";

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as Animatable from "react-native-animatable";

import { AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [serverip, setServerip] = useState(null);

  console.log("Username: " + username);
  console.log("password: " + password);
  console.log("serverip: " + serverip);

  const { isLoading, login, StatusUser } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "#FFF",
      }}
      enableOnAndroid
      extraScrollHeight={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <Animatable.View
            delay={300}
            animation="fadeIn"
            style={styles.containerHeader}
          >
            <AntDesign name="login" size={70} color="#274060" />
          </Animatable.View>

          <Animatable.View animation="fadeInUp">
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Usuario do servidor"
              onChangeText={(text) => setUsername(text)}
            ></TextInput>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Senha do servidor"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            ></TextInput>
            <TextInput
              style={styles.input}
              value={serverip}
              placeholder="Endereço do Nagios (Ex. 192.168.0.1)"
              onChangeText={(text) => setServerip(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                login(username, password, serverip);
              }}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  containerHeader: {
    marginTop: 80,
    marginBottom: 50,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    padding: 12,
  },
  button: {
    backgroundColor: "#274060",
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 24,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
