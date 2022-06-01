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
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const Login = ({ navigation }) => {
  const [settingModal, setSettingModal] = useState(true);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isStudent, setIsStudent] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.bgimg}
          source={require("../../assets/Frame.png")}
        ></ImageBackground>
      </View>
      <View style={styles.loginform}>
        <View style={styles.formflex1}>
          <TouchableOpacity
            style={styles.formbox}
            onPress={() => setIsStudent(1)}
          >
            {isStudent == 1 ? (
              <Image
                style={styles.formbox}
                source={require("../../assets/Student.png")}
              />
            ) : (
              <Image
                style={styles.formbox}
                source={require("../../assets/StudentOpa.png")}
              />
            )}
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
          <TouchableOpacity
            style={styles.formbox}
            onPress={() => setIsStudent(0)}
          >
            {isStudent == 0 ? (
              <Image
                style={styles.formbox}
                source={require("../../assets/StudentCouncil.png")}
              />
            ) : (
              <Image
                style={styles.formbox}
                source={require("../../assets/StudentCouncilOpa.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="이메일"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.signbox}>
        <TouchableOpacity style={styles.btnbox}>
          <Text style={styles.btntext}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordbox1}></View>
      <View style={styles.passwordbox2}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    flex: 3,
  },
  loginform: {
    flex: 1.2,
    justifyContent: "center",
    flexDirection: "row",
    padding: "1%",
  },
  textinput: {
    flex: 2.8,
    justifyContent: "center",
    alignItems: "center",
  },
  signbox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordbox1: {
    flex: 0.2,
    backgroundColor: "white",
  },
  passwordbox2: {
    flex: 0.8,
    backgroundColor: "#4C5A72",
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
    marginLeft: "5%",
  },
  formflex2: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginRight: "5%",
  },
  input: {
    height: "30%",
    width: "80%",
    paddingLeft: "5%",
    marginBottom: "1%",
    marginTop: "1%",
    backgroundColor: "#F4F5F7",
  },
  btnbox: {
    borderWidth: 1,
    height: "84%",
    width: "80%",
    backgroundColor: "#2D9CDB",
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "white",
    fontSize: "150%",
  },
});

export default Login;
