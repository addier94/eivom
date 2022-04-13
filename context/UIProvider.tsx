import {FC, useReducer} from 'react';
import {UIContext, uiReducer} from './';


export interface UIState {
  Entries: boolean;
}

const UI_INITIAL_STATE: UIState = {
  Entries: false,
};

export const UIProvider:FC = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider value={{
      ...state,
    }}>
      {children}
    </UIContext.Provider>
  );
};
