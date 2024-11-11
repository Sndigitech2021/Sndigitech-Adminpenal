import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { RxCross1 } from "react-icons/rx";
import { Height } from "@mui/icons-material";
import { APIRequest, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
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

const Teacher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const limit = 10;

  const [open, setOpen] = useState(false);
  const handleOpen = (teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getTeacherDetails = () => {
    setIsLoading(true);
    let config = {
      url: `${ApiUrl?.getTeacher}?role=Teacher&limit=${limit}&page=${currentPage}`,
      method: "GET",
    };
    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          setTeachers(res?.data || []);

          const totalCount = res?.count;
          setTotalPages(Math.ceil(totalCount / limit));
          setIsLoading(false);
        }
      },
      (err) => {
        console.log("Error fetching vendor profile:", err?.message);
        setIsLoading(false);
      }
    );
  };

  const DeleteItem = (_id) => {
    setIsLoading(true);
    let config = {
      url: `${ApiUrl?.deleteTeacher}/${_id}`,
      method: "delete",
    };
    // console.log("configconfig", config);

    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          // console.log("DeleteItem", res);
          getTeacherDetails();
          setIsLoading(false);
          toast.success(res?.message);
          handleClose();
        }
      },
      (err) => {
        setIsLoading(false);
        if (err?.error) {
          toast.error(err?.message);
        }
      }
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    getTeacherDetails();
  }, [currentPage]);

  return (
    <>
      <TitleChanger title="Teacher" />
      <BreadCrumb pageTitle="Teacher" />
      <div>
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S no.</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Email ID</th>
                <th>Gender</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <tr key={teacher?.id || index}>
                    <td>{(currentPage - 1) * limit + index + 1}.</td>
                    <td>{teacher?.fullName}</td>
                    <td>{teacher?.mobile}</td>
                    <td>{teacher?.email}</td>
                    <td>{teacher?.gender}</td>
                    <td>
                      <div className="actions">
                        <div
                          className="delete"
                          onClick={() => handleOpen(teacher)}
                        >
                          <RiTimelineView />
                        </div>
                        {/* <div className="actions">
                          <div
                            className="delete"
                            onClick={() => DeleteItem(teacher._id)}
                          >
                            <MdDelete />
                          </div>
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No vendor data available</td>
                </tr>
              )}
            </tbody>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form>
                  <div className="main-client">
                    <div className="subclient1">
                      <h2>Teacher Details</h2>
                      <strong onClick={handleClose}>
                        <RxCross1 />
                      </strong>
                    </div>

                    <div className="subclient2">
                      {/* <h4>General Details</h4> */}
                      {selectedTeacher && (
                        <>
                          <div className="subclient21">
                            <label>Full Name</label>
                            <input
                              type="text"
                              value={selectedTeacher.fullName}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Date of Birth</label>
                            <input
                              type="text"
                              value={new Date(
                                selectedTeacher.dob
                              ).toLocaleDateString()}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Qualification</label>
                            <input
                              type="text"
                              value={selectedTeacher.qualification}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Gender</label>
                            <input
                              type="text"
                              value={selectedTeacher.gender}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Tutoring Time</label>
                            <input
                              type="text"
                              value={selectedTeacher.tutoringTime}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Best Time to Call</label>
                            <input
                              type="text"
                              value={selectedTeacher.bestTimeToCall}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Rate</label>
                            <input
                              type="text"
                              value={selectedTeacher.rate}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Experience</label>
                            <input
                              type="text"
                              value={selectedTeacher.experience}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Languages:</label>
                            <input
                              type="text"
                              value={
                                selectedTeacher.language_known
                                  ?.map((lang) => lang.name)
                                  .join(", ") || "N/A"
                              }
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Subjects:</label>
                            <input
                              type="text"
                              value={
                                selectedTeacher.subjects
                                  ?.map((subject) => subject.name)
                                  .join(", ") || "N/A"
                              }
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Tutoring Days:</label>
                            <input
                              type="text"
                              value={
                                selectedTeacher.tutoringDay
                                  ?.map((day) => day.day)
                                  .join(", ") || "N/A"
                              }
                              disabled
                            />
                          </div>

                          <div className="subclient21">
                            <label>Classes:</label>
                            <input
                              type="text"
                              value={
                                selectedTeacher.classes
                                  ?.map((cls) => cls.class)
                                  .join(", ") || "N/A"
                              }
                              disabled
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="subclient4">
                      <button
                        type="submit"
                        onClick={() => DeleteItem(selectedTeacher._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </form>
              </Box>
            </Modal>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
