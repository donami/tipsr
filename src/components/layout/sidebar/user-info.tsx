import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/avatar';
import styled from '../../../lib/styledComponents';

type Props = { auth: any };
const UserInfo: React.SFC<Props> = ({ auth }) => {
  return (
    <>
      {auth && (
        <Wrapper>
          <UserInfoTop>
            <Link to="/profile">
              <Avatar name={`${auth.firstName} ${auth.lastName}`} view="md" />
            </Link>
          </UserInfoTop>
          <h3>
            <Link to="/profile">{`${auth.firstName} ${auth.lastName}`}</Link>
          </h3>
        </Wrapper>
      )}
    </>
  );
};

export default UserInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${props => props.theme.spacing.normal};

  a {
    text-decoration: none;
  }

  h3 {
    font-weight: 300;

    a {
      transition: color 200ms ease-in-out;
      text-decoration: none;
      color: #fff;

      &:hover {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
`;

const UserInfoTop = styled.div`
  margin: ${props => props.theme.spacing.normal};
`;
