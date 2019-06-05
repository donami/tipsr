import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DefaultLayout from '@/components/layout/default-layout';
import ForumCategories from './pages/forum-categories';
import { Breadcrumb, Breadcrumbs } from '@/components/ui/breadcrumbs';

type Props = {} & RouteComponentProps;
const DiscussPage: React.SFC<Props> = () => {
  return (
    <DefaultLayout>
      <Breadcrumbs />
      <Breadcrumb
        data={{
          title: 'Discuss',
          pathname: '/discuss',
        }}
      >
        <ForumCategories />
      </Breadcrumb>
    </DefaultLayout>
  );
};

export default DiscussPage;
