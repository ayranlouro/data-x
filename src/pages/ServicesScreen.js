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

import DropDownPicker from "react-native-dropdown-picker";

import { useFocusEffect } from "@react-navigation/native";

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("24");
  const [items, setItems] = useState([
    { label: "Time elapsed 24h", value: "24" },
    { label: "Time elapsed 12h", value: "12" },
    { label: "Time elapsed 8h", value: "8" },
    { label: "Time elapsed 4h", value: "4" },
  ]);

  useFocusEffect(() => {
    const interval = setInterval(() => {
      console.log("ALERTS DISPARADO " + Date());
      getListAlerts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getListAlerts = () => {
    if (value === "24") {
      var timestamp = Math.floor(+new Date() / 1000);
      timestamp = timestamp - 86400;
    } else if (value === "12") {
      var timestamp = Math.floor(+new Date() / 1000);
      timestamp = timestamp - 43200;
    } else if (value === "8") {
      var timestamp = Math.floor(+new Date() / 1000);
      timestamp = timestamp - 28800;
    } else {
      var timestamp = Math.floor(+new Date() / 1000);
      timestamp = timestamp - 14400;
    }
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );

    fetch(
      `http://${serverip}/nagios/cgi-bin/archivejson.cgi?query=alertlist&count=10&dateformat=%25d%2F%25m%2F%25y+%25H%3A%25M%3A%25S&starttime=${timestamp}&endtime=-1&servicestates=critical`,
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
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={[styles.dropdown]}
      />
      {isLoading ? (
        <ActivityIndicator style={styles.indicator} size="large" />
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
  dropdown: {
    marginTop: 20,
    width: '90%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginBottom: 5,
    borderRadius: 20,
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
  indicator: {
    flex: 1,
    justifyContent: "center",
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
