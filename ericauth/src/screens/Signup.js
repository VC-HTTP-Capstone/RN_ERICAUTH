import React from 'react';
import styled from 'styled-components/native';
import { Button, View, Text } from 'react-native';

const Container = styled.SafeAreaView`
    background-color: #ffffff;
    align-items: center;
`;

const Signup = ({ navigation }) => {
    return (
        <Container>
            <Button
                title="go to the login screen"
                onPress={() => navigation.navigate('Login')}
            />
        </Container>
    )
}
export default Signup;