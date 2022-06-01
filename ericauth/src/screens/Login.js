import React from 'react';
import styled from 'styled-components/native';
import { Button, Text } from 'react-native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
    return (
        <Container>
            <Text style={{ fontSize: 30 }}>Login Screen</Text>
            <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        </Container>
    );
};

export default Login;

/* import React from 'react';
import styled from 'styled-components/native';
import { Button, View, Text } from 'react-native';

const FooterButton = styled.View`
    height: 60px;
    width: 375px;
    background-color: #4c5a72;
`;
const FooterText = styled.View`
    max-width: 375px;
    text-align: center;
    text-align-vertical: middle;
    font-family: Roboto;
    font-weight: bold;
    font-size: 14px;
    line-height: auto;
`;

const Login = ({ navigation }) => {
    return (
        <View>
            <FooterButton>
                <FooterText>
                    <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
                    <Text>don't have an account? Create one now.</Text>
                </FooterText>
            </FooterButton>
        </View>
    );
};

export default Login; */