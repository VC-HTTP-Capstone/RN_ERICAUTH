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
import RSAKey from "react-native-rsa";
import JSEncrypt from "jsencrypt";
const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isStudent, setIsStudent] = useState(1);
  const privateKey = "";
  const failedLogin = () => {
    Alert.alert("로그인 실패!");
  };
  const getLogin = async () => {
    let url = config.Server_URL + "/api/login";
    if (isStudent === 0) {
      url = config.Server_URL + "/api/login/admin";
    }
    let privateKey =
      " -----BEGIN RSA PRIVATE KEY-----\
MIIEogIBAAKCAQEAgaNPa/81lCEztBa6ezW5qMuPjestbjDO7mxAZuwrGd4UWP0j\
fbomZ2HnBwbjaBNCt4uPAj8NRtedPYul1CvBNm25jYAgWQvxiqzr36OR3zxeqZYi\
wKMO/ZJpMlzkLNI22ZvPGW/aGJkWHCEiKvGCnl3cLY/OSFjnmGKqbcetZHbfD4za\
GCKHvpe0FdblD5GLhmOB1MoNz0jC7IpMgqdktyoE4V+wDpMbYthheLmIB8i1xTMq\
HCDXbcIdycWxNCOQ4I0HINGYWR4s2JjWInuA0AfQXzZJ1EePSDV7f42Muf4tO7fV\
RXE53YVUCZyFpk72XdpzS70mfVA2urOkifIBewIDAQABAoIBACrYartq0a5vesMe\
b+ugyge7n2psO8ubXgj2xiI+E9Cs0VTH9R7skxzAArcT07zmALrg6Rb4985eHJ3m\
tZv2ChmPEjBuFELZ667Fj/+N8/wv26l48WtxeNbduN7oTJFzuKUbFct2aEKQ9fm+\
CajfwSfOJaL5UFgg6go3MdSuleQJ3OM2xdSuth+uTrj/yZTBXlg+mtmQJyrf1q+9\
xdT7jogxw0YiI4QDPeNFiPv7pLv0l5A7dwiJs+CeRhVEBiy4zfKxY9TKZ+BDMlPY\
QZjiWKHgFB+YzAs60QWVUOvGy/bQWpeMhgKPcRT/9N5q5VD8k8l/mRS1edgEgzBD\
HDPN1KECgYEAwx/LB6URWd8fNgMClm2zjsX4uU5LKmTh5zeQ9JNXWXEnw7jY6k4y\
cc62BC5FzYYfMeaxxXEeRQhEED9MHVyu7do81wITRbeEfIyTEslVcJk3aZbngy/1\
bOW8bybqdQX9zkLymU2IU4QHhRcq6aF81xzhhnQrVBvghigrcm/5LI8CgYEAqhVA\
RfOOneOUHt4iVFimHhwG5k6spJjizDSRFMUsWzhjypdTLL2aXTK0feS03dOTcV/d\
QmSPWuoHc9oQHHXv5rreUTwfa4OjZZyxN2XFpkQLAA4rv6ULH2bLa7yI55q0eeuX\
Q3LnrMMYDFSjlVqy9T+DmktdpWdFSt9UF4uNalUCgYByY20O6kIlwZv2egVGUsF0\
7bJGUBPYopOcjQK5nrcShDefkfn4QidoeJpUERxyxDH9exS0fwAT0Ci2raTdgbw7\
TDlmgpzxvgg5S9/cn5MrE2dcy06lpbPnRzcUomfIet6z0KOQI9fLvhb6ev55QGaD\
ZTcBL5FHGaCihWITEHmvGQKBgAgOOZ0WjAquXLWZj8au7C9A5JLD5ylklFlXpAd3\
z0ICybcus6HK2STQ4fuUeXyIKNOV1sTuPlvv+apjCaBPda1X7G+siVBuS67kXQBi\
sZnOXzcBdND+4Cf8lmXj6BgQG7wqjF+FcbOdCeaLm7PXN+Klv3XvW+AZpA6HxVPY\
KDqBAoGAaUTXDhM+xCVp188BhEXAiN50Ci9IfW8aUEkAiH48MBOH3tB5oGHW8kTZ\
QGPuLOZ9/qZVDuE1lKr7FWw9n9UG5pdmn2Os6Sc+bhGRc9B2DJLIBdxpnHDHflGE\
TCR1uCSbcK/bSkcq5MKKv+vTRW0if4x9czBCd7XuhOMWozl2+dc=\
-----END RSA PRIVATE KEY-----";
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
      AsyncStorage.setItem("privateKey", privateKey, () => {
        console.log("개인키 발급");
      });
      console.log(data);
      if (isStudent === 1) {
        navigation.navigate("Signup");
      } else {
        navigation.navigate("EventList");
      }
    } else {
      failedLogin();
    }
  };

  useEffect(() => {
    let decryptor = new JSEncrypt();
  }, []);
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
    fontFamily: "BMJUA",
  },
});

export default Login;
