import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
// import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './navigations/Authentication';
import { ThemeProvider } from 'styled-components/native';
import GlobalStyles, { theme } from './globalStyles';


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <AuthNavigation />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;