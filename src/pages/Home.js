import React, {
  useContext,
  useState,
  useEffect,
  useInterval,
  useRef,
} from "react";
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
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { Font } from "expo";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
import { Buffer } from "buffer";

import { useFocusEffect } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [data, setData] = useState(null);

  const [alarm, setAlarm] = useState({});
  const [isSent, setIsSent] = useState(true);
  const [oldSent, setOldSent] = useState(false);

  const [hostDown, setHostDown] = useState("null");

  var verify = true;

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
    setData(propertyNames);
  };
  // Esta função deixa automática as chamadas de API acima.
  useFocusEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every second! " + Date());
      getData();
      // getNotification();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    const interval2 = setInterval(() => {
      getNotification();
    }, 5000);
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      clearInterval(interval2);
      console.log("Disparado !!!!!!!!!!");
    };
  }, []);

  const getNotification = async () => {
    console.log(verify);
    if (verify) {
      await sendPushNotification(expoPushToken, alarm, "down");
      verify = false;
    }
  };

  // Função que renderiza os itens na tela. (Host + Output de seu monitoramento + icon).
  const Item = ({ user, index, description, status }) => (
    <View style={styles.item}>
      {status == 4 ? setAlarm(user) : null}
      <View style={styles.avatarContainer}>
        {status == 4 ? (
          <Icon name="server-security" size={25} color="red" />
        ) : (
          <Icon name="server-security" size={25} color="green" />
        )}
      </View>

      <TouchableOpacity
      // onPress={async () => {
      //   await sendPushNotification(expoPushToken, user, description);
      //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      // }}
      >
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

async function sendPushNotification(expoPushToken, user, description) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Data-X Alert !",
    body: "Problem with server: " + user,
    data: { someData: "" + description },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

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
