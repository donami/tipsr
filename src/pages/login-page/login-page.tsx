import React, { Fragment } from 'react';
import Login from '@/components/login/login';
import styled from '../../lib/styledComponents';

import logo from '../../components/layout/logo-dark.png';

const LoginPage = () => {
  return (
    <Wrapper>
      <LoginContainer>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Login />
      </LoginContainer>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  background-color: #343434;
  color: #fff;
  border-radius: ${props => props.theme.radius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  background: #fff;
  padding: ${props => props.theme.spacing.huge};
  color: #343434;
  width: 50%;
  max-width: 500px;

  .logo {
    max-width: 250px;
    margin: 0 auto;

    img {
      max-width: 100%;
    }
  }

  .login-form {
    max-width: 250px;
    margin: 0 auto;

    input,
    button {
      width: 100%;
    }

    label {
      text-transform: uppercase;
    }
  }
`;
