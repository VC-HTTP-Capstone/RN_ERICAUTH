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
import { Fonts } from "../Fonts";
import * as Font from "expo-font";
import { DeviceEventEmitter } from "react-native";

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

  const goBack = () => {
    navigation.navigate("Signup");
  };

  const deleteQr = async () => {
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
    let url = config.Server_URL + "/api/qr/delete";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        qrName: qrName,
      }),
    };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
      DeviceEventEmitter.emit("getDataAgain");
      navigation.navigate("Signup");
    } else {
    }
  };
  useEffect(() => {
    async function fetchdata() {
      await Font.loadAsync({
        BMJUA: require("../../assets/fonts/BMJUA.ttf"),
      });
    }
    fetchdata();
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.child4}>
          <TouchableOpacity onPress={goBack}>
            <Image
              style={styles.backimg}
              source={require("../../assets/back.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.child5}>
          <Text style={styles.navtext}> ERICAUTH </Text>
        </View>
      </View>
      <View style={styles.qrbox}>
        <View style={styles.child1}>
          <Text style={styles.title}>{qrName}</Text>
        </View>
        <View style={styles.child2}>
          <QRCode size={300} value={qrData} />
        </View>
        <View style={styles.child3}>
<<<<<<< HEAD
          <TouchableOpacity
            style={styles.btnbox1}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
=======
          <TouchableOpacity style={styles.btnbox1} onPress={goBack}>
>>>>>>> 3a47f41c73c871a1bb9690cb20a51a9bf484c48d
            <Text style={styles.btntext}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnbox2} onPress={deleteQr}>
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
    alignItems: "center",
    flexDirection: "row",
  },
  navtext: {
    color: "white",
    fontSize: 30,
    marginLeft: "12.5%",
    fontFamily: "BMJUA",
  },
  title: {
    fontSize: 30,
    fontFamily: "BMJUA",
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
    fontFamily: "BMJUA",
  },
  backimg: {
    height: "50%",
  },
  child4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  child5: {
    flex: 4,
  },
});

export default QrData;
