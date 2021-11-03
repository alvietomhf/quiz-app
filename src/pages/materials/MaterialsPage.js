import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Box,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { Fragment } from "react";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";
import apiMaterials from "../../actions/materials/materials";
import EmptyDataComponent from "../../components/EmptyData";
import Layout from "../../components/Layout";
import AddMaterialComponent from "./AddMaterialComponent";
import NoImage from "../../assets/images/noImage.jpg";

const MaterialsPage = () => {
  const [materi, setMateri] = useState([]);
  const auth = useSelector((state) => state.auth.data.user);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const goToDetailMateri = (id) => {
    history.push({ pathname: `/materi/${id}`, state: id });
  };
  const deleteMateri = async (id) => {
    const response = await apiMaterials.deleteMaterials(id);
    const responseMateri = await apiMaterials.index();
    const data = responseMateri.data.data;
    setLoading(false);
    setMateri(data);
    console.log(response);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDataMateri = async () => {
      const response = await apiMaterials.index();
      const data = response.data.data;
      setLoading(false);
      setMateri(data);
      console.log(data);
    };
    fetchDataMateri();
  }, [auth]);

  const classes = useStyles();

  return (
    <div>
      <AddMaterialComponent open={open} handleClose={handleClose} />
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          {loading ? (
            <Card className={classes.cardMateriList}>
              <CardContent>
                <Skeleton animation="wave" width={240} />
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={120} />
              </CardContent>
            </Card>
          ) : (
            <div>
              {materi.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                  }}
                >
                  <EmptyDataComponent label="Materi" />
                  {auth.role === "guru" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ marginTop: 15 }}
                      onClick={handleClickOpen}
                    >
                      Tambah Materi
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Box>
                    {auth.role === "guru" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Tambah Materi
                      </Button>
                    )}
                  </Box>
                  <Box marginTop={2}>
                    <Grid container spacing={2}>
                      {materi
                        .sort((a, b) => (a.title > b.title ? 1 : -1))
                        .map((item) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              className={classes.cardMateriList}
                              lg={4}
                              key={item.id}
                            >
                              <Card>
                                {item.image_banner !== null ? (
                                  <CardMedia
                                    component="img"
                                    height="240"
                                    loading="lazy"
                                    image={`${window.env.API_URL_ASSETS}/images/materi/${item.image_banner}`}
                                    alt=""
                                  />
                                ) : (
                                  <CardMedia
                                    component="img"
                                    height="240"
                                    loading="lazy"
                                    image={NoImage}
                                    alt=""
                                  />
                                )}
                                <CardContent>
                                  <div
                                    style={{
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      width: 280,
                                      overflow: "hidden",
                                    }}
                                  >
                                    <Typography
                                      variant="body1"
                                      style={{ fontWeight: 700 }}
                                      color="textPrimary"
                                    >
                                      {item.competence}
                                    </Typography>
                                  </div>
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {moment(item.created_at).format("LLL")}
                                  </Typography>
                                  <Grid container spacing={1}>
                                    <Box marginTop={2} marginLeft={`auto`}>
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          goToDetailMateri(item.id)
                                        }
                                      >
                                        Lihat Materi
                                      </Button>
                                      {auth.role === "guru" ? (
                                        <Fragment>
                                          <Button
                                            color="secondary"
                                            onClick={() =>
                                              deleteMateri(item.id)
                                            }
                                          >
                                            Delete
                                          </Button>
                                        </Fragment>
                                      ) : (
                                        ""
                                      )}
                                    </Box>
                                  </Grid>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Box>
                </div>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardMateriList: {
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default Layout(MaterialsPage, "Materi");
