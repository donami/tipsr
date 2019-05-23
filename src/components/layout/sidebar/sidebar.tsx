import React from 'react';

import UserInfo from './user-info';
import MenuTop from './menu-top';
import MenuLinks from './menu-links';

type Props = {
  auth: any;
};

const Sidebar: React.SFC<Props> = ({ auth }) => {
  return (
    <>
      <UserInfo auth={auth} />
      <MenuTop auth={auth} />
      <MenuLinks auth={auth} />
    </>
  );
};

export default Sidebar;
