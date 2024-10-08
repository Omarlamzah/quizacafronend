import { ImExit } from "react-icons/im";
import React, { useEffect, useState } from "react";
import { CgMenuMotion, CgClose } from "react-icons/cg";
import { MdOutlineBackupTable } from "react-icons/md";
import { motion } from "framer-motion";
import Checkboxdarkmode from "./checkboxdarkmode";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/darkmod/darkslice";
import { NavLink } from 'react-router-dom';
import { logoutAsync } from "../store/auth/loginslice";
import { useNavigate } from "react-router-dom";
import navLinkStyle from "../hooks/stylenav";

const NavbarAth = () => {
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { isDarkMode } = useSelector((state) => state.themeSlice);
  const { user,isAuthenticated } = useSelector((state) => state.loginslice);
 

  const switchmodeclick = (e) => {
    dispatch(toggleDarkMode());
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const themeClass = isDarkMode === 'dark' ? 'navltmod' : 'navmoddrk';

  return (
    <nav className={`flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white ${themeClass}`}>
      <div>
        <NavLink to="/" className="  text-center flex items-center gap-4 text-xl font-semibold">
          <MdOutlineBackupTable /> E-learning
        </NavLink>
      </div>

      <span className="cursor-pointer md:hidden" onClick={toggleMenu}>
        {isMenuVisible ? <CgClose className="w-8 h-8" /> : <CgMenuMotion className="w-8 h-8" />}
      </span>

        <motion.div
        className={`${
      
          isMenuVisible ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto md:space-x-4`}
        id="menu"
        initial={{ x: "-100px" }}
        whileInView={{ x: isMenuVisible ? 0 : "0px" }}
        exit={{ x: "-100px" }}
        transition={{ type: "tween" }}
      
      >
        <ul className={`pt-4 text-base text-gray-700 md:flex md:justify-end md:pt-0`}>
        
        <li className={themeClass}>
            <NavLink to="/dasboard"className={` ${themeClass} text-center  block md:p-4 py-2  hover:bg-gradient-to-r from-blue-300 to-purple-500`}  style={navLinkStyle}>
             <button>dasboard</button> 
            </NavLink>
          </li>

          <li className={themeClass}>
            <NavLink to="/profile"className={` ${themeClass} text-center  block md:p-4 py-2  hover:bg-gradient-to-r from-blue-300 to-purple-500`}  style={navLinkStyle}>
             <button>profile</button> 
            </NavLink>
          </li>


          {user && user.isadmin==1 ? (
               <li >
               <NavLink to="/admin" className={` ${themeClass} text-center  block md:p-4 py-2  hover:bg-gradient-to-r from-blue-300 to-purple-500`} style={navLinkStyle}>
                 <button >admin</button>
               </NavLink>
             </li>
   
          ): ""}
          
          
          <li >
            <NavLink to="/" className={` ${themeClass} text-center  block md:p-4 py-2  hover:bg-gradient-to-r from-blue-300 to-purple-500`} style={navLinkStyle}>
              <button >home</button>
            </NavLink>
          </li>

          
           <li className= {`${themeClass} flex justify-center`} > 
            <button onClick={() => { dispatch(logoutAsync()) }} className={`flex items-center gap-2 md:p-4 py-2 ${themeClass} hover:bg-gradient-to-r from-blue-300 to-purple-500`}>
              logout <ImExit className="w-6 h-6 m-0 p-0" />
            </button>
          </li>

          <li className={`flex items-center ${themeClass}`}>
            <Checkboxdarkmode onchangemode={switchmodeclick} />
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default NavbarAth;
