import React, { useContext, useState, useCallback } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [serverip, setServerip] = useState(null);
  const { isLoading, login } = useContext(AuthContext);
  const [isChecked, setChecked] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [eyeName, setEyeName] = useState("eye");

  const handlePress = async () => {
    try {
      login(username, password, serverip);
      if (isChecked === true) {
        storeData();
      } else {
        AsyncStorage.clear();
      }
    } catch (e) {
      alert(e);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("serverip", serverip);
      await AsyncStorage.setItem("checked", isChecked.toString());
    } catch (e) {
      // saving error
      alert(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getData = async () => {
        try {
          const user = await AsyncStorage.getItem("username");
          const pass = await AsyncStorage.getItem("password");
          const server = await AsyncStorage.getItem("serverip");
          const checked = await AsyncStorage.getItem("checked");
          if (user !== null && pass !== null && server !== null) {
            // value previously stored
            setUsername(user);
            setPassword(pass);
            setServerip(server);
            if (checked == "true") {
              setChecked(true);
            }
          }
        } catch (e) {
          // error reading value
          alert(e);
        }
      };

      getData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleEye = () => {
    eyeName == "eye" ? setEyeName("eyeo") : setEyeName("eye");
    secureText ? setSecureText(false) : setSecureText(true);
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "#FFF",
      }}
      enableOnAndroid
      extraScrollHeight={80}
    >
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
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Senha do servidor"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={secureText}
            />
            <AntDesign
              name={eyeName}
              size={25}
              color="#274060"
              style={{
                position: "absolute",
                top: 20,
                right: 10,
                padding: 10,
              }}
              onPress={handleEye}
            />
          </View>
          <TextInput
            style={styles.input}
            value={serverip}
            placeholder="Endereço do Nagios (Ex. 192.168.0.1)"
            onChangeText={(text) => setServerip(text)}
          ></TextInput>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              style={{ marginHorizontal: 10 }}
              color="#274060"
            />
            <Text>Lembrar-me</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
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
