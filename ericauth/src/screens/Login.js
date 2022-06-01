import React, { useState } from "react";
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
} from "react-native";
import * as config from "../config";
import styled from "styled-components/native";

const Login = ({ navigation }) => {
  const [settingModal, setSettingModal] = useState(true);

  const toggleSettingModal = () => {
    setSettingModal(!settingModal);
    console.log(settingModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.bgimg}
          source={require("../../assets/Frame.png")}
        ></ImageBackground>
      </View>
      <View style={styles.loginform}>
        <View style={styles.formflex1}>
          <TouchableOpacity onPress={() => this.toggleSettingModal()}>
            <Image
              style={styles.formbox}
              source={require("../../assets/Student.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 4,
            width: "100%",
            height: "100%",
          }}
        />
        <View style={styles.formflex2}>
          <Image
            style={styles.formbox}
            source={require("../../assets/StudentCouncil.png")}
          />
        </View>
      </View>
      <View style={styles.textinput}></View>
      <View style={styles.signbox}></View>
      <View style={styles.passwordbox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  loginform: {
    flex: 1,
    flexDirection: "row",
  },
  textinput: {
    flex: 3,
    backgroundColor: "blue",
  },
  signbox: {
    flex: 1,
    backgroundColor: "red",
  },
  passwordbox: {
    flex: 1,
    backgroundColor: "blue",
  },
  bgimg: {
    width: "100%",
    height: "100%",
  },
  formbox: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  formflex1: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginLeft: "10%",
  },
  formflex2: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginRight: "10%",
  },
});

export default Login;
