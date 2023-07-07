import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearState } from '../slices/loginSlice';

function Header() {
  const { status } = useSelector(state => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    sessionStorage.removeItem('token');
    dispatch(clearState());
  };

  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from); // Navigate to the previous location if available
    } else {
      window.history.back(); // Use the window.history object to go back
    }
  };

   // Check if the current location is the default registration page
  //  const isDefaultPage = location.pathname === '/';

  return (
    <ul className="nav justify-content-center bg-dark p-2">
      {status === 'success' ? (
        <li className="nav-item">
          <NavLink className="me-5" to="/login" onClick={logout}>
            Logout
          </NavLink>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="me-5" to="/">
              Register
            </NavLink>
          </li>
        
          <li className="nav-item">
            <NavLink className="me-5" to="/login">
              Login
            </NavLink>
          </li>
        </>
      )}
      <li className="nav-item">
        <NavLink className="me-5" onClick={goBack}>
          Go Back
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;















// import React from 'react'
// //import NavLink
// import {NavLink} from 'react-router-dom';
// //import useSelector,useDispatch
// import { useSelector, useDispatch } from 'react-redux';

// //import clearState
// import {clearState} from '../slices/loginSlice'

// function Header() {
//   // import status from login slice
//     const { status } = useSelector(state => state.login);

//     // usedispatch which dispatches the action object to reducer function
//   const dispatch = useDispatch();

//   //logout
//     const logout = () => {
//         // Remove token
//         sessionStorage.removeItem('token');
//         // Clear the state
//         dispatch(clearState());
//       };
//   return (


//     <ul className="nav justify-content-center bg-dark p-2">
//       {status === 'success' ? (
//         // If user is logged in, render Logout link only
//         <li className="nav-item">
//           <NavLink className="me-5" to="/login" onClick={logout}>
//             Logout
//           </NavLink>
//         </li>
//       ) : (
//         // If user is not logged in, render Register and Login links only
//         <>
//           <li className="nav-item">
//             <NavLink className="me-5" to="/">
//               Register
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="me-5" to="/login">
//               Login
//             </NavLink>
//           </li>
//         </>
//          )
//         }
//         </ul>
//   )}
//         //export
//         export default Header;