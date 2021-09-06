import { Container, Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";

const ResultsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [result, setResult] = useState([]);
  const slug = location.state.slug;
  const [isLoading, setLoading] = useState(true);

  const columns = [
    {
      title: "Nama",
      field: "name",
    },
    {
      title: "Score",
      field: "results[0].score",
    },
  ];

  useEffect(() => {
    if (!location.state) history.push("/quiz");
    apiQuiz
      .resultQuiz(slug)
      .then((response) => {
        const res = response.data.data;
        console.log(res);
        console.log(response.data.data);
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
          title="Hasil Kuis"
          isLoading={isLoading}
          columns={columns}
          data={result}
          options={{
            search: true,
            sorting: true,
            tableLayout: "auto",
          }}
        />
      </Paper>
    </Container>
  );
};

export default Layout(ResultsPage, "Quiz");
