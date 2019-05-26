import React, { useState } from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '@/components/ui/heading';
import Field from '@/components/ui/field';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import styled from '../../lib/styledComponents';
import { useToasts } from '@/components/toasts/toast-manager';
import { isValidEmail } from '@/lib/helpers';

type Props = {};
const ContactUsPage: React.SFC<Props> = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };
  const [values, setValues] = useState<any>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const { add } = useToasts();

  const onSubmit = (e: any) => {
    e.preventDefault();

    const noEmptyFields = Object.keys(values).reduce((acc, key) => {
      if (values[key].length <= 0) {
        acc = false;
      }
      return acc;
    }, true);

    if (!noEmptyFields) {
      add({
        type: 'error',
        message: 'Please fill in all the required fields.',
      });
      return;
    }

    if (!isValidEmail(values.email)) {
      add({
        type: 'error',
        message: 'Invalid email.',
      });
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <Heading sectionTitle>Contact Us</Heading>
        {submitted && (
          <div>
            Thank you for your message! <br />
            We will get back to you as soon as possible.
          </div>
        )}
        {!submitted && (
          <form onSubmit={onSubmit}>
            <Field>
              <label>Your name</label>
              <Input
                placeholder="John Doe"
                value={values.name}
                onChange={(e: any) => {
                  setValues({
                    ...values,
                    name: e.target.value,
                  });
                }}
              />
            </Field>

            <Field>
              <label>Email</label>
              <Input
                placeholder="your@email.com"
                value={values.email}
                onChange={(e: any) => {
                  setValues({
                    ...values,
                    email: e.target.value,
                  });
                }}
              />
            </Field>

            <Field>
              <label>Message</label>
              <Input
                placeholder="Your message..."
                value={values.message}
                onChange={(e: any) => {
                  setValues({
                    ...values,
                    message: e.target.value,
                  });
                }}
              />
            </Field>

            <Button type="submit" primary>
              Send
            </Button>
          </form>
        )}
      </Wrapper>
    </DefaultLayout>
  );
};

export default ContactUsPage;

const Wrapper = styled.div`
  background-color: #2e2e2e;
  padding: ${props => props.theme.spacing.normal};
`;
