import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import instance from "../../actions/instance";
import { token } from "../../config/token";
import MaterialTable from "material-table";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, CardHeader, Avatar, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";

const ListUsersPage = () => {
  console.clear();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const columns = [
    {
      field: "id",
      title: "ID",
      width: "1%",
    },
    {
      title: "Name",
      render: (rowData) => {
        return (
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              <Avatar
                src={
                  rowData.avatar === "" || rowData.avatar === null
                    ? ""
                    : `http://192.168.100.20:8000/assets/images/avatar/${rowData.avatar}`
                }
                aria-label="recipe"
              />
            }
            title={rowData.name}
          />
        );
      },
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "role",
      title: "Role",
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      await instance
        .get("api/users", {
          headers: {
            Authorization: "Bearer " + token(),
          },
        })
        .then((response) => {
          setLoading(false);
          setData(response.data.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            history.push("/login");
          }
        });
    };
    getUsers();
  }, [history, auth]);
  console.log(data);
  return (
    <div>
      <Grid container>
        <Grid xs={12} item style={{ width: 120 }}>
          <MaterialTable
            title="Users"
            isLoading={isLoading}
            style={{ width: "100%" }}
            columns={columns}
            data={data}
            options={{
              search: true,
              sorting: true,
              tableLayout: "auto",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(ListUsersPage, "Halaman User");
