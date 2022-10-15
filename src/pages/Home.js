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

import { NavigationContainer } from "@react-navigation/native";

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
  useEffect(() => {
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
        <Text style={styles.name}>Host: {user}</Text>
        <Text style={styles.name}>{description}</Text>
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
    <SafeAreaView>
      <Spinner visible={isLoading} />
      <Text style={styles.title}>Monitoring Servers</Text>
      <FlatList
        listHeaderComponentStyle={styles.listHeader}
        listHeaderComponent={headerComponent}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
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
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    color: "#000000",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000050",
  },
  warning_body: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  warning_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  critical_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  ok_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
  },
  modalViewBegin: {
    margin: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalViewContainer: {
    backgroundColor: "#292929",
    width: "100%",
    height: 350,
    borderRadius: 15,
  },
  modalSecondText: {
    paddingTop: 15,
    color: "red",
    fontSize: 20,
  },
  modalText: {
    paddingTop: 15,
    color: "#FFF",
    fontSize: 28,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
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
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertifical: 13,
  },
  avatarContainer: {
    // backgroundColor: "#D9D9D9",
    borderRadius: 100,
    height: 89,
    width: 89,
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
