import React, { useEffect, useState } from "react";
import "../../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/web Title with logo.svg";
import api from "../../utils/AxiosInstance";
import { IoIosArrowDropdown } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import profile_pic from "../../assets/bg.jpg"


const Navbar = (props) => {
  const [user, setUser] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [showSettings , setShowSettings] = useState(false)
  const [logoutMessage , setlogoutMessage] =useState("")
  
  const navigate = useNavigate()

  function menuOpenClose (){
    setShowMenu(!showMenu)
  }

  function opencloseSettings(){
    setShowSettings(!showSettings)
  }

  function handleLogout (){
///  change the logic to cookie mechanism 
    setShowSettings(false)
    setUser("")
    navigate('/')
    setlogoutMessage("Logged Out Succesfully!")
    setTimeout(() => {
      setlogoutMessage("")
      
    }, 5000);
 
}
  
  const getUserData = async () => {
    try {
     
  
      const res = await api.get(`/user/getUser`);
      setUser(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  
   getUserData(); 
  
  }, [props.change ]);

  return (
    <>
      <div className="navbar">

        
        <div className="menu">
          <TiThMenu onClick={menuOpenClose} />

          <div
            className={
              showMenu
                ? "drop-down animate__animated animate__bounceInLeft"
                : " display-none animate__animated animate__backOutLeft  "
            }
          >
            <div className="close-btn">
              <IoClose onClick={menuOpenClose} />
            </div>
            <ul>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/contact"> Contact</Link>
              </li>
              <li>
                <Link to="/services"> Services</Link>
              </li>
              <li>
                <Link to="/about"> About</Link>
              </li>
              <li>
                <Link to="/blogs"> Blogs</Link>
              </li>
            </ul>
          </div>
        </div>

        <img src={logo} alt="logo here" />

        <ul className="ul">
          <li>
            <Link to="/"> Home</Link>
          </li>

          <li>
            <Link to="/contact"> Contact</Link>
          </li>
          <li>
            <Link to="/services"> Services</Link>
          </li>
          <li>
            <Link to="/about"> About</Link>
          </li>
          <li>
            <Link to="/blogs"> Blogs</Link>
          </li>
        </ul>

        {user !==""?<div className="user">
          <span><img src={profile_pic} width={"30px"}/></span>
          <p>{user}</p>

          <div onClick={opencloseSettings}>{showSettings ?<IoClose/>:<IoIosArrowDropdown/>}
          </div>

          <div className={showSettings ? "dropdown" : "display-none"}>
            <ul>
              <li onClick={handleLogout}>Logout</li>
              <hr></hr>
              <li>Profile </li>
              <li>Settings </li>
            </ul>
          </div>
        </div> : <div className="logout-message">
          {logoutMessage !== "" ? (
            <p>{logoutMessage}</p>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>}


        {user!== "" ? <div className="triple-dot">
          
          <div onClick={opencloseSettings}>{showSettings ? <IoClose/>  : <HiDotsVertical/>}</div>

          <div className={showSettings? "dropdown" : "display-none" }>
            <ul>
              <li><img src={profile_pic}/><span>{user}</span></li>
              <li onClick={handleLogout}>Logout</li>
              <li>Profile</li>
              <li>Settings</li>
          
            </ul>
          </div>



        </div> : <div className="logout-message2">
          {logoutMessage !== "" ? (
            <p>{logoutMessage}</p>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div> }


      </div>
    </>
  );
};

export default Navbar;