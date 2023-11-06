import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserStore from './store/UserStore';

interface ContextProps {
  user: UserStore;
}

const Context = createContext<ContextProps|null>(null)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{user:new UserStore()}}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Context.Provider>

);

export default Context;

