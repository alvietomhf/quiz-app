import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiQuiz from "../../../actions/quiz/quiz";
import Layout from "../../../components/Layout";

const ResultSiswaPage = () => {
  const auth = useSelector((state) => state.auth.data.user);
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      field: "quiz.title",
      title: "Judul",
    },
    {
      title: "Score",
      field: "score",
    },
    {
      title: "Tipe",
      field: "quiz.type",
    },
  ];
  if (auth.role === "guru") history.push("/home");
  useEffect(() => {
    const getSiswaResult = async () => {
      await apiQuiz
        .getResultSiswa()
        .then((res) => {
          console.log(res.data.data);
          setLoading(false);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSiswaResult();
  }, [setLoading]);
  return (
    <div>
      <MaterialTable
        title="Hasil"
        isLoading={isLoading}
        columns={columns}
        data={data}
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

export default Layout(ResultSiswaPage, "Hasil Siswa");
