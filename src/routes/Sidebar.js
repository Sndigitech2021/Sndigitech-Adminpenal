import { lazy } from "react";
import { AiOutlineBank } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { GiDigitalTrace } from "react-icons/gi";
import { FaConnectdevelop, FaPortrait, FaMicroblog, FaQuestionCircle, FaChalkboardTeacher } from "react-icons/fa";
import { CiMonitor } from "react-icons/ci";
import { SiGooglemarketingplatform } from "react-icons/si";
import { TiNews } from "react-icons/ti";
import { GrGallery } from "react-icons/gr";

const SideBarRoute = [
  {
    path: "/app/dashboard",
    img: <RxDashboard />,
    name: "Dashboard",
    heading: "",
  },
  {
    img: <GiDigitalTrace />,
    name: "DigitalService",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/digitalService",
        icon: <GiDigitalTrace />,
        name: "All Digital Service",
      },
      {
        path: "/app/add-digitalService",
        icon: <GiDigitalTrace />,
        name: "Add Digital Service",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "IT Service",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-it_service",
        icon: <CiMonitor />,
        name: "All IT Service",
      },
      {
        path: "/app/add-it_service",
        icon: <CiMonitor />,
        name: "Add IT Service",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Development Process",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-development-process",
        icon: <FaConnectdevelop />,
        name: "All Development Process",
      },
      {
        path: "/app/add-development-process",
        icon: <FaConnectdevelop />,
        name: "Add Development Process",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "360 Marketing Services",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-360-marketing-services",
        icon: <SiGooglemarketingplatform />,
        name: "All 360 Marketing Services",
      },
      {
        path: "/app/add-360-marketing-services",
        icon: <SiGooglemarketingplatform />,
        name: "Add 360 Marketing Services",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Portfolio Projects",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-portfolio-projects",
        icon: <FaPortrait />,
        name: "All Portfolio Projects",
      },
      {
        path: "/app/add-portfolio-projects",
        icon: <FaPortrait />,
        name: "Add Portfolio Projects",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Blogs",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-blogs",
        icon: <FaMicroblog />,
        name: "All Blogs",
      },
      {
        path: "/app/add-blogs",
        icon: <FaMicroblog />,
        name: "Add Blogs",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "News",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-news",
        icon: <TiNews />,
        name: "All News",
      },
      {
        path: "/app/add-news",
        icon: <TiNews />,
        name: "Add News",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Gallery",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-gallery",
        icon: <GrGallery />,
        name: "All Gallery",
      },
      {
        path: "/app/add-gallery",
        icon: <GrGallery />,
        name: "Add Gallery",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "FAQ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-faq",
        icon: <FaQuestionCircle />,
        name: "All FAQ",
      },
      {
        path: "/app/add-faq",
        icon: <FaQuestionCircle />,
        name: "Add FAQ",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Hero Section",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/all-hero-section",
        icon: <FaChalkboardTeacher />,
        name: "All Hero Section",
      },
      {
        path: "/app/add-hero-section",
        icon: <FaChalkboardTeacher />,
        name: "Add Hero Section",
      },
    ],
  },
];

export default SideBarRoute;
