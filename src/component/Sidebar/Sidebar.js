import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBarRoute from "../../routes/Sidebar";
import { MdClose } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Sidebar = ({ isVisible, toggleSidebar }) => {

  
  const [visibleSubMenu, setVisibleSubMenu] = useState();

  const toggleSubMenu = (i) => {
    setVisibleSubMenu(visibleSubMenu === i ? null : i);
  };
  return (
    <div className={`dash_board ${isVisible ? "visible" : "hidden"}`}>
        <div className="dashboard">
        <div className="sidebar_hide_btn" onClick={toggleSidebar}>
          <MdClose />
        </div>
        <div className="img1">
        <img src="/assets/images/sndigitechimg.png" alt="Logo" />
        </div>
        <div className="dash1">
          <h4>Dashboard</h4>
        </div>
        <hr />
      </div>
      <div className="dash2">

      <ul>
          {SideBarRoute?.map((route, i) => (
             <li key={i} className="side_comp_menu">
             <Link
               to={route.path}
               className="side_comp_cont"
               onClick={() => toggleSubMenu(i)}
             >
               <div className="icon">{route.icon}</div>
               <span>{route.name}</span>
               <div className="toggle_submenu_icon">
                 {route?.toggleArrowButton &&
                   (visibleSubMenu === i ? <FaAngleUp /> : <FaAngleDown />)}
               </div>
             </Link>
             <ul
               className="sub_menu"
               style={{
                 display: `${visibleSubMenu === i ? "block" : "none"}`,
               }}
             >
               {route?.submenu?.map((submenuItem, j) => (
                 <li key={j}>
                   <Link to={submenuItem.path}>
                     <div className="icon">{submenuItem.icon}</div>
                     <span>{submenuItem.name}</span>
                   </Link>
                 </li>
               ))}
             </ul>
           </li>
           
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
