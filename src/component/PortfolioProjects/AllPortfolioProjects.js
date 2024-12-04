import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
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

const AllPortfolioProjects = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
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
                          <td>{subCategory.description}</td>
                          <td>{subCategory.type}</td>
                          <td>
                            <img
                              src={subCategory.uploadedfile}
                              alt="Sub-category Image"
                              width="50"
                              height="50"
                            />
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
    </>
  );
};

export default AllPortfolioProjects;
