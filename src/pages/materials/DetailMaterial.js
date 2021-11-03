import { Paper, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiMaterials from "../../actions/materials/materials";
import Layout from "../../components/Layout";
import parse from "html-react-parser";

const DetailMaterial = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const getDetail = async () => {
      await apiMaterials
        .detail(id)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDetail();
  }, [id]);
  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h3">{data.subject}</Typography>
        <Typography>Semester: {data.semester}</Typography>
        <Typography>Kelas: {data.class}</Typography>
        <Typography>Pertemuan: {data.meet}</Typography>
        <Typography>Deskripsi</Typography>
        {parse(`${data.description}`)}
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  cardMateriList: {
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default Layout(DetailMaterial);
