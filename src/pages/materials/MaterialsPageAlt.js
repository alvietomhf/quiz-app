import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import Layout from "../../components/Layout";
import BannerMateri1 from "../../assets/images/bannerMateri1.webp";
import BannerMateri2 from "../../assets/images/bannerMateri2.jpg";

const MaterialsPageAlt = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <Box marginTop={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.cardMateriList} lg={4}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                loading="lazy"
                image={BannerMateri1}
                alt=""
              />
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
                    variant="h5"
                    style={{ fontWeight: 700 }}
                    color="textPrimary"
                  >
                    Pencemaran
                  </Typography>
                </div>
                <Grid container spacing={1}>
                  <Box marginTop={2} marginLeft={`auto`}>
                    <Button
                      color="primary"
                      onClick={() => history.push("/materi/pencemaran")}
                    >
                      Lihat Materi
                    </Button>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} className={classes.cardMateriList} lg={4}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                loading="lazy"
                image={BannerMateri2}
                alt=""
              />
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
                    variant="h5"
                    style={{ fontWeight: 700 }}
                    color="textPrimary"
                  >
                    Ekosistem
                  </Typography>
                </div>
                <Grid container spacing={1}>
                  <Box marginTop={2} marginLeft={`auto`}>
                    <Button
                      color="primary"
                      onClick={() => history.push("/materi/ekosistem")}
                    >
                      Lihat Materi
                    </Button>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
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

export default Layout(MaterialsPageAlt, "Materi");
