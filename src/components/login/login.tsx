import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import login from '@/mutations/login';
import { withRouter } from 'react-router-dom';
import Button from '../ui/button';
import Input from '../ui/input';
import { useToasts } from '@/components/toasts/toast-manager';
import Field from '../ui/field';

const Login: React.SFC<any> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { add } = useToasts();

  return (
    <Mutation mutation={login}>
      {(mutate, { loading }) => (
        <div>
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
                });

                if (login.error) {
                  add({
                    type: 'error',
                    message: login.error.message,
                  });
                }

                if (login && login.user && login.user.jwt) {
                  sessionStorage.setItem('token', login.user.jwt);
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
            <Button loading={loading} type="submit">
              Login
            </Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(Login);
