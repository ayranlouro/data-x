import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import DefaultImage from "../../assets/logo.png";
const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

const About = () => {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.mainHeader}> Aplicativo de monitoramento </Text>
      <Text style={styles.paraStyle}> Data-X 😀 </Text>

      <View>
        <Image style={styles.imgStyle} source={{ uri: DEFAULT_IMAGE }} />
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> Sobre este aplicativo. </Text>
        <Text style={[styles.paraStyle, styles.aboutPara]}>
          Este aplicativo visa mostrar o monitoramento dos eventos de servidores
          que se comunicam com a aplicação Nagios.
        </Text>
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
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: 50,
    marginBottom: 10,
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
  },
  aboutLayout: {
    backgroundColor: "#070618",
    paddingHorizontal: 30,
    marginVertical: 30,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
});

export default About;
