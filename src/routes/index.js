import { lazy } from "react";
// Lazy-loaded components
const Dashboard = lazy(() => import("../component/Dashboard/Dashboard"));
const DigitalService = lazy(() => import("../component/DigitalService/DigitalService"));
const AddDigitalService = lazy(() => import("../component/DigitalService/AddDigitalService"));
const AddITService = lazy(() => import("../component/ITService/AddITService"));
const AllITService = lazy(() => import("../component/ITService/AllITService"));

const AddDevelopmentProcess = lazy(() => import("../component/Development/AddDevelopment"));
const AllDevelopmentProcess = lazy(() => import("../component/Development/AllDevelopment"));
const Add360MarketingServices = lazy(() => import("../component/360MarketingServices/360AddMarketingServices"));
const All360MarketingServices = lazy(() => import("../component/360MarketingServices/360AllMarketingServices"));
const AddPortfolioProjects = lazy(() => import("../component/PortfolioProjects/AddPortfolioProjects"));
const AllPortfolioProjects = lazy(() => import("../component/PortfolioProjects/AllPortfolioProjects"));
const AddBlogs = lazy(() => import("../component/Blogs/AddBlogs"));
const AllBlogs = lazy(() => import("../component/Blogs/AllBlogs"));
const AddNews = lazy(() => import("../component/News/AddNews"));
const AllNews = lazy(() => import("../component/News/AllNews"));
const AddGallery = lazy(() => import("../component/Gallery/AddGallery"));
const AllGallery = lazy(() => import("../component/Gallery/AllGallery"));
const AddFaq = lazy(() => import("../component/FAQ/AddFaq"));
const AllFaq = lazy(() => import("../component/FAQ/AllFaq"));
const AddHeroSection = lazy(() => import("../component/HeroSection/AddHeroSection"));
const AllHeroSection = lazy(() => import("../component/HeroSection/AllHeroSection"));
const AddClientImage = lazy(() => import("../component/ClientImage/AddClientImage"));
const AllClientImage = lazy(() => import("../component/ClientImage/AllClientImage"));
const AddDigitalMarketing = lazy(() => import("../component/DigitalMarketing/AddDigitalMarketing"));
const AllDigitalMarketing = lazy(() => import("../component/DigitalMarketing/AllDigitalMarketing"));
const AddWhyServices = lazy(() => import("../component/WhyService/AddWhyService"));
const AllWhyServices = lazy(() => import("../component/WhyService/AllWhyService"));
const AddTestimonial = lazy(() => import("../component/Testimonial/AddTestimonial"));
const AllTestimonial = lazy(() => import("../component/Testimonial/AllTestimonial"));
const AddKeyPointers = lazy(() => import("../component/KeyPointers/AddKeyPointers"));
const AllKeyPointers = lazy(() => import("../component/KeyPointers/AllKeyPointers"));
const AddOurTeam = lazy(() => import("../component/OurTeam/AddOurTeam"));
const AllOurTeam = lazy(() => import("../component/OurTeam/AllOurTeam"));

// Define routes
const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    service: true,
  },
  {
    path: "/all-Digital-Marketing-Process",
    component: DigitalService,
    service: true,
  },
  {
    path: "/add-Digital-Marketing-Process",
    component: AddDigitalService,
    service: true,
  },
  {
    path: "/add-it_service",
    component: AddITService,
    service: true,
  },
  {
    path: "/all-it_service",
    component: AllITService,
    service: true,
  },
  {
    path: "/add-development-process",
    component: AddDevelopmentProcess,
    service: true,
  },
  {
    path: "/all-development-process",
    component: AllDevelopmentProcess,
    service: true,
  },
  {
    path: "/add-360-marketing-services",
    component: Add360MarketingServices,
    service: true,
  },
  {
    path: "/all-360-marketing-services",
    component: All360MarketingServices,
    service: true,
  },
  {
    path: "/add-portfolio-projects",
    component: AddPortfolioProjects,
    service: true,
  },
  {
    path: "/all-portfolio-projects",
    component: AllPortfolioProjects,
    service: true,
  },
  {
    path: "/add-blogs",
    component: AddBlogs,
    service: true,
  },
  {
    path: "/all-blogs",
    component: AllBlogs,
    service: true,
  },
  {
    path: "/add-news",
    component: AddNews,
    service: true,
  },
  {
    path: "/all-news",
    component: AllNews,
    service: true,
  },
  {
    path: "/add-gallery",
    component: AddGallery,
    service: true,
  },
  {
    path: "/all-gallery",
    component: AllGallery,
    service: true,
  },
  {
    path: "/add-faq",
    component: AddFaq,
    service: true,
  },
  {
    path: "/all-faq",
    component: AllFaq,
    service: true,
  },
  {
    path: "/add-hero-section",
    component: AddHeroSection,
    service: true,
  },
  {
    path: "/all-hero-section",
    component: AllHeroSection,
    service: true,
  },
  {
    path: "/add-client-image",
    component: AddClientImage,
    service: true,
  },
  {
    path: "/client-Image",
    component: AllClientImage,
    service: true,
  },
  {
    path: "/add-Digital-Marketing",
    component: AddDigitalMarketing,
    service: true,
  },
  {
    path: "/all-Digital-Marketing",
    component: AllDigitalMarketing,
    service: true,
  },
  {
    path: "/add-why-services",
    component: AddWhyServices,
    service: true,
  },
  {
    path: "/all-why-services",
    component: AllWhyServices,
    service: true,
  },
  {
    path: "/add-testimonial",
    component: AddTestimonial,
    service: true,
  },
  {
    path: "/all-testimonial",
    component: AllTestimonial,
    service: true,
  },
  {
    path: "/add-key-pointers",
    component: AddKeyPointers,
    service: true,
  },
  {
    path: "/all-key-pointers",
    component: AllKeyPointers,
    service: true,
  },
  {
    path: "/add-our-team",
    component: AddOurTeam,
    service: true,
  },
  {
    path: "/all-our-team",
    component: AllOurTeam,
    service: true,
  },

];

export default routes;
