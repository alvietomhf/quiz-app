import { Avatar, Box, CardHeader, Chip, Container } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";
import NotSubmittedTable from "../../../components/NotSubmittedTable";
const ResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState([]);
  const slug = location.state.slug;
  const [isLoading, setLoading] = useState(true);

  const columns = [
    {
      title: "Absen",
      field: "number",
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
      title: "Score",
      field: "results[0].score",
    },
    {
      title: "Tanggal Submit",
      render: (rowData) => {
        return moment(rowData.results[0].created_at).format("l");
      },
    },
  ];

  useEffect(() => {
    if (!location.state) history.push("/quiz");
    const getSubmitted = async () => {
      await apiQuiz
        .resultQuiz(slug, "quiz")
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
    getSubmitted();
  }, [history, location, slug]);

  return !location.state ? (
    <h1>Forbidden</h1>
  ) : (
    <Container>
      <Box>
        <NotSubmittedTable
          slug={slug}
          setLoading={setLoading}
          isLoading={isLoading}
        />
        <MaterialTable
          title="Submitted"
          isLoading={isLoading}
          columns={columns}
          data={result}
          options={{
            search: true,
            sorting: true,
            tableLayout: "auto",
          }}
        />
      </Box>
    </Container>
  );
};

export default Layout(ResultsPage, "Quiz");
