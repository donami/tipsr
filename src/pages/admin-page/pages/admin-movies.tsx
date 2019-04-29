import React from 'react';
import Heading from '../../../components/ui/heading';
import AddMovie from '../components/add-movie';

const AdminMoviesPage = () => {
  return (
    <div>
      <Heading as="h3">Manage Movies</Heading>
      <AddMovie />
    </div>
  );
};

export default AdminMoviesPage;
