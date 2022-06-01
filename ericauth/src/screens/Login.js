import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import styled from "styled-components/native";
import { Button, Text } from "react-native";
import * as config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  //   useEffect(() => {
  //     console.log(email);
  //     console.log(password);
  //   }, [text, number]);

  const getLogin = async () => {
    AsyncStorage.setItem("nickname", "User1", () => {
      console.log("유저 닉네임 저장 완료");
    });

    AsyncStorage.getItem("nickname", (err, result) => {
      console.log(result); // User1 출력
    });

    AsyncStorage.setItem("nickname", "User2", () => {
      console.log("유저 닉네임 저장 완료");
    });

    AsyncStorage.getItem("nickname", (err, result) => {
      console.log(result); // User1 출력
    });

    let url = config.Server_URL + "/api/login";
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
      console.log(data);
    } else {
      alert("로그인 실패!");
    }
  };
  return (
    <Container>
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
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button title="Signup" onPress={getLogin} />
      {/* <Button title="Signup" onPress={() => navigation.navigate("Signup")} /> */}
      <QRCode value="http://awesome.link.qr" />
    </Container>
  );
};

export default Login;
