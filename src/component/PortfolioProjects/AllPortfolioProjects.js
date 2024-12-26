import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import { color, styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
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

const AllPortfolioDetails = () => {
  const navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('');
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
  // const [sub_category, setSubCategory] = useState();


  const getAllServices = (category) => {
    setIsLoading(true);
    const config = {
      url: `${ApiUrl.getAllCategory}?pageName=${category} `,
      method: "GET",
    }

    APIRequest(
      config,
      (res) => {
        // console.log(res.data, "resresrestr");
        setIsLoading(false)
        setData(res?.data);

        const totalCount = res?.count;
        setTotalPages(Math.ceil(totalCount / limit));

      },
      (error) => {
        console.log(error);
        setIsLoading(false)

      },
    )

  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber == 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber == 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const handleDelete = (id) => {


  //   const config = {
  //     url: `${ApiUrl.deleteService}/?id=${id}`,
  //     method: "delete",
  //   }


  //   APIRequest(
  //     config,
  //     (res) => {
  //       if (!res.error) {
  //         console.log(res.data, "resresrestr");
  //         handleClose();
  //         toast.success(res.message);
  //         setSelectedData('');
  //         getAllServices();
  //       }

  //     },
  //     (error) => {
  //       console.log(error, "eerrroeeesserd");
  //       toast.error("entry not found in portfolio")
  //     }
  //   )

  // };

  const handleView = (service) => {
    // Navigate to service details page
    // navigate(`/app/all-it_service_details`);
    navigate('/app/all-portfolio-Details', { state: { service } });

    // navigate(`all-it_service_details/${service}`);
  }

  useEffect(() => {
    getAllServices("portfolio_list");

  }, [currentPage]);

  // const handleDelete = (id) => {
  //   // Handle delete logic
  // };

  return (
    <>
      <TitleChanger title="All Portfolio Projects" />
      <BreadCrumb pageTitle="All Portfolio Projects" />

      <div className="table_container">
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Category ID</th>
                <th>Category</th>
                <th>Sub-Category Title</th>
                <th>Sub-Category Sub-title</th>
                <th>Description</th>
                <th>Type</th>
                <th>Image</th>
                <th>View</th>
                {/* <th>Edit</th> */}
                {/* <th>Delete</th> */}
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
                              onClick={() => handleView(category._id)}
                              className="delet_button"
                            >
                              <RiTimelineView size={22} />

                            </div>
                          </td>
                          {/* <td>
                            <div
                              className="delet_button"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                          </td> */}
                          {/* <td>
                            <div
                              className="delet_button"
                              onClick={() => handleOpen(subCategory._id)}>
                              <i class="fa-solid fa-trash"></i>
                            </div>
                          </td> */}
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
          </table>

        </div>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>                    No Data Found
            </div>
          </Box>
        </Modal> */}
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

      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default AllPortfolioDetails;
