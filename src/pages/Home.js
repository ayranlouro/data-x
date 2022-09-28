import React, { useContext, useState, useEffect } from "react";
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
        console.log(res.data.data);

        if (res.data.data.host.status === 4) {
          setHostOutputStatus("CRITICAL");
        } else {
          setHostOutputStatus("");
        }
        // console.log(res.data.data.host.state_type);
        const output = res.data.data.host.plugin_output;
        console.log("Host: " + hostname + " / Output: " + output);
        setHostOutput(output);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getHostData(hostModalName);
      console.log('Disparou...');
    }, 1000)
  }, [])

  const modalOpen = (option, hostname) => {
    if (option === "open") {
      setModalVisible(true);
      getHostData(hostname);
      setHostModalName(hostname);
    } else {
      setModalVisible(false);
    }
  };

  const oneHost = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.avatarContainer}>
        {/* {hostOutputStatus ? (
          <Icon name="server-security" size={25} color="red" />
        ) : (
          <Icon name="server-security" size={25} color="green" />
        )} */}
        <Icon name="server-security" size={25} color="green" />
        {/* <Image
          source={require("../../assets/server1.png")}
          style={styles.avatar}
        /> */}
      </View>
      <TouchableOpacity onPress={() => modalOpen("open", item)}>
        <Text style={styles.name}>{item}</Text>
      </TouchableOpacity>

      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            {hostOutputStatus ? (
              <View style={styles.critical_title}>
                <Text style={styles.text}>
                  {hostOutputStatus}! {hostModalName}{" "}
                </Text>
              </View>
            ) : (
              <View style={styles.ok_title}>
                <Text style={styles.text}>OK! {hostModalName} </Text>
              </View>
            )}

            {/* <View style={styles.warning_title}>
              <Text style={styles.text}>WARNING! {hostModalName} </Text>
            </View> */}

            <View style={styles.warning_body}>
              <Text style={styles.text}>{hostOutput}</Text>
            </View>
            <Button
              title="Back"
              style={styles.button}
              onPress={() => modalOpen("exit")}
            />
          </View>
        </View>
      </Modal>
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
