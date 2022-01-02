// Components/Routes.js
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Main from "./layouts/main";

const mainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </div>
  );
};
export default mainRoutes;
