import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from '@/lib/styledComponents';
import UserInfo from './user-info';
import MenuTop from './menu-top';
import MenuLinks from './menu-links';

type Props = { auth: any };
const SidebarTablet: React.SFC<Props> = ({ auth }) => {
  return (
    <Wrapper>
      <Menu>
        <UserInfo auth={auth} />
        <MenuTop auth={auth} />
        <MenuLinks auth={auth} />
        {/* <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a className="menu-item--small" href="">
          Settings
        </a> */}
      </Menu>
    </Wrapper>
  );
};

export default SidebarTablet;

const Wrapper = styled.div`
  @media (min-width: 789px) {
    display: none !important;
  }
  margin-right: 20px;

  ul {
    list-style: none;
  }

  .auth-link {
    float: right;
    overflow: hidden;
  }

  /* Position and sizing of burger button */
  .bm-burger-button {
    position: relative;
    width: 36px;
    height: 30px;
    left: 5px;
    top: 3px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #fff;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: ${props => props.theme.colors.primary};
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    overflow: hidden !important;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;
