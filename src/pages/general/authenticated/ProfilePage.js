import React from "react";
import Layout from "../../../components/Layout";

const ProfilePage = (props) => {
  return (
    <div>
      {props.auth.name}
      <br />
      {props.auth.data.role}
      <br />
      {props.auth.email}
    </div>
  );
};

export default Layout(ProfilePage, 'Halaman Profil');
