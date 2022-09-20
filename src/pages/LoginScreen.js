import React, { useContext, useState } from "react";

import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome";

import * as Animatable from "react-native-animatable";

import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [serverip, setServerip] = useState(null);

  console.log("Username: " + username)
  console.log("password: " + password)
  console.log("serverip: " + serverip)

  const { isLoading, login, StatusUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Usuario do servidor"
          onChangeText={(text) => setUsername(text)}
        ></TextInput>

        <Text style={styles.title}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Senha do servidor"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <Text style={styles.title}>Endereço do Nagios</Text>
        <TextInput
          style={styles.input}
          value={serverip}
          placeholder="Endereço do Nagios (Ex. 192.168.0.1)"
          onChangeText={(text) => setServerip(text)}
        ></TextInput>

        <Button
          title="Acessar"
          style={styles.button}
          onPress={() => {
            login(username, password, serverip);
          }}
        >
        </Button>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38A69D",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38A69D",
    width: "100%",
    borderRadius: 10,
    paddingVertifical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
