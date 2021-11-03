import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";

const PurposePage = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Paper style={{ padding: "20px 30px" }}>
            <Typography
              variant="h4"
              style={{ fontWeight: 700, marginBottom: 15 }}
              align="center"
            >
              Tujuan
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              Melalui diskusi dan menggali informasi dari multimedia interaktif
              berbasis WEB, siswa dapat :
            </Typography>
            <ol type="1">
              <li>
                <Typography variant="subtitle1">
                  Mengelompokkan macam-macam pencemaran sesuai tempatnya dengan
                  tepat
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Menjelaskan macam-macam pencemaran sesuai tempatnya dengan
                  cermat
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Menjelaskan ciri-ciri keseimbangan ekosistem berdasarkan
                  fungsinya dengan tepat
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Menjelaskan gangguan ekosistem akibat dari dampak pencemaran
                  dengan detail
                </Typography>
              </li>
            </ol>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(PurposePage);
