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
  Alert,
} from "react-native";
import * as config from "../config";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isStudent, setIsStudent] = useState(1);

  const failedLogin = () => {
    Alert.alert("로그인 실패!");
  };

  const getLogin = async () => {
    let url = config.Server_URL + "/api/login";
    if (isStudent === 0) {
      url = config.Server_URL + "/api/login/admin";
    }
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    let response = await fetch(url, options);
    let responseOK = response && response.ok;
    if (responseOK) {
      let data = await response.json();
      AsyncStorage.setItem("email", email, () => {
        console.log("이메일 저장 : ", email);
      });
      console.log(data);
      navigation.navigate("Signup");
    } else {
      failedLogin();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.bgimg}
          source={require("../../assets/Frame2.png")}
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
            flex: 6,
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
          autoComplete="off"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="비밀번호"
          autoComplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.signbox}>
        <TouchableOpacity style={styles.btnbox} onPress={getLogin}>
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
    flex: 3.6,
  },
  loginform: {
    flex: 1.0,
    justifyContent: "center",
    flexDirection: "row",
    padding: "1%",
  },
  textinput: {
    flex: 2.5,
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
    flex: 0.6,
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
    flex: 2,
    width: "100%",
    height: "100%",
    marginLeft: "10%",
  },
  formflex2: {
    flex: 2,
    width: "100%",
    height: "100%",
    marginRight: "10%",
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
    height: "84%",
    width: "80%",
    backgroundColor: "#2D9CDB",
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "white",
  },
});

export default Login;
