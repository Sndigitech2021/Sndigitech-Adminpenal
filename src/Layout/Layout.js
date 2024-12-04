import React, { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar/Sidebar";
import Navbar from "../component/Navbar/Navbar";
import routes from "../routes";

const Layout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebarVisibility = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const location = useLocation();

  // Use more robust matching to find the current route
  const currentRoute = routes.find((route) =>
    location.pathname.startsWith(route.path)
  );

  return (
    <div className="container">
      <Sidebar
        isVisible={isSidebarVisible}
        toggleSidebar={toggleSidebarVisibility}
      />

      <div className="main">
        {/* <header> */}
        <Navbar
          toggleSidebar={toggleSidebarVisibility}
          dynamicText={currentRoute?.navbarText || "Dashboard"}
        />
        {/* </header> */}

        {/* Main content area */}
        <div className="main_container">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              {routes.map((route, key) => {
                // console.log("1234567rtyui", route, key);
                return (
                  <Route
                    key={key}
                    exact={true}
                    path={`${route.path}`}
                    element={<route.component />}
                  />
                );
              })}

              {/* Redirecting unknown url to 404 page */}
              {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
          </Suspense>
          <div className="main_container_bottom"></div>
        </div>
      </div>
      {/* Example: Add a footer component */}
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default Layout;
