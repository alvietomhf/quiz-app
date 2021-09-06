import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import instance from "../../actions/instance";
import { token } from "../../config/token";
import MaterialTable from "material-table";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Button,
  Paper,
  CardHeader,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const ListUsersPage = () => {
  console.clear();
  const auth = useSelector((state) => state.auth.data.user);
  const [isLoading, setLoading] = useState(true);
  const columns = [
    {
      field: "id",
      title: "ID",
      cellStyle: {
        cellWidth: "1%",
      },
    },
    {
      field: "name",
      title: "Name",
      render: (rowData) => {
        return (
          <CardHeader
            style={{ padding: 0 }}
            avatar={
              rowData.avatar !== null ? (
                <Avatar
                  src={`http://127.0.0.1:8000/assets/images/avatar/${rowData.avatar}`}
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
        columns={columns}
        data={data}
        options={{
          search: true,
          sorting: true,
          tableLayout: "auto",
        }}
      />
    </div>
  );
};

export default Layout(ListUsersPage, "Halaman User");
