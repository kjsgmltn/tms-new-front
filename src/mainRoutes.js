// Components/Routes.js
import React from "react";
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import Main from "./layouts/main";

const mainRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default mainRoutes;
