import { Flex } from "antd";
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li>
            <Link to={"/"} style={{ margin: "15px" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/all-users"} style={{ margin: "15px" }}>
              All User
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
