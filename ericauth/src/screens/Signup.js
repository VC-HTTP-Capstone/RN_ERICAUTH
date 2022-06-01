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
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("um123@naver.com");
  const [qrNameList, setQrNameList] = useState([]);
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
      setQrNameList(data.qrNames);
    } else {
    }
  };
  const getQrData = async (qrName) => {
    AsyncStorage.setItem("qrName", qrName, () => {
      console.log("큐알네임 저장 : ", qrName);
    });
    let url = config.Server_URL + "/api/qr/info";
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
      AsyncStorage.setItem("qrData", data.data, () => {
        console.log("큐알네임 저장 : ", data.data);
      });
      navigation.navigate("QrData");
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
    getQrList();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navtext}> 인증서 목록 </Text>
      </View>
      <View style={styles.qrbox}>
        {qrNameList.map((qr, index) => (
          <View style={styles.parent} key={index}>
            <View style={styles.child1}>
              <Image
                style={styles.qrbox2}
                source={require("../../assets/qr.png")}
              />
            </View>
            <View style={styles.child2}>
              <Text style={styles.textbox}>이름 : {qr}</Text>
              <Text style={styles.textbox}>발급 날짜 : 22.06.08</Text>
              <Text style={styles.textbox}>만료 날짜 : 23.06.08</Text>
            </View>
            <View style={styles.child3}>
              <TouchableOpacity
                style={styles.btnbox}
                onPress={() => {
                  getQrData(qr);
                }}
              >
                <Text style={styles.btntext}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    fontFamily: Fonts.BMJUA,
  },
  qrbox: {
    flex: 9,
  },
  navtext: {
    color: "white",
    fontFamily: Fonts.BMJUA,
  },
  qrbox2: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  parent: {
    flex: 1,
    flexDirection: "row",
  },
  child1: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
    marginRight: "3%",
  },
  child2: {
    flex: 5,
    justifyContent: "center",
    marginLeft: "3%",
  },
  child3: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
    marginRight: "3%",
  },
  btnbox: {
    height: "40%",
    width: "80%",
    backgroundColor: "#2D9CDB",
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "white",
    fontFamily: Fonts.BMJUA,
  },
  textbox: {
    marginBottom: "2%",
    marginTop: "2%",
    fontFamily: Fonts.BMJUA,
  },
});

export default Signup;
