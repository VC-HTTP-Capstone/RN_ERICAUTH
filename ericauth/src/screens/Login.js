import React from 'react';
import styled from 'styled-components/native';
import { Button, View, Text } from 'react-native';

const Container = styled.SafeAreaView`
    background-color: #ffffff;
    align-items: center;
`;

const Login = ({ navigation }) => {
    return (
        <Container>
            <Button
                title="go to the signup screen"
                onPress={() => navigation.navigate('Signup')}
            />
        </Container>
    )
}
export default Login;