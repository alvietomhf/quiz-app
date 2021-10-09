import { Avatar, CardHeader, Chip } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import apiQuiz from "../actions/quiz/quiz";

const NotSubmittedTable = ({ setLoading, slug, isLoading }) => {
  const [result, setResult] = useState([]);
  const columns = [
    {
      title: "Absen",
      render: (rowData) => {
        return (
          rowData.number === "" ||
          (rowData.number == null ? (
            <Chip variant="default" color="secondary" label="Absen Kosong" />
          ) : (
            rowData.number
          ))
        );
      },
    },
    {
      title: "Email",
      field: "email",
    },
    {
      field: "name",
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
                    : `http://192.168.0.9:8000/assets/images/avatar/${rowData.avatar}`
                }
                aria-label="recipe"
              />
            }
            title={rowData.name}
          />
        );
      },
    },
  ];
  useEffect(() => {
    const notSubmitted = async () => {
      await apiQuiz
        .notSubmittedQuiz(slug)
        .then((response) => {
          const res = response.data.data;
          console.log(res);
          setLoading(false);
          setResult(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    notSubmitted();
  }, [slug, setLoading]);
  return (
    <div>
      <MaterialTable
        title="Not Submitted"
        isLoading={isLoading}
        columns={columns}
        data={result}
        style={{ marginBottom: 20 }}
        options={{
          search: true,
          sorting: true,
          tableLayout: "auto",
        }}
      />
    </div>
  );
};

export default NotSubmittedTable;
