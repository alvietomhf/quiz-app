import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiUser from "../../actions/user";
import Layout from "../../components/Layout";

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchDataUser = async () => {
      await apiUser.index(id).then((res) => {
        console.log(res);
        setUser(res.data.data);
      });
    };
    fetchDataUser();
  }, [id]);
  return (
    <div>
      <Paper>
        <Typography variant="body1">{user.name}</Typography>
      </Paper>
    </div>
  );
};

export default Layout(UserProfilePage);
