import { Avatar, CardHeader, Container, Paper } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
const EssayResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState([]);
  const slug = location.state.slug;
  const [isLoading, setLoading] = useState(true);

  const columns = [
    {
      title: "Email",
      field: "email",
      editable: false,
    },
    {
      field: "name",
      title: "Name",
      editable: false,
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
      title: "Score",
      field: "results[0].score",
    },
    {
      title: "Result ID",
      field: "results[0].result_essays[0].result_id",
      editable: false,
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("score", newData.results[0].score);
    apiQuiz
      .post(
        `/api/guru/result/${newData.results[0].result_essays[0].result_id}`,
        formData
      )
      .then((response) => {
        const updateScore = [...result];
        const index = oldData.tableData.id;
        updateScore[index] = newData;
        setResult([...updateScore]);
        console.log(response);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        resolve();
      });
  };

  useEffect(() => {
    if (!location.state) history.push("/quiz");
    apiQuiz
      .resultQuiz(slug, "essay")
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        setLoading(false);
        setResult(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [history, location, slug]);

  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <Container>
      <Paper>
        <MaterialTable
          title="Hasil Esai"
          isLoading={isLoading}
          columns={columns}
          data={result}
          options={{
            search: true,
            sorting: true,
            tableLayout: "auto",
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...result,
                  { id: Math.floor(Math.random() * 100), ...newRow },
                ];
                setTimeout(() => {
                  setResult(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...result];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setResult(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
          }}
        />
      </Paper>
    </Container>
  );
};

export default Layout(EssayResultsPage, "Esai");
