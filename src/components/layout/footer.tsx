import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@/components/layout/logo.png';
import styled from '@/lib/styledComponents';

type Props = { className?: string };
const Footer: React.SFC<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Columns>
        <Column>
          <ColumnTitle>Company</ColumnTitle>
          <ul>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </Column>
        <Column>
          <ColumnTitle>Legal</ColumnTitle>
          <ul>
            <li>
              <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </Column>
        <Column>
          <img src={logo} alt="Spotmovie.com" />
          <div>Copyright &copy; 2019 - Spot-movie.com</div>
        </Column>
      </Columns>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing.normal} 0;
  /* padding-top: 10px; */
  color: #cacaca;

  @media (max-width: 790px) {
    padding: ${props => props.theme.spacing.normal};
  }
`;

const Columns = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style: none;
  margin-bottom: 40px;
`;

const Column = styled.li`
  /* margin-right: 100px; */
  padding-top: 40px;

  @media (max-width: 600px) {
    min-width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  img {
    max-width: 120px;
  }

  ul {
    list-style: none;
  }

  a {
    color: #cacaca;
    text-decoration: none;
    font-size: 0.9em;
    transition: all 200ms ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`;

const ColumnTitle = styled.h4`
  text-transform: uppercase;
  /* font-weight: 300; */
  color: ${props => props.theme.colors.primary};
  font-size: 0.9em;
`;
