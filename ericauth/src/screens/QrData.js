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
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navtext}> ERICAUTH </Text>
      </View>
      <View style={styles.qrbox}>
        <View style={styles.child1}>
          <Text style={styles.title}>{qrName}</Text>
        </View>
        <View style={styles.child2}>
          <QRCode size={300} value={qrData} />
        </View>
        <View style={styles.child3}>
          <TouchableOpacity style={styles.btnbox1}>
            <Text style={styles.btntext}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnbox2}>
            <Text style={styles.btntext}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  navtext: {
    color: "white",
    fontSize: 30,
  },
  title: {
    fontSize: 30,
  },
  qrbox: {
    flex: 9,
    alignItems: "center",
  },
  child1: {
    flex: 2.5,
    justifyContent: "center",
  },
  child2: {
    flex: 6,
  },
  child3: {
    flex: 2,
    flexDirection: "row",
  },
  qr: {
    width: "100%",
    height: "100%",
  },
  btnbox1: {
    height: "30%",
    width: "25%",
    backgroundColor: "#21bf73",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "4%",
    marginRight: "4%",
  },
  btnbox2: {
    height: "30%",
    width: "25%",
    backgroundColor: "#fd5e53",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "4%",
    marginRight: "4%",
  },
  btntext: {
    color: "white",
  },
});

export default QrData;
