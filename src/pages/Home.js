import React, { useContext, useState, useEffect, useInterval } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import { Font } from "expo";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
import { Buffer } from "buffer";

import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const {
    userInfo,
    isLoading,
    logout,
    login,
    setStatusUser,
    StatusUser,
    username,
    password,
    serverip,
  } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [hostModalName, setHostModalName] = useState();
  const [hostOutput, setHostOutput] = useState();
  const [hostOutputStatus, setHostOutputStatus] = useState();
  const [allData, setAllData] = useState();

  const [data, setData] = useState(null);

  const getData = async () => {
    // Função que irá pegar os dados (host + check) via API do servidor Nagios.
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const resp = await fetch(
      `http://${serverip}/nagios/cgi-bin/statusjson.cgi?query=hostlist&details=true`,
      {
        headers: {
          Authorization: "Basic " + token,
        },
      }
    );
    const data = await resp.json();
    const propertyNames = Object.values(data.data.hostlist);
    // console.log(propertyNames)
    setData(propertyNames);
  };
  // Esta função deixa automática as chamadas de API acima.
  useFocusEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every second! " + Date());
      getData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const headerComponent = () => {
    return <Text style={styles.bigTitle}>Hosts</Text>;
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  // Função que renderiza os itens na tela. (Host + Output de seu monitoramento + icon).
  const Item = ({ user, index, description, status }) => (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        {status == 4 ? (
          <Icon name="server-security" size={25} color="red" />
        ) : (
          <Icon name="server-security" size={25} color="green" />
        )}
      </View>

      <TouchableOpacity>
        <Text style={styles.wrapText}>Host: {user}</Text>
        <Text style={styles.wrapText}>{description}</Text>
      </TouchableOpacity>
    </View>
  );

  // Função que passa nas props os valores utilizados acima.
  const renderItem = ({ item, index }) => (
    <Item
      user={item.name}
      index={index}
      description={item.plugin_output}
      status={item.status}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.title}></Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text>Os dados serão carregados em instantes.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000000",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  bigTitle: {
    color: "#333",
    fontSize: 21,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    fontSize: 14,
  },
  item: {
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 10,
  },
  avatarContainer: {
    // backgroundColor: "#D9D9D9",
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 55,
    width: 55,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
});

export default Home;
