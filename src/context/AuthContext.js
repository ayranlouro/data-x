import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";

import Alert from "react-native";

import { Buffer } from "buffer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [StatusUser, setStatusUser] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverip, setServerIP] = useState("");
  
  const login = async (username, password, serverip) => {
    setIsLoading(true);
    // console.log("Username: " + username);
    // console.log("Password: " + password);
    // console.log("ServerIP: " + serverip);
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    const response = await axios
      .get(`http://${serverip}/nagios/cgi-bin/objectjson.cgi`, {
        params: {
          query: "hostlist",
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        let userInfo = res.data;
        // console.log(userInfo.result);
        setUserInfo(userInfo);
        setUsername(username);
        setPassword(password);
        setServerIP(serverip);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setStatusUser("Passed");
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
        setIsLoading(false);
        setStatusUser("Failed");
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    // console.log(AsyncStorage.removeItem("userInfo"));
    setUserInfo({});
    setIsLoading(false);
    setStatusUser("Passed");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        logout,
        username,
        password,
        serverip,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
