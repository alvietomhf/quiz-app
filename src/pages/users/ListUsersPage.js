import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import instance from "../../actions/instance";
import { token } from "../../config/token";
import MaterialTable from "material-table";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, CardHeader, Avatar, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const ListUsersPage = () => {
  console.clear();
  const auth = useSelector((state) => state.auth.data.user);
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
              rowData.avatar !== null ? (
                <Avatar
                  src={`http://192.168.0.8:8000/assets/images/avatar/${rowData.avatar}`}
                />
              ) : (
                <AccountCircle />
              )
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
    instance
      .get("api/users", {
        headers: {
          Authorization: "Bearer " + token(),
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <Grid container>
        <Grid xs={12} item style={{ width: 120 }}>
          {auth.role === "admin" && (
            <Button
              style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
              variant="contained"
              color="primary"
            >
              Tambah Guru
            </Button>
          )}
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
