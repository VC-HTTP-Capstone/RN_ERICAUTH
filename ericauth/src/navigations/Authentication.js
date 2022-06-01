import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ cardStyle: { backgroundColor: '#ffffff' } }}
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
        </Stack.Navigator>
    );
};

export default AuthNavigation;