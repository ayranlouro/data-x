import React, { useCallback, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import { Buffer } from "buffer";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = () => {
  const { isLoading, username, password, serverip } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
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
      setData(propertyNames);
    } catch (error) {
      alert(error);
    }
  };

  // Esta função deixa automática as chamadas de API acima.
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        getData();
      }, 5000);
      return () => clearInterval(interval);
    }, [getData])
  );

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
          <ActivityIndicator style={styles.indicator} size="large" />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -15,
  },
  indicator: {
    flex: 1,
    marginTop: "60%",
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
    marginLeft: 1,
    justifyContent: "center",
    fontSize: 12,
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 15,
    width: "90%",
    marginLeft: 20,
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
