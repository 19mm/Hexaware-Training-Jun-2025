import React from 'react';
import { Container, Header, Segment, Button } from 'semantic-ui-react';
import LoginForm from '../components/Auth/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container text>
      <Segment padded>
        <Header as="h2">User Login</Header>
        <LoginForm />
        <Segment textAlign="center" basic>
          <p>Don’t have an account?</p>
          <Button color="green" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Segment>
      </Segment>
    </Container>
  );
};

export default Login;