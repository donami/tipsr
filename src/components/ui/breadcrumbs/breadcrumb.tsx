import React, { useEffect, useContext, useState } from 'react';
import { BreadcrumbContext } from './store';
import UUID from 'uuid';

type Props = {
  data: any;
};

const Breadcrumb: React.SFC<Props> = ({ data, children }) => {
  const { state, dispatch } = useContext(BreadcrumbContext);
  const [id, setId] = useState(UUID.v4());

  useEffect(() => {
    dispatch({
      type: 'ADD_CRUMB',
      payload: {
        id,
        ...data,
      },
    });

    return () => {
      dispatch({
        type: 'REMOVE_CRUMB',
        payload: {
          id,
          ...data,
        },
      });
    };
  }, []);

  return children;
};

export default Breadcrumb;
