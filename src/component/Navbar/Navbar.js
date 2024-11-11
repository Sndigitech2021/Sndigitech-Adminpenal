import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import { Modal } from '@mui/material/Modal';
import { Modal, Backdrop } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Height } from "@mui/icons-material";
import { border, borderRadius, display, height } from "@mui/system";
import { styled } from "@mui/system";
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ApiUrl, APIRequest } from "../../utils/api";
import { BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiRamProfile } from "react-icons/gi";

const style = {
  position: "absolute",
  top: "12%",
  right: "3%",
  width: "180px",
  height: "100px",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: "5px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
};
const style1 = {
  position: "absolute",
  top: "12%",
  right: "8%",
  width: "200px",
  height: "160px",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: "5px",
  boxShadow:
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
};

const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0)", // Change the alpha value to 1 for no transparency
}));

const handlerLogOut = () => {
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("userData");
  sessionStorage.clear();
  window.location.href = "/";
};

const Navbar = ({ toggleSidebar }) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const toggleProfileVisibility = () => {
    setProfileVisible(!profileVisible);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const getVendorProfile = () => {
    // setIsLoading(true)
    let config = {
      url: `${ApiUrl?.getUserDetails}?role=user&page=1&limit=20`,
      method: "GET",
    };
    APIRequest(
      config,
      (res) => {
        // console.log("123456712345", res);

        if (!res?.error) {
          console.log("njhgfihjknjk", res);
          setEmail(res?.data[0]?.email);
          setFirstName(res?.data[0]?.firstName);
          setLastName(res?.data[0]?.lastName);
          // navigation("/app/login");
        }
      },
      (err) => {
        // setIsLoading(false)
        if (err?.error) {
          console.log("kjhvwgfvj", err?.message);
        }
      }
    );
  };

  useEffect(() => {
    getVendorProfile();
  }, []);

  return (
    <>
      <div className="main1">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="sidebar_show_btn" onClick={toggleSidebar}>
            <BiMenu />
          </div>
          {/* <div>
            <h3 className="logo">{dynamicText}</h3>
            <div className="logo_text">
              <h4>Home</h4>
              <span>
                <FaGreaterThan />
              </span>
              <h4>{dynamicText}</h4>
            </div>
          </div> */}
        </div>
        <div>
          <ul>
            {/* <li>
              <input
                type="text"
                placeholder="Search"
                className="navbar_input"
              />
            </li> */}
            {/* <li className="navbaricon" onClick={handleOpen1}>
              <i class="fa-regular fa-bell"></i>
            </li>
            <Modal
              open={open1}
              onClose={handleClose1}
              BackdropComponent={CustomBackdrop}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style1}>
                <div className="notification-model">
                  <div className="notification1">
                    <button>All</button>
                    <button>Unread</button>
                  </div>
                  <div className="notification2">
                    <ul className="notification3">
                      <li>
                        <p>loremsjdkfhds djdjs </p>
                        <p>10mnt ago</p>
                      </li>
                      <li>
                        <p>loremsjdkfhds djdjs djhf df </p>
                        <p>10 minut ago</p>
                      </li>
                      <li>
                        <p>loremsjdkfhds djdjs djhf df </p>
                        <p>10 minut ago</p>
                      </li>
                      <li>
                        <p>loremsjdkfhds djdjs djhf df </p>
                        <p>10 minut ago</p>
                      </li>
                      <li>
                        <p>loremsjdkfhds djdjs djhf df </p>
                        <p>10 minut ago</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Box>
            </Modal> */}
            <li>
              <button onClick={handleOpen}>
                <i class="fa-regular fa-user"></i>Hello Admin
              </button>
            </li>
            <Modal
              open={open}
              onClose={handleClose}
              BackdropComponent={CustomBackdrop}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                  <ul className="account-pannel">
                    {/* <li className="account-div1">
                      <img src="/images/Manimg.jpg" width="24" height="24" />
                      <p>
                        {firstname} {lastname}{" "}
                      </p>
                    </li> */}
                    {/* <li className="account-div2">
                      <Link to="setting">
                        <SettingsIcon />
                        <p>Settings</p>
                      </Link>
                    </li> */}
                    <li className="account-div2">
                      <Link to="profile">
                        <GiRamProfile />
                        <p>Profile</p>
                      </Link>
                    </li>
                    <li className="account-div3" onClick={handlerLogOut}>
                      <PowerSettingsNewIcon />
                      <p>Sign out</p>
                    </li>
                  </ul>
                </div>
              </Box>
            </Modal>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
