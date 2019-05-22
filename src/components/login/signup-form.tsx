import React, { useState } from 'react';
import styled from '../../lib/styledComponents';
import Field from '../ui/field';
import Input from '../ui/input';
import Button from '../ui/button';
import { useToasts } from '@/components/toasts/toast-manager';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import signup from '@/mutations/signup';

type Props = {} & RouteComponentProps;
const SignupForm: React.SFC<Props> = ({ history }) => {
  const [values, setValues] = useState<any>({
    email: '',
    password: '',
    // passwordConfirm: '',
    firstName: '',
    lastName: '',
  });
  const { add } = useToasts();

  return (
    <Wrapper>
      <Mutation mutation={signup}>
        {(mutate, { loading }) => {
          return (
            <form
              className="signup-form"
              onSubmit={async e => {
                e.preventDefault();

                const noEmptyFields = Object.keys(values).reduce((acc, key) => {
                  if (values[key].length === 0) {
                    // tslint:disable-next-line: no-parameter-reassignment
                    acc = false;
                  }
                  return acc;
                }, true);

                if (!noEmptyFields) {
                  add({
                    type: 'error',
                    message: 'Please fill in all required fields.',
                  });

                  return;
                }

                try {
                  const res: any = await mutate({
                    variables: {
                      email: values.email,
                      password: values.password,
                      firstName: values.firstName,
                      lastName: values.lastName,
                    },
                  });

                  if (res.data && res.data.signup.user) {
                    add({
                      type: 'success',
                      message:
                        'Yay! You can now login with information provided.',
                    });

                    history.push('/');
                  } else if (res.data && res.data.signup.error) {
                    add({
                      type: 'error',
                      message: res.data.signup.error.message,
                    });
                  }
                } catch (error) {}
              }}
            >
              <Field>
                <label>Email</label>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="Email"
                  value={values.email}
                  onChange={e => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
              </Field>
              <Field>
                <label>Password</label>
                <Input
                  disabled={loading}
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={e => {
                    setValues({ ...values, password: e.target.value });
                  }}
                />
              </Field>
              <Field>
                <label>Firstname</label>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="John"
                  value={values.firstName}
                  onChange={e => {
                    setValues({ ...values, firstName: e.target.value });
                  }}
                />
              </Field>
              <Field>
                <label>Lastname</label>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={e => {
                    setValues({ ...values, lastName: e.target.value });
                  }}
                />
              </Field>

              <Button loading={loading} type="submit" primary>
                Signup
              </Button>
              <Button as={Link} to="/" className="cancel-button">
                Cancel
              </Button>
            </form>
          );
        }}
      </Mutation>
    </Wrapper>
  );
};

export default withRouter(SignupForm);

const Wrapper = styled.div`
  button {
    margin-bottom: ${props => props.theme.spacing.small};
  }

  button,
  input,
  .cancel-button {
    width: 100%;
    box-sizing: border-box;
  }
`;
