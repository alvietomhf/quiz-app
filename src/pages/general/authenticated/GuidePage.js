import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
import SignUpImg from "../../../assets/images/SignUp.png";
import NavHomePointImg from "../../../assets/images/NavHomePoint.png";
import PostKlikImg from "../../../assets/images/PostKlik.png";
import PurposeImagePoint from "../../../assets/images/PurposeImagePoint.png";
import GuidePointImage from "../../../assets/images/GuidePointImg.png";
import AnggotaNavPoint from "../../../assets/images/AnggotaNavPoint.png";
import SearchAnggotaPoint from "../../../assets/images/SearchAnggotaPoint.png";
import MateriNavPointImg from "../../../assets/images/MateriNavPointImg.png";
import TugasNav from "../../../assets/images/TugasNav.png";
import StartQuizButton from "../../../assets/images/StartQuizButton.png";
import ChooseMateri from "../../../assets/images/ChooseMateri.png";
import DetailKuisImg from "../../../assets/images/DetailKuisImg.png";
import EssayPageImg from "../../../assets/images/EssayPage.png";
import DetailEssayImg from "../../../assets/images/DetailEssayImg.png";
import { Link } from "react-router-dom";

const GuidePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", textAlign: "center" }}
          gutterBottom
        >
          Cara Penggunaan MMI
        </Typography>
        <Box marginX={2}>
          <Typography
            variant="body1"
            style={{ fontWeight: "bold" }}
            gutterBottom
          >
            Cara Mendaftar
          </Typography>
          <ol type="a" style={{ fontWeight: "bold" }}>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Mendaftar Sebagai Guru
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Langkah pertama Anda bisa buka browser lalu kunjungi situs
                  </Typography>
                  <Link to="https://quizzes-mmi.netlify.app">BION</Link>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Selanjutnya klik <b>Daftar</b>
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Silahkan isi Nama, Email, Role pilih <b>Guru</b>, absen, dan
                    password anda
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Kemudian pilihlah avatar atau foto profil anda
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Register</b>
                  </Typography>
                  <img src={SignUpImg} alt="" style={{ width: 200 }} />
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Mendaftar Sebagai Siswa
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Langkah pertama Anda bisa buka browser lalu kunjungi situs
                  </Typography>
                  <Link to="https://quizzes-mmi.netlify.app">BION</Link>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Selanjutnya klik <b>Daftar</b>
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Silahkan isi Nama, Email, Role pilih <b>Siswa</b>, absen,
                    dan password anda
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Kemudian pilihlah avatar atau foto profil anda
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Register</b>
                  </Typography>
                  <img src={SignUpImg} alt="" style={{ width: 200 }} />
                </li>
              </ol>
            </li>
          </ol>
        </Box>
      </Paper>
      <Paper className={classes.paper}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", textAlign: "center" }}
          gutterBottom
        >
          Cara Menggunakan Web MMI
        </Typography>
        <Box marginX={2}>
          <ol type="a" style={{ fontWeight: "bold" }}>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Berdiskusi
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Home</b>
                  </Typography>
                  <img src={NavHomePointImg} alt="" style={{ width: 200 }} />
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Selanjutnya tulis bahan untuk diskusi
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Apabila ingin menambahkan gambar, klik <b>GAMBAR</b>
                  </Typography>
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Jika sudah klik <b>POST</b>
                  </Typography>
                  <img src={PostKlikImg} alt="" style={{ width: 200 }} />
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Mengetahui Tujuan Pembelajaran
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Tujuan</b>
                  </Typography>
                  <img src={PurposeImagePoint} alt="" style={{ width: 200 }} />
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Mengetahui Petunjuk Pembelajaran
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Petunjuk</b>
                  </Typography>
                  <img src={GuidePointImage} alt="" style={{ width: 200 }} />
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Mengetahui Anggota
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Anggota</b>
                  </Typography>
                  <img src={AnggotaNavPoint} alt="" style={{ width: 200 }} />
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Untuk mencari anggota, klik <b>Search</b>
                  </Typography>
                  <img
                    src={SearchAnggotaPoint}
                    alt=""
                    style={{ width: "50%" }}
                  />
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Kemudian ketik nama anggota yang akan dicari, lalu tekan{" "}
                    <b>Enter</b> pada keyboard anda
                  </Typography>
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Membaca Materi
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Klik <b>Materi</b>
                  </Typography>
                  <img src={MateriNavPointImg} alt="" style={{ width: 200 }} />
                </li>
                <li>
                  <Typography style={{ fontWeight: "normal" }} variant="body1">
                    Pilih materi yang akan dibaca
                  </Typography>
                  <img src={ChooseMateri} alt="" style={{ width: "70%" }} />
                </li>
              </ol>
            </li>
            <li>
              <Typography style={{ fontWeight: "bold" }} variant="body1">
                Cara Mengerjakan Tugas
              </Typography>
              <ol type="1" style={{ fontWeight: "normal" }}>
                <li>
                  <Typography style={{ fontWeight: "bold" }} variant="body1">
                    Mengerjakan Kuis
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Klik <b>Tugas</b>
                      </Typography>
                      <img src={TugasNav} alt="" style={{ width: 200 }} />
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Setelah muncul quis, klik <b>START QUIZ</b> untuk
                        memulai quiz
                      </Typography>
                      <img
                        src={StartQuizButton}
                        alt=""
                        style={{ width: "70%" }}
                      />
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Silahkan mengerjakan quiz, jangan lupa memperhatikan
                        waktu pengerjaan sebelah pojok kanan pada layar anda
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Setelah selesai, klik <b>FINISH</b>
                      </Typography>
                      <img
                        src={DetailKuisImg}
                        alt=""
                        style={{ width: "70%" }}
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <Typography style={{ fontWeight: "bold" }} variant="body1">
                    Mengerjakan Essay
                  </Typography>
                  <ul>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Klik <b>Tugas</b>
                      </Typography>
                      <img src={TugasNav} alt="" style={{ width: 200 }} />
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Setelah muncul quis, klik <b>START ESSAY</b> untuk untuk
                        mengumpulkan tugas essay
                      </Typography>
                      <img src={EssayPageImg} alt="" style={{ width: "70%" }} />
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Baca soal yang telah disediakan. Jangan lupa
                        memperhatikan deadline pengumpulan tugas essay pada
                        pojok kanan atas.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Kerjakan soal pada software <i>Microsoft Word</i>.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        Unggah tugas anda, klik <b>UPLOAD DOKUMEN</b>
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" gutterBottom>
                        klik <b>SUBMIT</b>
                      </Typography>
                      <img
                        src={DetailEssayImg}
                        alt=""
                        style={{ width: "70%" }}
                      />
                    </li>
                  </ul>
                </li>
              </ol>
            </li>
          </ol>
        </Box>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    margin: "15px 0",
  },
}));

export default Layout(GuidePage);
