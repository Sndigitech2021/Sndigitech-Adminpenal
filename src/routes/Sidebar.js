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
    name: "Hero Service",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-hero-section",
        icon: <GiDigitalTrace />,
        name: "Add Hero Service",
      },
      {
        path: "/app/all-hero-section",
        icon: <GiDigitalTrace />,
        name: "All Hero Service",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Client Image",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-client-image",
        icon: <GiDigitalTrace />,
        name: "Add Client Image",
      },
      {
        path: "/app/Client-Image",
        icon: <GiDigitalTrace />,
        name: "All Client Image",
      },
    ],
  },
  // {
  //   img: <GiDigitalTrace />,
  //   name: "DigitalService",
  //   toggleArrowButton: true,
  //   heading: "",
  //   submenu: [
  //     {
  //       path: "/app/digitalService",
  //       icon: <GiDigitalTrace />,
  //       name: "All Digital Service",
  //     },
  //     {
  //       path: "/app/add-digitalService",
  //       icon: <GiDigitalTrace />,
  //       name: "Add Digital Service",
  //     },
  //   ],
  // },
  {
    img: <GiDigitalTrace />,
    name: "IT Development Service",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-it_service",
        icon: <CiMonitor />,
        name: "Add IT Service",
      },
      {
        path: "/app/all-it_service",
        icon: <CiMonitor />,
        name: "All IT Service",
      },
      {
        path: "/app/add-it_service_details",
        icon: <CiMonitor />,
        name: "Add ITService Details",
      },
      // {
      //   path: "/app/all-it_service_details",
      //   icon: <CiMonitor />,
      //   name: "All ITService Details",
      // },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "IT Development Process",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-development-process",
        icon: <FaConnectdevelop />,
        name: "Add Development Process",
      },
      {
        path: "/app/all-development-process",
        icon: <FaConnectdevelop />,
        name: "All Development Process",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Digital Marketing ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-Digital-Marketing",
        icon: <CiMonitor />,
        name: "Add Digital Marketing",
      },
      {
        path: "/app/all-Digital-Marketing",
        icon: <CiMonitor />,
        name: "All Digital Marketing",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Digital Marketing Process ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-Digital-Marketing-Process",
        icon: <CiMonitor />,
        name: "Add Digital Marketing Process",
      },
      {
        path: "/app/all-Digital-Marketing-Process",
        icon: <CiMonitor />,
        name: "All Digital Marketing Process",
      },
    ],
  },

  {
    img: <GiDigitalTrace />,
    name: "360 Marketing ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-360-marketing-services",
        icon: <SiGooglemarketingplatform />,
        name: "Add 360 Marketing ",
      },
      {
        path: "/app/all-360-marketing-services",
        icon: <SiGooglemarketingplatform />,
        name: "All 360 Marketing ",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Why Services",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-why-services",
        icon: <FaPortrait />,
        name: "Add Why Services",
      },
      {
        path: "/app/all-why-services",
        icon: <FaPortrait />,
        name: "All Why Services",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Testimonial",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-testimonial",
        icon: <FaPortrait />,
        name: "Add Testimonial ",
      },
      {
        path: "/app/all-testimonial",
        icon: <FaPortrait />,
        name: "All Testimonial",
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
        path: "/app/add-portfolio-projects",
        icon: <FaPortrait />,
        name: "Add Portfolio Projects",
      },
      {
        path: "/app/all-portfolio-projects",
        icon: <FaPortrait />,
        name: "All Portfolio Projects",
      },
      {
        path: "/app/add-portfolio-details",
        icon: <FaPortrait />,
        name: "Add Portfolio Details",
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
        path: "/app/add-blogs",
        icon: <FaMicroblog />,
        name: "Add Blogs List",
      },
      {
        path: "/app/all-blogs",
        icon: <FaMicroblog />,
        name: "All Blogs List",
      },
      {
        path: "/app/add-blogList-details",
        icon: <FaMicroblog />,
        name: "Add Blogs Details",
      }
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "News",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-news",
        icon: <TiNews />,
        name: "Add News List",
      },
      {
        path: "/app/all-news",
        icon: <TiNews />,
        name: "All News List",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Industry",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-industry-list",
        icon: <TiNews />,
        name: "Add Industry List",
      },
      {
        path: "/app/all-industry-list",
        icon: <TiNews />,
        name: "All Industry List",
      },
      {
        path: "/app/add-industry-details",
        icon: <TiNews />,
        name: "Add Industry Details",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Infographic ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-infographic-list",
        icon: <TiNews />,
        name: "Add Infographic List",
      },
      {
        path: "/app/all-infographic-list",
        icon: <TiNews />,
        name: "All Infographic List",
      },
      {
        path: "/app/add-infographic-details",
        icon: <TiNews />,
        name: "Add Infographic Details",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Business ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-business-list",
        icon: <TiNews />,
        name: "Add Business List",
      },
      {
        path: "/app/all-business-list",
        icon: <TiNews />,
        name: "All Business List",
      },
      {
        path: "/app/add-business-details",
        icon: <TiNews />,
        name: "Add Business Details",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Career ",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-career-list",
        icon: <TiNews />,
        name: "Add Career List",
      },
      {
        path: "/app/all-career-list",
        icon: <TiNews />,
        name: "All Career List",
      },
      // {
      //   path: "/app/add-business-details",
      //   icon: <TiNews />,
      //   name: "Add Business Details",
      // },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Gallery",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-gallery",
        icon: <GrGallery />,
        name: "Add Gallery",
      },
      {
        path: "/app/all-gallery",
        icon: <GrGallery />,
        name: "All Gallery",
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
        path: "/app/add-faq",
        icon: <FaQuestionCircle />,
        name: "Add FAQ",
      },
      {
        path: "/app/all-faq",
        icon: <FaQuestionCircle />,
        name: "All FAQ",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Key Pointers",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-key-pointers",
        icon: <FaChalkboardTeacher />,
        name: "Add Key Pointers",
      },
      {
        path: "/app/all-key-pointers",
        icon: <FaChalkboardTeacher />,
        name: "All Key Pointers",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Our Team",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-our-team",
        icon: <FaChalkboardTeacher />,
        name: "Add Our Team",
      },
      {
        path: "/app/all-our-team",
        icon: <FaChalkboardTeacher />,
        name: "All Our Team",
      },
    ],
  },
  {
    img: <GiDigitalTrace />,
    name: "Stacks",
    toggleArrowButton: true,
    heading: "",
    submenu: [
      {
        path: "/app/add-stacks",
        icon: <FaChalkboardTeacher />,
        name: "Add Stacks",
      },
      {
        path: "/app/all-stacks",
        icon: <FaChalkboardTeacher />,
        name: "All Stacks",
      },
    ],
  },
];

export default SideBarRoute;
