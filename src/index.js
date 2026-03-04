import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Feed from "./pages/feed";
import Post from "./pages/post";
import "./styles/globals.css";
import Layout from "./components/layout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
);
