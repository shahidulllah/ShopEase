import React from 'react';
import Container from '../Components/Container';
import FormWrap from '../Components/FormWrap';
import LoginForm from './LoginForm';

const LoginPage = () => {
    return (
        <Container>
            <FormWrap>
                <LoginForm/>
            </FormWrap>
        </Container>
    );
};

export default LoginPage;