import React, { useState, useEffect } from "react";
import RSAKey from "react-native-rsa";
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
import { BarCodeScanner } from "expo-barcode-scanner";
import JSEncrypt from "jsencrypt";
import * as JsEncryptModule from "jsencrypt";
import { RSA } from "react-native-rsa-native";

const Verify = ({ navigation }) => {
  const [qrData, setQrData] = useState("null");
  const [qrName, setQrName] = useState("null");
  const [eventName, setEventName] = useState("null");
  const [email, setEmail] = useState("um12@naver.com");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
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
    AsyncStorage.getItem("eventName", (err, result) => {
      setEventName(result);
    });
  };

  const goBack = () => {
    navigation.navigate("EventList");
  };

  const deleteEvent = async () => {
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
    let url = config.Server_URL + "/api/event/delete";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        eventName: eventName,
      }),
    };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
      DeviceEventEmitter.emit("getDataAgain");
      navigation.navigate("EventList");
    } else {
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(data);
    console.log(privateKey);
    let decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);
    console.log(decryptor);
    let decrypted = decryptor.decrypt(data);
    let li = JSON.parse(decrypted);
    console.log(li);
    let url = config.Server_URL + "/api/verify";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        issuer: li.issuer,
        name: li.name,
        paymentStatus: li.paymentStatus,
        phoneNumber: li.phoneNumber,
        studentId: li.studentId,
        team: li.team,
        eventName: eventName,
        eventEmail: email,
      }),
    };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
      if (data.result === "isWrong") {
        Alert.alert("인증 실패", "잘못된 인증서 입니다", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      } else if (data.result === "isAlreadyUsed") {
        Alert.alert("인증 실패", "이미 사용된 인증서 입니다", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      } else if (data.result === "notExisted") {
        Alert.alert("인증 실패", "존재하지 않는 행사입니다", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      } else {
        Alert.alert("인증 성공", "행사 참여 대상입니다.", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      }
    } else {
      Alert.alert("QR 오류 혹은 서버에 장애가 발생했습니다.");
      setScanned(false);
    }
  };

  useEffect(() => {
    async function fetchdata() {
      await Font.loadAsync({
        BMJUA: require("../../assets/fonts/BMJUA.ttf"),
      });
    }
    AsyncStorage.getItem("privateKey", (err, result) => {
      setPrivateKey(result);
    });
    console.log("Get In");

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
          <Text style={styles.title}>{eventName}</Text>
        </View>
        <View style={styles.child2}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              height: 350,
              width: 400,
            }}
          />
        </View>
        <View style={styles.child3}>
          <TouchableOpacity style={styles.btnbox1} onPress={goBack}>
            <Text style={styles.btntext}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnbox2} onPress={deleteEvent}>
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

export default Verify;
