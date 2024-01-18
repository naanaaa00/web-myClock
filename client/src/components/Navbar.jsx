import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Write from "../pages/Write";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      
    
        <div className="links">
        
          <Link className="user" to="/">
              <span><b> {currentUser?.username}</b></span> 
          </Link>
          {currentUser ? (
            <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span onClick={logout} style={{ color: '#333' }}>
                Logout
              </span>
            </Link>


            
            <div className="dashboard">
            <Link to="/write">
                <span>Dashboard</span>
              </Link>
              </div>
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          
        </div>
      </div>

  );
};

export default Navbar;
