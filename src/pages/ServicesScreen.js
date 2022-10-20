import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { Component, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { Buffer } from "buffer";

const BG_IMAGE = "";

const ServiceScreen = () => {
  const {
    userInfo,
    logout,
    login,
    setStatusUser,
    StatusUser,
    username,
    password,
    serverip,
  } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // useEffect(() => {
  //   getListPhotos();
  //   console.log("Request do alerts disparado");
  //   return () => {};
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ALERTS DISPARADO " + Date());
      getListPhotos();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getListPhotos = () => {
    // const apiURL = "https://jsonplaceholder.typicode.com/photos";

    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    fetch(
      `http://${serverip}/nagios/cgi-bin/archivejson.cgi?query=alertlist&count=10&dateformat=%25d%2F%25m%2F%25y+%25H%3A%25M%3A%25S&starttime=1666216620&endtime=-1`,
      {
        headers: {
          Authorization: "Basic " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        const propertyNames = Object.values(resJson.data.alertlist);
        setData(propertyNames);
        console.log(data);
      })
      .catch((error) => {
        console.log("Request API Error", error);
      })
      .finally(() => setisLoading(false));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJB0WbMSMLgru8uY7OI_I5ixwMCSW-p9w4zPFSdWV4As5vQQ9GAYx-&usqp=CAU",
          }}
          resizeMode="contain"
        />
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>
            {"Host: " +
              item.host_name +
              "\n" +
              "Service: " +
              item.description +
              "\n" +
              "Error: " +
              item.plugin_output +
              "\n" +
              "Date: " +
              item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => `key-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
  },
  fontSize: {
    fontSize: 12,
  },
  image: {
    width: 50,
    height: 50,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
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
});

export default ServiceScreen;