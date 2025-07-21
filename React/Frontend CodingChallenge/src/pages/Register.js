import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import RegisterForm from '../components/Auth/RegisterForm';

const Register = () => {
  return (
    <Container text>
      <Segment padded>
        <Header as="h2">Create an Account</Header>
        <RegisterForm />
      </Segment>
    </Container>
  );
};

export default Register;