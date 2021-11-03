import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";

const IdentityMaterialPage = () => {
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
              Identitas Materi
            </Typography>
            <ul>
              <li>
                <Typography variant="subtitle1">
                  Mata Pelajaran: <b>IPA</b>
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Kelas/Jenjang/Semester: <b>X/SMP/1</b>
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Kompetensi Dasar: <b>3.13	Menganalisis limbah di lingkungan sekitar</b>
                </Typography>
              </li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(IdentityMaterialPage);
