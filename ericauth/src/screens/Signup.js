import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("um123@naver.com");
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
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
    } else {
    }
  };
  useEffect(() => {
    getQrList();
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navtext}> 인증서 목록 </Text>
      </View>
      <View style={styles.qrbox}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navbar: {
    flex: 1,
    backgroundColor: "#2F3A4D",
    justifyContent: "center",
    alignItems: "center",
  },
  qrbox: {
    flex: 8,
  },
  navtext: {
    color: "white",
  },
});

export default Signup;
