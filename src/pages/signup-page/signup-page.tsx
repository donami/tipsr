import React from 'react';
import styled from '@/lib/styledComponents';
import logo from '../../components/layout/logo-dark.png';
import SignupForm from '../../components/login/signup-form';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <Wrapper>
      <Content>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <h3>Signup</h3>

        <SignupForm />
      </Content>
    </Wrapper>
  );
};

export default SignupPage;

const Wrapper = styled.div`
  background-color: #343434;
  color: #fff;
  border-radius: ${props => props.theme.radius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: #fff;
  padding: ${props => props.theme.spacing.huge};
  color: #343434;
  width: 50%;
  max-width: 500px;

  h3 {
    text-align: center;
    font-weight: 300;
    text-transform: uppercase;
    margin: ${props => props.theme.spacing.small} 0;
  }

  .logo {
    max-width: 250px;
    margin: 0 auto;

    img {
      max-width: 100%;
    }
  }

  .signup-form {
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
