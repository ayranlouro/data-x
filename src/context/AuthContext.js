import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import { Buffer } from "buffer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [StatusUser, setStatusUser] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverip, setServerIP] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const login = async (username, password, serverip) => {
    setIsLoading(true);
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
        setUserInfo(userInfo);
        setUsername(username);
        setPassword(password);
        setServerIP(serverip);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setStatusUser("Passed");
      })
      .catch((e) => {
        setIsLoading(false);
        setStatusUser("Failed");
        setErrorStatus(true);
        setErrorMsg(e.message);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
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
        errorStatus,
        setErrorStatus,
        errorMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
