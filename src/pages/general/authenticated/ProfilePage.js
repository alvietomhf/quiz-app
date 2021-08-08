import React from "react";
import Layout from "../../../components/Layout";

const ProfilePage = (props) => {
  return (
    <div>
      {props.auth.data.name}
      <br />
      {props.auth.data.role}
      <br />
      {props.auth.data.email}
    </div>
  );
};

export default Layout(ProfilePage);
