
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserStoreInterface } from '../store/UserStore';



function Layout ({user}:{user:UserStoreInterface}){

    return (
      <div>
         <NavBar user={user}/>
         <Outlet />
      </div>
    );

};

export default Layout