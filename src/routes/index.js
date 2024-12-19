import { lazy } from "react";
// Lazy-loaded components
const Dashboard = lazy(() => import("../component/Dashboard/Dashboard"));
const DigitalService = lazy(() => import("../component/DigitalService/DigitalService"));
const AddDigitalService = lazy(() => import("../component/DigitalService/AddDigitalService"));
const AddITService = lazy(() => import("../component/ITService/AddITService"));
const AllITService = lazy(() => import("../component/ITService/AllITService"));
const AllITServiceDetails = lazy(() => import("../component/ITService/AllITServiceDetails"));
const AddITServiceDetails = lazy(() => import("../component/ITService/AddITServiceDetails"));

const AddDevelopmentProcess = lazy(() => import("../component/Development/AddDevelopment"));
const AllDevelopmentProcess = lazy(() => import("../component/Development/AllDevelopment"));
const Add360MarketingServices = lazy(() => import("../component/360MarketingServices/360AddMarketingServices"));
const All360MarketingServices = lazy(() => import("../component/360MarketingServices/360AllMarketingServices"));
const AddPortfolioProjects = lazy(() => import("../component/PortfolioProjects/AddPortfolioProjects"));
const AllPortfolioProjects = lazy(() => import("../component/PortfolioProjects/AllPortfolioProjects"));
const AddBlogs = lazy(() => import("../component/Blogs/AddBlogs"));
const AllBlogs = lazy(() => import("../component/Blogs/AllBlogs"));
const AddBlogDetails = lazy(() => import("../component/Blogs/AddBlogDetails"));
const AllBlogDetails = lazy(() => import("../component/Blogs/AllBlogDetails"));
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
const AddStacks = lazy(() => import("../component/Stacks/AddStacks"));
const AllStacks = lazy(() => import("../component/Stacks/AllStacks"));
const AddPortfolioDetails = lazy(() => import("../component/PortfolioProjects/AddPortfolioDetails"));
const AllPortfolioDetails = lazy(() => import("../component/PortfolioProjects/AllPortfolioDetails"));
const AddIndustry = lazy(() => import("../component/Industry/AddIndustry"));
const AllIndustry = lazy(() => import("../component/Industry/AllIndustry"));
const AddIndustryDetails = lazy(() => import("../component/Industry/AddIndustryDetails"));
const AllIndustryDetails = lazy(() => import("../component/Industry/AllIndustryDetails"));
const AddInfografic = lazy(() => import("../component/Infografic/AddInfografic"));
const AllInfografic = lazy(() => import("../component/Infografic/AllInfografic"));
const AddInfograficDetails = lazy(() => import("../component/Infografic/AddInfograficDetails"));
const AllInfograficDetails = lazy(() => import("../component/Infografic/AllInfograficDetails"));
const AddBusiness = lazy(() => import("../component/Business/AddBusiness"));
const AllBusiness = lazy(() => import("../component/Business/AllBusiness"));
const AddBusinessDetails = lazy(() => import("../component/Business/AddBusinessDetails"));
const AllBusinessDetails = lazy(() => import("../component/Business/AllBusinessDetails"));

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
    path: "/add-it_service_details",
    component: AddITServiceDetails,
    service: true,
  },
  {
    path: "/all-it_service_details",
    component: AllITServiceDetails,
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
    path: "/add-blogList-details",
    component: AddBlogDetails,
    service: true,
  },
  {
    path: "/all-blogList-details",
    component: AllBlogDetails,
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
  {
    path: "/add-stacks",
    component: AddStacks,
    service: true,
  },
  {
    path: "/all-stacks",
    component: AllStacks,
    service: true,
  },
  {
    path: "/all-portfolio-Details",
    component: AllPortfolioDetails,
    service: true,
  },
  {
    path: "/add-portfolio-details",
    component: AddPortfolioDetails,
    service: true,
  },
  {
    path: "/add-industry-list",
    component: AddIndustry,
    service: true,
  },
  {
    path: "/all-industry-list",
    component: AllIndustry,
    service: true,
  },
  {
    path: "/add-industry-details",
    component: AddIndustryDetails,
    service: true,
  },
  {
    path: "/all-industry-details",
    component: AllIndustryDetails,
    service: true,
  },
  {
    path: "/add-infographic-list",
    component: AddInfografic,
    service: true,
  },
  {
    path: "/all-infographic-list",
    component: AllInfografic,
    service: true,
  },
  {
    path: "/add-infographic-details",
    component: AddInfograficDetails,
    service: true,
  },
  {
    path: "/all-infographic-details",
    component: AllInfograficDetails,
    service: true,
  },
  {
    path: "/add-business-list",
    component: AddBusiness,
    service: true,
  },
  {
    path: "/all-business-list",
    component: AllBusiness,
    service: true,
  },
  {
    path: "/add-business-details",
    component: AddBusinessDetails,
    service: true,
  },
  {
    path: "/all-business-details",
    component: AllBusinessDetails,
    service: true,
  },

];

export default routes;
