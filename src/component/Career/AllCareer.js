import React, { useCallback, useState } from "react";
import { Modal, Backdrop, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { APIRequest, ApiUrl } from "../../utils/api";
import { useEffect } from "react";
import { RiTimelineView } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import TitleChanger from "../../TitleChanger/TitleChanger";
import BreadCrumb from "../Breadcrumb/index";
import { DescriptionCell } from "../Description/DescriptionCell";
import { toast } from "react-toastify";


const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  backgroundColor: "background.paper",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  p: 4,
  border: "none !important",
  outline: "none",
  overflow: "auto",
  height: "70%",
  // scrollbarWidth: "none",
  scrollY: "auto",
  zIndex: "1100",
};
const style = {
  ...style1,
  height: "40%"
};

const AllCareer = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const handleOpen = (id) => {
    setOpen(true);
    setCategoryId(id)
  }
  const handleClose = () => setOpen(false);


  const [open1, setOpen1] = useState(false);
  const [subSubCategoryId, setSubCategoryId] = useState('');
  const handleOpen1 = (id) => {
    setOpen1(true);
    setSubCategoryId(id)
  }
  const handleClose1 = () => setOpen1(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  const [subData, setSubData] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [selectedData, setSelectedData] = useState('');
  const handleOpen2 = (id) => {
    setOpen2(true);
    setSelectedData(id)
  }
  const handleClose2 = () => setOpen2(false);

  const limit = 10;



  const getAllServices = () => {
    setIsLoading(true);
    const config = {
      url: `${ApiUrl.getAllCareer} `,
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
    if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (pageNumber === 'next' && currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };



  const getAllSubCareer = useCallback(() => {
    setIsLoading(true);
    // const queryParams = [];
    // if (filter) queryParams.push(`sub_category=${filter}`);
    // const queryString = queryParams.length ? `&${queryParams.join("&")}` : "";

    const config = {
      url: `${ApiUrl.getAllSubCareer}?careerCategoryId=${selectedData}`,
      method: "GET",
    };

    APIRequest(
      config,
      (res) => {
        setSubData(res.data || []);
        console.log("responsedata", res.data);

        const totalCount = res?.count || 0;
        setTotalPages(Math.ceil(totalCount / limit));
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        setSubData([]);
        setIsLoading(false);
      }
    );
  }, []);


  const handleCategoryDelete = (id) => {
    const config = {
      url: `${ApiUrl.deleteCareer}/?id=${id}`,
      method: "DELETE",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "Deleted Successfully");
        toast.success(res.message);
        handleClose()
        setCategoryId('');
        getAllServices(); // Refresh data after deletion
      },
      (error) => {
        console.log(error, "Error in deletion");
        toast.error(error.message);
      }
    );
  };

  const handleDeleteSubcategory = (id) => {
    const config = {
      url: `${ApiUrl.deleteSubCareer}/?id=${id}`,
      method: "DELETE",
    };

    APIRequest(
      config,
      (res) => {
        console.log(res.data, "Deleted Successfully");
        toast.success(res.message);
        handleClose1()
        setSubCategoryId('');
        getAllServices(); // Refresh data after deletion
      },
      (error) => {
        console.log(error, "Error in deletion");
        toast.error(error.message);
      }
    );
  };

  useEffect(() => {
    getAllServices();
  }, [currentPage]);

  useEffect(() => {
    if (selectedData) {
      getAllSubCareer();
    }
  }, [selectedData]);

  return (
    <>
      <TitleChanger title="All Career " />
      <BreadCrumb pageTitle="All Career" />

      <div className="table_container">
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Category ID</th>
                {/* <th>Sub-Category ID</th> */}
                <th>Category</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category._id}</td>
                      <td>{category.category}</td>
                      <td>
                        <div
                          onClick={() => handleOpen2(category._id)}
                          className="delet_button"
                        >
                          <RiTimelineView size={22} />
                        </div>
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
                          onClick={() => handleOpen(category._id)}
                          className="delet_button"
                        >
                          <MdDelete />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )
              )}
            </tbody>

          </table>

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
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <div>
            <div className="table_container">
              <div className="table_info">
                <table>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Sub career Id</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Experience</th>
                      <th>Employee Type</th>
                      <th>Workplace Type</th>
                      <th>Description</th>
                      <th>Job Description</th>
                      <th>Salary</th>
                      <th>View</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      isLoading ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        subData.length > 0 ? (
                          subData.map((job, index) => (
                            <tr key={job._id}>
                              <td>{index + 1}</td>
                              <td>{job._id}</td>
                              <td>{job.title}</td>
                              <td>{job.location}</td>
                              <td>{job.experience}</td>
                              <td>{job.employee_type.replace(/_/g, " ")}</td>
                              <td>{job.workplace_type}</td>
                              <td>
                                <DescriptionCell description={job?.description} />
                              </td><td>
                                <DescriptionCell description={job?.job_specification} />
                              </td>
                              <td>{job.salary}</td>
                              <td>
                                <div
                                  onClick={() => handleOpen2(job._id)}
                                  className="delet_button"
                                >
                                  <RiTimelineView size={22} />
                                </div>
                              </td>
                              {/* <td>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(job._id)}
                                >
                                  Delete
                                </Button>
                              </td> */}
                              <td>
                                <div
                                  onClick={() => handleOpen1(job._id)}
                                  className="delet_button"
                                >
                                  <MdDelete />
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </table>

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
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Category Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this section data? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error"
              onClick={() => handleCategoryDelete(categoryId)}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleClose}>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Sub-Category Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this section data? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error"
              onClick={() => handleDeleteSubcategory(subSubCategoryId)}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleClose1}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllCareer;
