import React, { useReducer } from 'react';

type Crumb = {
  id: string;
  pathname: string;
  title: string;
};

type State = {
  breadcrumbs: Crumb[];
};

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload],
      };
    case 'REMOVE_CRUMB':
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.filter(crumb => {
          return crumb.id !== action.payload.id;
        }),
      };
    default:
      return state;
  }
};

const initialState: State = {
  breadcrumbs: [],
};
const BreadcrumbContext = React.createContext<any>(initialState);

const BreadcrumbProvider: React.SFC<any> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BreadcrumbContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BreadcrumbContext.Provider>
  );
};

export { BreadcrumbProvider, BreadcrumbContext };
