import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, QrData, Signup } from "../screens";
import EventList from "../screens/EventList";
import Verify from "../screens/Verify";

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="QrData"
        component={QrData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EventList"
        component={EventList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
