import React, { useState, useEffect } from "react";
import { Modal, Backdrop } from "@mui/material";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  backgroundColor: "background.paper",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  p: 4,
  border: "none !important",
  outline: "none",
  overflow: "auto",
  scrollbarWidth: "none",
  zIndex: "1100",
  height: "90%",
};

const AllDevelopmentProcess = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [type, setType] = useState(""); // New state for Type
  const [topic, setTopic] = useState(""); // New state for Topic
  const [subheading, setSubheading] = useState(""); // New state for Subheading
  const [image, setimage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const limit = 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <>
      <TitleChanger title="Add Dashboard Service" />
      <BreadCrumb pageTitle="Add Dashboard Service" />
      <div>
        <div className="product_page">
          <div className="basic_info">
            <div className="basic_info_con">
              <div className="basic_info_con1">
                <div className="name">
                  <label>TITLE</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type Here"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="name">
                  <label>description</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type Here"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
              

                <div className="name">
                  <label>TYPE</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type Here"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>

                <div className="name">
                  <label>CATOGORY</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type Here"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
               
              

                <div className="main_image">
                  <p>Upload File</p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Upload Image
                  </label>
                  <p>{image?.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="add_reset_btn">
            <div className="add_product">
              <input
                type="button"
                value="Button"
                onClick={(e) => handleSubmit(e)}
              />
            </div>
          </div>
          {isLoading
            ? document.body.classList.add("loading-indicator")
            : document.body.classList.remove("loading-indicator")}
        </div>
      </div>
    </>
  );
};

export default AllDevelopmentProcess;
