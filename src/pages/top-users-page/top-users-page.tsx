import React from 'react';
import DefaultLayout from '@/components/layout/default-layout';
import Heading from '../../components/ui/heading';

type Props = {};
const TopUsersPage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Heading sectionTitle>Top Users</Heading>
    </DefaultLayout>
  );
};

export default TopUsersPage;
