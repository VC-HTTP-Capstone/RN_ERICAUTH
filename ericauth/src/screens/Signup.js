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

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navtext}> 인증서 목록 </Text>
      </View>
      <View style={styles.qrbox}></View>
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
  qrbox: {
    flex: 8,
  },
  navtext: {
    color: "white",
  },
});

export default Signup;
