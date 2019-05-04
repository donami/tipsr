import React from 'react';

export interface AppState {
  // user: {
  //   id: number;
  //   email: string;
  // } | null;
}

export default React.createContext<AppState>({
  // user: null,
});
