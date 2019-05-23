import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import login from '@/mutations/login';
import { withRouter } from 'react-router-dom';
import Button from '../ui/button';
import Input from '../ui/input';
import { useToasts } from '@/components/toasts/toast-manager';
import Field from '../ui/field';
import styled from '@/lib/styledComponents';
import getCurrentCredential from '../../queries/get-current-credential';

const Login: React.SFC<any> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { add } = useToasts();

  return (
    <Mutation mutation={login}>
      {(mutate, { loading }) => (
        <Wrapper className="login-form">
          <form
            onSubmit={async e => {
              e.preventDefault();

              try {
                const {
                  data: { login },
                }: any = await mutate({
                  variables: {
                    email,
                    password,
                  },
                  update: (proxy, { data }) => {
                    // Write our data back to the cache, if there are no errors
                    const credential = {
                      ...data.login.user,
                      __typename: 'Credential',
                    };
                    // This writes to the in memory cache the credential obtained
                    // from the GraphQl server
                    // This allows the authentication token to be
                    // found on the cache without hitting the server
                    proxy.writeQuery({
                      query: getCurrentCredential,
                      data: {
                        credential,
                      },
                    });
                  },
                });

                if (login.error) {
                  add({
                    type: 'error',
                    message: login.error.message,
                  });
                }

                if (login && login.user && login.user.token) {
                  await fetch(
                    // `${process.env.CLIENT_URL || 'http://localhost:3000'}/auth`,
                    'http://www.spot-movie.com/auth',
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        token: login.user.token,
                        expiryInDays: 1,
                      }),
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      credentials: 'same-origin',
                    }
                  );

                  history.push('/admin');
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            <Field>
              <label>Email</label>
              <Input
                disabled={loading}
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </Field>
            <Field>
              <label>Password</label>
              <Input
                disabled={loading}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Field>
            <Button loading={loading} type="submit" primary>
              Login
            </Button>
            <Button as={Link} to="/signup" className="signup-button">
              Sign up
            </Button>
            <ForgotPassword>
              <Link to="/forgot-password">Forgot password</Link>
            </ForgotPassword>
          </form>
        </Wrapper>
      )}
    </Mutation>
  );
};

export default withRouter(Login);

const Wrapper = styled.div`
  button {
    margin-bottom: ${props => props.theme.spacing.small};
  }

  button,
  input,
  .signup-button {
    width: 100%;
    box-sizing: border-box;
  }
`;
const ForgotPassword = styled.div`
  text-align: right;

  a {
    color: #cacaca;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
