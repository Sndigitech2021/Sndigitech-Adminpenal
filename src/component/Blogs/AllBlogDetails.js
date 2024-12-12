import React, { useState, useCallback, useEffect } from "react";
import { Modal, Backdrop, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { RiTimelineView } from "react-icons/ri";
import { toast } from "react-toastify";
import { DescriptionCell } from "../Description/DescriptionCell";
import { useLocation } from 'react-router-dom';
// import OverviewService from "./ItServiceComponent/OverviewService";
// import WhyServices from "./ItServiceComponent/WhyServices";
// import PortfolioService from "./ItServiceComponent/PortfolioService";
// import TestimonialService from "./ItServiceComponent/TestimonialService";
// import Faq from "./ItServiceComponent/Faq";
// import OverviewBelowService from "./ItServiceComponent/OverviewBelowService";
// import WhyChooseUsService from "./ItServiceComponent/WhyChooseUsService";
// import ProcessService from "./ItServiceComponent/ProcessService";
import Introduction from "./ItServiceComponent/Introduction";
import AboutSection from "./ItServiceComponent/AboutSection";
import Features from "./ItServiceComponent/Features";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  backgroundColor: "background.paper",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  p: 4,
  border: "none !important",
  outline: "none",
  overflow: "auto",
  // scrollbarWidth: "none",
  zIndex: "1100",
  height: "80%",
};

const AllBlogDetails = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedData(id)
  }
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleOpen1 = () => {
    setOpen1(true);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentView, setCurrentView] = useState(null);

  const limit = 10;

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const location = useLocation();
  const service = location.state?.service;


  const getAllServices = useCallback(() => {
    console.log("servicesss", service);

    setIsLoading(true);
    const queryParams = [];
    if (filter) queryParams.push(`sub_category=${filter}`);
    const queryString = queryParams.length ? `&${queryParams.join("&")}` : "";

    const config = {
      url: `${ApiUrl.getServiceDetails}?listById=${service}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        setData(res || []);
        console.log("responsedata", res);

        // const totalCount = res?.count || 0;
        // setTotalPages(Math.ceil(totalCount / limit));
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        setData([]);
        setIsLoading(false);
      }
    );
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDelete = (id) => {
    const config = {
      url: `${ApiUrl.deleteService}/${id}`,
      method: "DELETE",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "Deleted Successfully");
        toast.success(res.message);
        getAllServices("hero"); // Refresh data after deletion
      },
      (error) => {
        console.log(error, "Error in deletion");
        toast.error(error.message);
      }
    );
  };

  const handleView = (view, key) => {
    // console.log("viewdatahere", view);

    if (key === "introduction") {
      setCurrentView(<Introduction data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    } else if (key === "about_section") {
      setCurrentView(<AboutSection data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    } else if (key === "features") {
      setCurrentView(<Features data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    }
    // else if (key === "testimonial_service") {
    //   setCurrentView(<TestimonialService data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    // } else if (key === "faq") {
    //   // setCurrentView(<Faq data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    // } else if (key === "overview_below_service") {
    //   setCurrentView(<OverviewBelowService data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    // } else if (key === "whyChooseUs_service") {
    //   setCurrentView(<WhyChooseUsService data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    // } else if (key === "process_service") {
    //   setCurrentView(<ProcessService data={view} callApi={getAllServices} nullStateOverView={nullStateOverView} />);
    // }
    handleOpen1();
  };


  const nullStateOverView = () => {

    handleClose1()
  }

  useEffect(() => {
    getAllServices();
    // setFilter('');
  }, [filter, currentPage]);

  return (
    <>
      {/* <h1>this is AllITServiceDetails </h1> */}
      <TitleChanger title="All Blog Details" />
      <BreadCrumb pageTitle="All Blog Details" />

      {/* <h1>this is my cd pass</h1> */}
      <div className="name_filter">
        <label>Filter : </label>
        <select
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option
            value=""
            disabled
          >
            Select Sub Category
          </option>
          <option value="home_page">Home Page</option>
          <option value="about_page">About Page</option>
          <option value="service_list">Service List</option>
          <option value="service_details">Service Details</option>
          <option value="portfolio_list">Portfolio List</option>
          <option value="portfolio_details">Portfolio Details</option>
          <option value="blog_list">Blog List</option>
          <option value="blog_details">Blog Details</option>
          <option value="contact_us">Contact Us</option>
          <option value="testimonial">Testimonial</option>
          <option value="industry_page">Industry Page</option>
          <option value="industry_details">Industry Details</option>
          <option value="carrer_page">Career Page</option>
        </select>
      </div>


      <div className="table_container">
        <div className="table_info">
          <table>
            <thead>
              <tr>
                {/* <th>S.no</th> */}
                <th>Title</th>
                {/* <th>Location</th> */}
                {/* <th>Type</th> */}
                {/* <th>Category</th> */}
                {/* <th>Sub-Category</th> */}
                {/* <th>Technology</th> */}
                {/* <th>Description</th> */}
                {/* <th>Is Verified</th> */}
                <th>View</th>
                {/* <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  data.length > 0 ? (
                    Object.keys(data).map((sectionKey) => (
                      <tr key={sectionKey}>
                        <td>{sectionKey.replace(/_/g, " ")}</td>
                        <td>
                          <div
                            onClick={() => handleView(data[sectionKey], sectionKey)}
                            className="delet_button"
                          >
                            <RiTimelineView size={22} />
                          </div>
                        </td>
                        <td>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(sectionKey)}  // Add delete handler here
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )
                )
              }


            </tbody>
          </table >
        </div>
      </div >

      <div className="tabel_button">
        <button
          onClick={handlePageChange}
        >Previous</button>
        <p>Page 1 of 1</p>
        <button
          onClick={handlePageChange}
        >Next</button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this section data? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error"
              onClick={() => handleDelete(selectedData)}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentView}
        </Box>
      </Modal>
    </>
  );
};

export default AllBlogDetails;
