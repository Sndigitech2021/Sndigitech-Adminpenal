import React, { useState, useCallback } from "react";
import { Modal, Backdrop, Typography, Button } from "@mui/material";
import { color, styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl, APIRequestWithFile } from "../../utils/api";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { toast } from "react-toastify";
import { DescriptionCell } from "../Description/DescriptionCell";
import { useNavigate } from "react-router-dom";

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

const style1 = {
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
  height: "70%",
};

const AllIndustry = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedData(id)
  }
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const [serviceData, setServiceData] = useState({});
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = (data) => {
    setOpen1(true);
    setServiceData(data)
  }
  const handleClose1 = () => setOpen1(false);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const isImage = (file) => {
    return file && file.type.startsWith("image/");
  };

  const handleFileChange = (e) => {
    const uploadedfile = e.target.files[0];
    setFile(uploadedfile);
    setServiceData((prev) => ({ ...prev, uploadedfile: uploadedfile }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllServices = useCallback(() => {

    setIsLoading(true);
    const queryParams = [];
    if (filter) queryParams.push(`sub_category=${filter}`);
    const queryString = queryParams.length ? `&${queryParams.join("&")}` : "";

    const config = {
      url: `${ApiUrl.getAllServices}?pageName=industry_list${queryString}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        console.log("industrylistdetails", res);

        setData(res?.data || []);
        const totalCount = res?.count || 0;
        setTotalPages(Math.ceil(totalCount / limit));
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        setData([]);
        setIsLoading(false);
      }
    );
  }, [filter]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleView = (service) => {
    // Navigate to service details page
    // navigate(`/app/all-it_service_details`);
    navigate('/app/all-it_service_details', { state: { service } });

    // navigate(`all-it_service_details/${service}`);
  }

  const handleUpdate = () => {

    console.log("service56789data", serviceData);


    const formData = new FormData();
    formData.append('title', serviceData.title)
    formData.append('description', serviceData.description)
    formData.append('type', serviceData.type)
    formData.append('uploadedfile', serviceData.uploadedfile)
    const config = {
      url: `${ApiUrl.updateService}/?id=${serviceData._id}`,
      method: "PUT",
      body: formData
    };

    APIRequestWithFile(
      config,
      (res) => {
        console.log(res.data, "updated Successfully");
        toast.success(res.message);
        getAllServices();
        setFile(null)
        setServiceData({})
        handleClose1();
      },
      (error) => {
        console.log(error, "Error in deletion");
        toast.error(error?.message || "Error updating service");
      }
    );
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
    getAllServices();
    // setFilter('');
  }, [filter, currentPage]);



  return (
    <>
      <TitleChanger title="All Industry" />
      <BreadCrumb pageTitle="All Industry" />

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
                <th>Service ID</th>
                <th>Title</th>
                {/* <th>Location</th> */}
                <th>Type</th>
                <th>Category</th>
                <th>Sub-Category</th>
                {/* <th>Technology</th> */}
                <th>Description</th>
                {/* <th>Is Verified</th> */}
                <th>Image</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((category, categoryIndex) => (
                    category.subCategories && category.subCategories.length > 0 ? (
                      category.subCategories.map((subCategory, subCategoryIndex) => (
                        <tr key={subCategory._id}>
                          <td>{categoryIndex + 1}.{subCategoryIndex + 0}</td>
                          <td>{category._id}</td>
                          <td>{category.category}</td>
                          <td>{subCategory.title}</td>
                          <td>{subCategory.sub_title}</td>
                          <td>
                            <DescriptionCell description={subCategory?.description} />
                          </td>
                          <td>{subCategory.type}</td>
                          <td>
                            <img
                              src={subCategory.uploadedfile}
                              alt="Sub-category Image"
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>
                            <div
                              onClick={() => handleView(subCategory._id)}
                              className="delet_button"
                            >
                              <RiTimelineView size={22} />
                            </div>
                          </td>
                          <td>
                            <div
                              className="delet_button"
                            // onClick={() => handleOpen1(service)}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                          </td>
                          <td>
                            <div
                              className="delet_button"
                            // onClick={() => handleOpen(service._id)}
                            >
                              <i class="fa-solid fa-trash"></i>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={category._id}>
                        <td>{categoryIndex + 1}</td>
                        <td>{category._id}</td>
                        <td>{category.category}</td>
                        <td colSpan="4" className="text-center">
                          No Sub-Categories
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )
              )}
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

      {/* Edit Modal */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit
          </Typography>
          <div className="basic_info_con1">

            {/* Title Input */}
            <div className="name">
              <label>TITLE</label>
              <input
                type="text"
                name="title"
                value={serviceData.title}
                onChange={handleInputChange}
                placeholder="Enter Title Here"
              />
            </div>

            {/* Description Input */}
            <div className="name">
              <label>DESCRIPTION</label>
              <input
                type="text"
                name="description"
                value={serviceData.description}
                onChange={handleInputChange}
                placeholder="Enter description Here"
              />
            </div>

            {/* Type Select */}
            <div className="name">
              <label>TYPE</label>
              <select
                name="type"
                value={serviceData?.type}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Image">Image</option>
                {/* <option value="Video">Video</option> */}
              </select>
            </div>


            <div className="main_image">
              <p>Upload File</p>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*" // Allows only images and videos
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image/Video
              </label>
              <p>{file?.name}</p>
              <div className="preview">
                {isImage(file) && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "50%", height: "50%" }}
                  />
                )}
                {/* {isVideo(file) && (
                  <video
                    controls
                    style={{ maxWidth: "100%", height: "50%" }}
                  >
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )} */}
              </div>
            </div>

          </div>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={() => handleClose1()}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllIndustry;
