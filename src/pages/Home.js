import React, { useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from 'expo-font';
import { Font } from 'expo';
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

  // console.log('username home: ' + username);
  // console.log('password home: ' + password);
  // console.log('serverip home: ' + serverip);

  // console.log(userInfo.data.hostlist);
  // console.log(userInfo);

  const pressHandler = (item) => {
    console.log("Click on: " + item);
  };

  const getHostData = async (hostname) => {
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const response = await axios
      .get(`http://${serverip}/nagios/cgi-bin/statusjson.cgi`, {
        params: {
          query: "host",
          hostname: `${hostname}`,
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        // console.log(res.data.data.host.plugin_output);
        // console.log(res.data.data);
        const output = res.data.data.host.plugin_output;
        console.log("Host: " + hostname + " / Output: " + output);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
      });
  };

  const oneHost = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        <Icon name="server-security" size={25} color="green" />
        {/* <Image
          source={require("../../assets/server1.png")}
          style={styles.avatar}
        /> */}
      </View>
      <TouchableOpacity onPress={() => getHostData(item)}>
        <Text style={styles.name}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const headerComponent = () => {
    return <Text style={styles.bigTitle}>Hosts</Text>;
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView>
      <Spinner visible={isLoading} />
      <Text style={styles.title}>Monitoring Servers</Text>
      <FlatList
        listHeaderComponentStyle={styles.listHeader}
        listHeaderComponent={headerComponent}
        data={userInfo.data.hostlist}
        renderItem={oneHost}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={
          <Text>Maybe there is some error in your API Nagios Server.</Text>
        }
      />

      {/* <Text style={styles.welcome}>Welcome, {userInfo.result.user} !</Text>
      <Button title="Logout" color="red" onPress={logout} /> */}
    </SafeAreaView>
  );
};

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
