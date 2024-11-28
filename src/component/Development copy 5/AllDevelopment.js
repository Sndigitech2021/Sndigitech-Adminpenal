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

const AllDevelopmentProcess = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const [data, setData] = useState([]);
  // const [sub_category, setSubCategory] = useState();


  const getAllServices = (category, sub_category) => {
    setIsLoading(true);
    const config = {
      url: `${ApiUrl.getAllServices}?category=${category}&sub_category=${sub_category}`,
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
    getAllServices("testimonial", "about_page")

  }, [currentPage]);

  // const handleDelete = (id) => {
  //   // Handle delete logic
  // };

  return (
    <>
      <TitleChanger title="All Development Process" />
      <BreadCrumb pageTitle="All Development Process" />

      <div className="table_container">
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Location</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Technology</th>
                <th>Description</th>
                <th>Image</th>
                {/* <th>Delete</th>
              <th>Edit</th> */}
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
                      < tr key={service.id}>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td>{service.name}</td>
                        <td>{service.location}</td>
                        <td>{service.category}</td>
                        <td>{service.sub_category}</td>
                        <td>{service.technology}</td>
                        <td>{service.description}</td>
                        <td>
                          <img
                            src={service.uploadedfile}
                            alt="Image"
                            width="50"
                            height="50"
                          />
                        </td>
                        {/* <td>
                      <i class="fa-solid fa-trash"></i>
                    </td> */}
                        {/* <td>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </td> */}
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
    </>
  );
};

export default AllDevelopmentProcess;
