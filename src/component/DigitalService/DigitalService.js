import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { color, styled } from "@mui/system";
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

const DigitalService = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    // Fetch data here
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const response = await APIRequest.get(`${ApiUrl}/students`, {
          params: { page: currentPage, limit },
        });
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error("Failed to load students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, [currentPage]);

  const handleDelete = (id) => {
    // Handle delete logic
  };

  return (
    <>
      <TitleChanger title="All Digital Service" />
      <BreadCrumb pageTitle="All Digital Service" />

      <div className="table_container">
        <table className="table_style">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Category</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Website Design</td>

              <td>Creating engaging websites</td>
              <td>Design</td>
              <td>UI/UX</td>
              <td>
                <img
                  src="/assets/images/analyst.jpg"
                  alt="French Fry"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <i class="fa-solid fa-trash"></i>
              </td>
              <td>
                <i class="fa-solid fa-pen-to-square"></i>
              </td>
            </tr>
            {/*  */}

            <tr>
              <td>1</td>
              <td>Website Design</td>

              <td>Creating engaging websites</td>
              <td>Design</td>
              <td>UI/UX</td>
              <td>
                <img
                  src="/assets/images/analyst.jpg"
                  alt="French Fry"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <i class="fa-solid fa-trash"></i>
              </td>
              <td>
                <i class="fa-solid fa-pen-to-square"></i>
              </td>
            </tr>

            {/*  */}
            <tr>
              <td>1</td>
              <td>Website Design</td>

              <td>Creating engaging websites</td>
              <td>Design</td>
              <td>UI/UX</td>
              <td>
                <img
                  src="/assets/images/analyst.jpg"
                  alt="French Fry"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <i class="fa-solid fa-trash"></i>
              </td>
              <td>
                <i class="fa-solid fa-pen-to-square"></i>
              </td>
            </tr>

            {/*  */}
            <tr>
              <td>1</td>
              <td>Website Design</td>

              <td>Creating engaging websites</td>
              <td>Design</td>
              <td>UI/UX</td>
              <td>
                <img
                  src="/assets/images/analyst.jpg"
                  alt="French Fry"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <i class="fa-solid fa-trash"></i>
              </td>
              <td>
                <i class="fa-solid fa-pen-to-square" onClick={handleOpen}></i>
              </td>
            </tr>
            {/*  */}
          </tbody>
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>hfduiyfghdfghgfhgfht</div>
          </Box>
        </Modal>
      </div>

      <div className="tabel_button">
        <button>Previous</button>
        <p>Page 1 of 1</p>
        <button>Next</button>
      </div>
    </>
  );
};

export default DigitalService;
