import React from 'react'
import Header from './components/header/Header';
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Header/>
      {/* main component and we are giving styles globally of the component which is dynamic content*/}
       {/* Main Content */}
       <div style={{ minHeight: "75vh" }} className="container mt-5">
        {" "}
         <Outlet/>
    </div>
    </div>
  )
}

export default RootLayout;