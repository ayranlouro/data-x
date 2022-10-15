import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import axios from "axios";
import { Buffer } from "buffer";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const getHostData = async (hostname) => {
  const token = Buffer.from("nagiosadmin:nagiosxi", "utf8").toString("base64");
  const response = await axios
    .get(`http://192.168.0.20/nagios/cgi-bin/statusjson.cgi`, {
      params: {
        query: "hostlist",
        details: "true",
      },
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((res) => {
      let hosts = res.data.data;
      console.log(hosts);
      setData(hosts);
      // console.log(Object.entries(hosts[0]));
    })
    .catch((e) => {
      console.log(`Login error ${e}`);
    });
};

const Item = ({ title, id }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => getHostData("abc")}>
      <Text style={styles.title}>ID: {id}</Text>
      <Text style={styles.title}>Title: {title}</Text>
    </TouchableOpacity>
  </View>
);

const ServiceScreen = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const resp = await fetch(
      "http://192.168.0.20/nagios/cgi-bin/statusjson.cgi?query=hostlist&details=true",
      {
        headers: {
          Authorization: "Basic " + token,
        },
      }
    );
    // const resp = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await resp.json();
    console.log(Object.values(data.data.hostlist))
    const propertyNames = Object.values(data.data.hostlist);
    setData(propertyNames);
  };
  //on first mount, fetch data.
  useEffect(() => {
    getData();
  }, []);

  const Item = ({ user, index, description }) => (
    <View>
      <Text style={styles.title}>
        ({index}) - {user}
      </Text>
      <Text style={styles.item}>Output: {description}</Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <Item user={item.name} index={index} description={item.plugin_output} />
  );

  return (
    <View style={styles.container}>
      {data && <FlatList data={data} renderItem={renderItem} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default ServiceScreen;
