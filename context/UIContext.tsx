import {createContext} from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
}

export const UIContext = createContext({} as ContextProps);
