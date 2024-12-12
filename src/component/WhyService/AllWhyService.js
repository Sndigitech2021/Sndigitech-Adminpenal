import React, { useState } from "react";
import { Modal, Backdrop, Typography, Button } from "@mui/material";
import { color, styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { toast } from "react-toastify";
import { DescriptionCell } from "../Description/DescriptionCell";

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
  // overflow: "auto",
  scrollbarWidth: "none",
  zIndex: "1100",
  height: "33%",
};

const AllWhyService = () => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedData(id)
  }
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const getAllServices = (category) => {
    setIsLoading(true);

    // Construct query parameters dynamically
    const queryParams = [];
    if (filter) queryParams.push(`sub_category=${filter}`);

    const queryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';

    const config = {
      url: `${ApiUrl.getAllServices}?category=${category}${queryString}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        setIsLoading(false);
        setData(res?.data || []); // Default to empty array if no data
        const totalCount = res?.count || 0;
        setTotalPages(Math.ceil(totalCount / limit));
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
        setData([]); // Reset data on error
      }
    );
  };

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

  useEffect(() => {
    getAllServices("why_sndigitech_section")

  }, [filter, currentPage]);


  return (
    <>
      <TitleChanger title="All Why Service" />
      <BreadCrumb pageTitle="All Why Service" />

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
                <th>S.no</th>
                <th>Title</th>
                {/* <th>Location</th> */}
                <th>Type</th>
                <th>Category</th>
                <th>Sub-Category</th>
                {/* <th>Technology</th> */}
                <th>Description</th>
                {/* <th>Is Verified</th> */}
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ? (
                  <tr >
                    <td colSpan='8' className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  data.length > 0 ? (
                    data.map((service, index) => (
                      < tr key={service._id}>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td>{service.title}</td>
                        {/* <td>{service.location}</td> */}
                        <td>{service.type}</td>
                        <td>{service.category}</td>
                        <td>{service.sub_category}</td>
                        {/* <td>{service.technology}</td> */}
                        <td>
                          <DescriptionCell description={service?.description} />

                        </td>
                        {/* <td>{service.isVerified}</td> */}
                        <td>
                          <img
                            src={service.uploadedfile}
                            alt="Image"
                            width="50"
                            height="50"
                          />
                        </td>
                        <td>
                          <div
                            className="delet_button"
                          >
                            <i class="fa-solid fa-pen-to-square"></i>
                          </div>
                        </td>
                        <td>
                          <div
                            className="delet_button"
                            onClick={() => handleOpen(service._id)}>
                            <i class="fa-solid fa-trash"></i>
                          </div>
                        </td>
                      </tr>
                    ))

                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No Data Found</td>
                    </tr>
                  )
                )
              }

            </tbody>
          </table >
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>                    No Data Found
            </div>
          </Box>
        </Modal>
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
    </>
  );
};

export default AllWhyService;
