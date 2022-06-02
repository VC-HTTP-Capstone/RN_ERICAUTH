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
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const EventList = ({ navigation }) => {
  const [email, setEmail] = useState("um12@naver.com");
  const [eventNameList, setEventNameList] = useState([]);
  const getEventList = async () => {
    // console.log("Fetched");
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
    // console.log(email);
    // console.log("Fetched");
    let url = config.Server_URL + "/api/event";
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
      setEventNameList(data.eventNames);
    } else {
    }
  };
  const getVerify = async (eventName) => {
    AsyncStorage.setItem("eventName", eventName, () => {
      console.log("이벤트네임 저장 : ", eventName);
    });
    navigation.navigate("Verify");
  };
  useEffect(() => {
    async function fetchdata() {
      await Font.loadAsync({
        BMJUA: require("../../assets/fonts/BMJUA.ttf"),
      });
    }
    AsyncStorage.getItem("email", (err, result) => {
      setEmail(result);
    });
    fetchdata();
    getEventList();
    console.log(eventNameList);
    DeviceEventEmitter.addListener("getDataAgain", () => {
      getEventList();
    });
  }, [email]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navtext}> 행사 목록 </Text>
      </View>
      <View style={styles.qrbox}>
        {eventNameList.map((event, index) => (
          <View style={styles.parent} key={index}>
            <View style={styles.child1}>
              <Image
                style={styles.qrbox2}
                source={require("../../assets/Event.png")}
              />
            </View>
            <View style={styles.child2}>
              <Text style={styles.textbox}>이름 : {event}</Text>
              <Text style={styles.textbox}>개최 날짜 : 22.06.08</Text>
              <Text style={styles.textbox}>만료 날짜 : 23.06.08</Text>
            </View>
            <View style={styles.child3}>
              <TouchableOpacity
                style={styles.btnbox}
                onPress={() => {
                  getVerify(event);
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

export default EventList;
