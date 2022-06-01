import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import * as config from "../config";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  let qrNameList = [];
  const getQrList = async () => {
    console.log("Fetched");
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
    console.log(email);
    console.log("Fetched");
    let url = config.Server_URL + "/api/qr";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    let response = await fetch(url, options);
    console.log(response);
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
      console.log(data);
    } else {
    }
  };
  useEffect(() => {
    getQrList();
  });
  return <Text>Hello World!!</Text>;
};

export default Signup;
