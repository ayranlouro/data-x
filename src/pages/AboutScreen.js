import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import DefaultImage from "../../assets/logo.png";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
import { Entypo } from "@expo/vector-icons";

const About = () => {
  return (
    <View style={styles.aboutContainer}>
      <View>
        <Image style={styles.imgStyle} source={{ uri: DEFAULT_IMAGE }} />
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.paraStyle}>
          Data-X é um aplicativo desenvolvido para visualizar informações do
          monitoramento de servidores que utilizam como base a ferramenta
          Nagios.
        </Text>
        <View style={[styles.paraStyle]}>
          <Text style={styles.paraStyle}>Desenvolvido por: </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => Linking.openURL("https://github.com/ayranlouro/")}
          >
            <View style={styles.btnView}>
              <Entypo name="github" size={24} color="black" />
              <Text style={styles.btnText}>@ayranlouro</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => Linking.openURL("https://github.com/mtsgsr/")}
          >
            <View style={styles.btnView}>
              <Entypo name="github" size={24} color="black" />
              <Text style={styles.btnText}>@mtsgsr</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: 150,
    height: 150,
    marginVertical: 25,
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
    textAlign: "center",
  },
  aboutLayout: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  btn: {
    alignSelf: "center",
    width: "50%",
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  btnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#274060",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default About;
