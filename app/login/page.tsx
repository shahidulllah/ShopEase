import React from 'react';
import Container from '../Components/Container';
import FormWrap from '../Components/FormWrap';
import LoginForm from './LoginForm';
import { getCurrentUser } from '@/actions/getCurrentUser';

const LoginPage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    );
};

export default LoginPage;