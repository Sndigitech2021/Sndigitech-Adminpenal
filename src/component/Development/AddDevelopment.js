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

const AddDevelopmentProcess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const limit = 10;

  const [open, setOpen] = useState(false);
  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getStudentDetails = () => {
    setIsLoading(true);
    let config = {
      url: `${ApiUrl?.getStudent}?role=Student&limit=${limit}&page=${currentPage}`,
      method: "GET",
    };
    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          setStudents(res?.data || []);

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
      url: `${ApiUrl?.deleteStudent}/${_id}`,
      method: "delete",
    };
    console.log("DeleteItemconfig", config);

    APIRequest(
      config,
      (res) => {
        if (!res?.error) {
          console.log("DeleteItem", res);
          getStudentDetails();
          setIsLoading(false);
          toast.success(res?.message);
          handleClose();
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("Error deleting item:", err?.message);
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
    getStudentDetails();
  }, [currentPage]);

  return (
    <>
      <TitleChanger title="Add Development Process" />
      <BreadCrumb pageTitle="Add Development Process" />
      <div>
        <div className="table_info">
          <table>
            <thead>
              <tr>
                <th>S no.</th>
                <th>Image</th>
                <th>Email ID</th>
                <th>Gender</th>
                <th>Board</th>
                <th>Mode</th>
                <th>Verified</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{(currentPage - 1) * limit + index + 1}.</td>
                    <td>
                      <img
                        src={student.image}
                        alt="student"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{student.email}</td>
                    <td>{student.gender}</td>
                    <td>{student.board}</td>
                    <td>{student.mode}</td>
                    <td>{student.isVerified ? "Yes" : "No"}</td>
                    <td>
                      <div className="actions">
                        <div
                          className="delete"
                          onClick={() => handleOpen(student)}
                        >
                          <RiTimelineView />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No student data available</td>
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
                      <h2>Student Details</h2>
                      <strong onClick={handleClose}>
                        <RxCross1 />
                      </strong>
                    </div>

                    <div className="subclient2">
                      {/* <h4>General Details</h4> */}
                      {selectedStudent && (
                        <>
                          <div className="subclient21">
                            <label>Email:</label>
                            <input
                              type="text"
                              value={selectedStudent.email || ""}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Gender:</label>
                            <input
                              type="text"
                              value={selectedStudent.gender || ""}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Board:</label>
                            <input
                              type="text"
                              value={selectedStudent.board || ""}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Mode:</label>
                            <input
                              type="text"
                              value={selectedStudent.mode || ""}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Verified:</label>
                            <input
                              type="text"
                              value={selectedStudent.isVerified ? "Yes" : "No"}
                              disabled
                            />
                          </div>
                          <div className="subclient21">
                            <label>Languages:</label>
                            <input
                              type="text"
                              value={
                                selectedStudent.language_known
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
                                selectedStudent.subjects
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
                                selectedStudent.tutoringDay
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
                                selectedStudent.classes
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
                        type="button"
                        onClick={() => DeleteItem(selectedStudent._id)}
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

export default AddDevelopmentProcess;
