import { Box, Grid, Typography, Paper } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
import GambarEkosistem from "../../../assets/images/ekosistemgambar.jpg";

const MaterialTwo = () => {
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
              Ekosistem
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              Ciri-Ciri Keseimbangan Ekosistem Berdasarkan Fungsinya
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginY={2}
            >
              <img
                src={GambarEkosistem}
                alt=""
                style={{ width: 640, borderRadius: 8 }}
              />
            </Box>
            <Typography variant="subtitle1">
              Suatu lingkungan dikatakan seimbang apabila dinamika dalam
              ekosistem yang meliputi rantai makanan, jaring-jaring makanan, dan
              tiap-tiap organisme pada tingkat trofi berperan sesuai dengan
              fungsinya masing – masing. Disadari bahwa dalam kehidupan selalu
              terdapat ketergantungan antara satu terhadap yang lain, atau yang
              satu menunjang yang lain. Keseimbang lingkungan tersebut
              ditentukan oleh keseimbangan ekosistem yang terdiri atas:
            </Typography>
            <ol type="1">
              <li>
                <Typography variant="subtitle1">
                  Keseimbangan antara aliran energi yang masuk dan energi yang
                  dikeluarkan.
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Keseimbangan antara bahan makanan yang dibentuk dan bahan
                  makanan yang digunakan
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1">
                  Serta keseimbangan antara komponen biotik dan komponen
                  abiotik. Dengan demikian tidak ada satupun mahkluk hidup yang
                  berkembang lebih cepat dan mendominasi organisme lain.
                  (Kastinah dan Sri, 2009, h. 359).
                </Typography>
              </li>
            </ol>
            <Typography variant="subtitle1">
              Penurunan keanekaragaman hayati dalam ekosistem pada umumnya
              disebabkan oleh pengaruh empat hal yakni :
            </Typography>
            <div style={{ fontWeight: "normal" }}>
              <ol type="a">
                <li>
                  <Typography variant="subtitle1">
                    Terjadinya penyederhanaan keanekaragaman makhluk hidup di
                    muka bumi. Hal ini akan dapat berakibat banyaknya hama
                    penyakit yang berpengaruh negatif. Pengaruh tersebut adalah
                    rentannya kehidupan makhluk di muka bumi.
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1">
                    mono kultur terhadap kemantapan ekonomi. Tanaman dan hewan
                    yang kurang beragam yang dipelihara oleh manusia berakibat
                    terbatasnya akses ekonomi manusia.
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1">
                    penyederhananan makhluk hidup terhadap habitat dapat
                    menyebabkan lingkungan tak subur atau seringkali terabaikan
                    pengelolaannya. Tanah yang tandus semakin rusak dan tak
                    mendapatkan perhatian.
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle1">
                    kurangnya keanekaragaman ekonomi terhadap stagnasi ekonomi
                    di kota. Peredaran sumber daya makanan, sumber daya alam dan
                    manusia menjadi terbatas dan hanya mengumpul di kota.
                    Kejadian ini mengakibatkan akses hidup masyarakat khususnya
                    kehidupan ekosistem dan masyarakat di pelosok desa ada
                    kecenderungan terabaikan.
                  </Typography>
                </li>
              </ol>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(MaterialTwo, "Ekosistem");
