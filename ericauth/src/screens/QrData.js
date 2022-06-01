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

const QrData = ({ navigation }) => {
  const [qrData, setQrData] = useState("null");
  const [qrName, setQrName] = useState("null");
  const [email, setEmail] = useState("um123@naver.com");

  const getData = () => {
    AsyncStorage.getItem("qrData", (err, result) => {
      setQrData(result);
    });
    AsyncStorage.getItem("qrName", (err, result) => {
      setQrName(result);
    });
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Text>{email}</Text>
      <Text>{qrName}</Text>
      <QRCode value={qrData} />
    </View>
  );
};

export default QrData;
