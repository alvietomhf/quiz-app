import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../../components/Layout";
import GambarPolusi from "../../../assets/images/gambarPolusi.jpg";
import GambarPencemaranAir from "../../../assets/images/gambarAirPencemaran.jpg";
import GambarPencemaranTanah from "../../../assets/images/pencemaranTanah.jpg";
import GambarPencemaranSuara from "../../../assets/images/pencemaranSuara.jpg";

const MaterialOne = () => {
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
              Pencemaran
            </Typography>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              Pengelompokkan Macam-Macam Pencemaran Sesuai Tempatnya
            </Typography>
            <Typography variant="subtitle1">
              Berdasarkan tempat terjadinya pencemaran, yakni limbah yang dapat
              mengotori dan berpengaruh terhadap kualitas tempat, contohnya
              pencemaran udara, air, dan tanah.
            </Typography>
            <ol type="1">
              <li style={{ fontWeight: "bold" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Pencemaran Udara
                </Typography>
                <div style={{ fontWeight: "normal" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <img
                      src={GambarPolusi}
                      alt=""
                      style={{ width: 640, borderRadius: 8 }}
                    />
                  </Box>
                  <Typography variant="subtitle1">
                    Polusi udara adalah suatu kondisi dengan kualitas udara
                    menjadi rusak dan terkontaminasi oleh zat berbahaya.
                    Pencemaran udara disebabkan oleh sumber alami maupun
                    kegiatan manusia. Sumber pencemar udara dibedakan menjadi 2
                    yaitu primer dan sekunder.
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        <i>Pencemar primer</i> adalah zat pencemar yang timbul
                        secara langsung dari sumber pencemaran udara. Karbon
                        dioksida (CO2) ialah contoh dari pencemar primer sebab
                        hasil dari pembakaran.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        <i>Pencemar sekunder</i> adalah substansi pencemar yang
                        terbentuk karena reaksi pencemar-pencemar orimer di
                        atmosfer. Pembentukan ozon di dalam kabut fotokimia
                        ialah sebuah contoh pencemaran udara sekunder.
                      </Typography>
                    </li>
                  </ol>
                  <Typography variant="subtitle1">
                    Contoh pencemaran udara yang disebabkan kegiatan alam :
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Aktivitas gunung berapi
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Kebakaran hutan
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Kegiatan mikroorganisme
                      </Typography>
                    </li>
                  </ol>
                  <Typography variant="subtitle1">
                    Contoh pencemaran udara yang disebabkan kegiatan manusia :
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Pembakaran Sampah
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Pembakaran pada kegiatan rumah tangga, industri
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Asap kendaraan bermotor
                      </Typography>
                    </li>
                  </ol>
                  <Typography variant="subtitle1">
                    Kondisi polusi udara dapat mengakibatkan kerugian bagi semua
                    makhluk hidup di bumi, khususnya manusia. Pencemaran udara
                    dapat menyebabkan kesulitan bernafas dan bahkan menyebabkan
                    berbagai kerusakan pada alam secara keseluruhan
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ marginTop: 10, fontWeight: "bold" }}
                  >
                    Dampak dari pencemaran udara
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Iritasi mata dan gangguan saraf.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Bila terjadi hujan asam maka membahayakan kehidupan
                        tumbuhan dan hewan, menyebabkan korosi logam serta
                        merapuhkan struktur candi dan bangunan
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Memicu terjadinya kanker kulit.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Mematikan spesies tumbuhan tertentu.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Pusing dan gangguan paru-paru.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Pemanasan Global.
                      </Typography>
                    </li>
                  </ol>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <iframe
                      width="90%"
                      height="500"
                      src="https://www.youtube.com/embed/pbrpdUiSYMY"
                    />
                  </Box>
                </div>
              </li>
              <li style={{ fontWeight: "bold" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Pencemaran Air
                </Typography>
                <div style={{ fontWeight: "normal" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <img
                      src={GambarPencemaranAir}
                      alt=""
                      style={{ width: 640, borderRadius: 8 }}
                    />
                  </Box>
                  <Typography variant="subtitle1">
                    Dalam PP No. 20/1990 tentang Pengendalian Pencemaran Air,
                    pencemaran air didefinisikan sebagai :{" "}
                    <i>
                      “pencemaran air adalah masuknya atau dimasukkannya mahluk
                      hidup, zat, energi dan atau komponen lain ke dalam air
                      oleh kegiaan manusia sehingga kualitas air turun sampai ke
                      tingkat tertentu yang menyebabkan air tidak berfungsi lagi
                      sesuai dengan peruntukannya”
                    </i>{" "}
                    (Pasal 1, angka 2).
                  </Typography>
                  <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                    Pencemaran air dikenali lewat bau, rasa, dan warna.
                    Pencemaran air ini disebabkan oleh berbagai jenis pencemar
                    yang berasal dari sisa limbah industry, sampah organic, dan
                    anorganik. Pencemaran air dapat disebabkan oleh beberapa
                    jenis pencemar sebagai berikut:
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Pembuangan limbah industri, sisa insektisida, dan
                        pembuangan sampah domestik, misalnya, sisa detergen
                        mencemari air. Buangan industri seperti Pb, Hg, Zn, dan
                        CO, dapat terakumulasi dan bersifat racun.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Sampah organik yang dibusukkan oleh bakteri menyebabkan
                        O2 di air berkurang sehingga mengganggu aktivitas
                        kehidupan organisme air
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Fosfat hasil pembusukan bersama HO3 dan pupuk pertanian
                        terakumulasi dan menyebabkan eutrofikasi, yaitu
                        penimbunan mineral yang menyebabkan pertumbuhan yang
                        cepat pada alga (Blooming alga). Akibatnya, tanaman di
                        dalam air tidak dapat berfotosintesis karena sinar
                        matahari terhalang.
                      </Typography>
                    </li>
                  </ol>
                  <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                    Salah satu bahan pencemar di laut adalah tumpahan minyak
                    bumi, akibat kecelakaan kapal tanker minyak yang sering
                    terjadi. Banyak organisme akuatik yang mati atau keracunan
                    karenanya. (Untuk membersihkan kawasan tercemar diperlukan
                    koordinasi dari berbagai pihak dan dibutuhkan biaya yang
                    mahal. Bila terlambat penanggulangan-nya, kerugian manusia
                    semakin banyak. Secara ekologis, dapat mengganggu ekosistem
                    laut. Bila terjadi pencemaran di air, maka terjadi akumulasi
                    zat pencemar pada tubuh organisme air. Akumulasi pencemar
                    ini semakin meningkat pada organisme pemangsa yang lebih
                    besar. Akibat yang dtimbulkan oleh pencemaran air antara
                    lain:
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Terganggunya kehidupan organisme air karena berkurangnya
                        kandungan oksigen.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Terjadinya ledakan populasi ganggang dan tumbuhan air
                        (eutrofikasi) serta pendangkalan Dasar perairan.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Punahnya biota air, misalnya ikan, yuyu, udang, dan
                        serangga air.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Munculnya banjir akibat got tersumbat sampah.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Menjalarnya wabah muntaber.
                      </Typography>
                    </li>
                  </ol>
                  <Typography
                    variant="subtitle1"
                    style={{ marginTop: 10, fontWeight: "bold" }}
                  >
                    Dampak dari pencemaran air
                  </Typography>
                  <Typography variant="subtitle1">
                    Air limbah yang dibuang tanpa pengolahan terlebih dahulu
                    merupakan salah satu sumber pencemaran air. Air limbah ini
                    adalah sisa dari suatu usaha atau kegiatan manusia berwujud
                    cair. Air limbah ini dapat berasal dari rumah tangga dan
                    industri. Air limbah yang tidak dikelola dengan baik dapat
                    menimbulkan dampak yang tidak menguntungkan bagi lingkungan
                    antara lain sebagai berikut (Sulistyorini, 2009, h. 241) :
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Penurunan Kualitas Lingkungan
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Gangguan Kesehatan
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Memnggangu Pemandangan
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Mempercepat Proses kerusakan Benda
                      </Typography>
                    </li>
                  </ol>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <iframe
                      width="90%"
                      height="500"
                      src="https://www.youtube.com/embed/dFziV5xnQGk"
                    />
                  </Box>
                </div>
              </li>
              <li style={{ fontWeight: "bold" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Pencemaran Tanah
                </Typography>
                <div style={{ fontWeight: "normal" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <img
                      src={GambarPencemaranTanah}
                      alt=""
                      style={{ width: 640, borderRadius: 8 }}
                    />
                  </Box>
                  <Typography variant="subtitle1">
                    Pencemaran tanah banyak diakibatkan oleh sampah-sampah rumah
                    tangga, pasar, industri, kegiatan pertanian, dan peternakan.
                    Sampah dapat dihancurkan oleh jasad-jasad renik menjadi
                    mineral, gas, dan air, sehingga terbentuklah humus. Sampah
                    organik itu misalnya dedaunan, jaringan hewan, kertas, dan
                    kulit. Sampah-sampah tersebut tergolong sampah yang mudah
                    terurai. Sedangkan sampah anorganik seperti besi, alumunium,
                    kaca, dan bahan sintetik seperti plastik, sulit atau tidak
                    dapat diuraikan. Bahan pencemar itu akan tetap utuh hingga
                    300 tahun yang akan datang. Bungkus plastik yang kita buang
                    ke lingkungan akan tetap ada dan mungkin akan ditemukan oleh
                    anak cucu kita setelah ratusan tahun kemudian.
                  </Typography>
                  <Typography variant="subtitle1">
                    Akibat yang ditimbulkan oleh pencemaran tanah antara lain:
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Terganggunya kehidupan organisme (terutama
                        mikroorganisme dalam tanah).
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Berubahnya sifat kimia atau sifat fisika tanah sehingga
                        tidak baik untuk pertumbuhan tanaman.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Mengubah dan mempengaruhi keseimbangan ekologi.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Mempercepat Proses kerusakan Benda
                      </Typography>
                    </li>
                  </ol>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Dampak dari pencemaran tanah
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Penumpukan sampah.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Pemandangan kotor dan berbau busuk.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Sanitasi lingkungan menjadi buruk.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Menurunkan kesuburan tanah.
                      </Typography>
                    </li>
                  </ol>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <iframe
                      width="90%"
                      height="500"
                      src="https://www.youtube.com/embed/vlCbi3Wp1Ak"
                    />
                  </Box>
                </div>
              </li>
              <li style={{ fontWeight: "bold" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Pencemaran Suara
                </Typography>
                <div style={{ fontWeight: "normal" }}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <img
                      src={GambarPencemaranSuara}
                      alt=""
                      style={{ width: 640, borderRadius: 8 }}
                    />
                  </Box>
                  <Typography variant="subtitle1">
                    Pencemaran suara adalah bunyi atau suara yang dikeluarkan
                    oleh suatu benda dan dikeluarkan dengan suara yang sangat
                    keras sehingga dapat mengganggu lingkungan dan makhluk hidup
                    yang tinggal di lingkungan tersebut. Tingkat kebisingan yang
                    tinggi ini yang dapat mengganggu lingkungan sehingga menjadi
                    pencemaran suara Pencemaran suara diakibatkan suara-suara
                    bervolume tinggi yang membuat daerah sekitarnya menjadi
                    bising dan tidak menyenangkan. Pencemaran suara biasanya
                    terjadi disuatu kawasan industri maupun di tempat dimana
                    mobilitas dan aktivitas manusia cukup tinggi seperti jalan
                    raya, bandara, terminal, pasar, dan ditempat-tempat yang
                    sedang dibangun.
                  </Typography>
                  <Typography variant="subtitle1">
                    Jika suara dengan intensitas tinggi terus menerus terjadi
                    dalam jangka waktu yang lama dapat mengganggu manusia bahkan
                    bisa menyebabkan cacat pendengaran yang permanen. Pada
                    umumnya, pencemaran suara bisa dibedakan menjadi 4 jenis,
                    diantaranya:
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Kebisingan implusif yaitu kebisingan yang terjadi dalam
                        waktu singkat dan biasanya mengejutkan. Contohnya, suara
                        ledakan mercon, suara tembakan senjata, dan suara
                        petir.Kebisingan implusif, yaitu kebisingan yang terjadi
                        dalam waktu singkat dan biasanya mengejutkan. Contohnya,
                        suara ledakan mercon, suara tembakan senjata, dan suara
                        petir.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Kebisingan implusif kontinu, yaitu kebisingan impulsif
                        yang terjadi terus-menerus, tetapi hanya
                        sepotong-potong. Contohnya, suara palu yang dipukul
                        terus-menerus.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Kebisingan semi kontinu, yaitu kebisingan kontinu yang
                        hanya sekejap, kemudian hilang dan muncul lagi.
                        Contohnya; suara lalu lalang kendaraan bermotor di
                        jalanan dan suara pesawat terbang yang sedang melintas.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Kebisingan kontinu, yaitu kebisingan yang datang secara
                        terus-menerus dalam waktu yang cukup lama. Contohnya :
                        suara mesin pabrik. Kebisingan kontinu, terutama yang
                        berintensitas tinggi, sering menjadi penyebab rusaknya
                        pendengaran.
                      </Typography>
                    </li>
                  </ol>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Dampak dari pencemaran suara
                  </Typography>
                  <ol type="a">
                    <li>
                      <Typography variant="subtitle1">
                        Gangguan pendengaran.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Gangguan kemampuan komunikasi.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="subtitle1">
                        Gangguan tidur.
                      </Typography>
                    </li>
                  </ol>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginY={2}
                  >
                    <iframe
                      width="90%"
                      height="500"
                      src="https://www.youtube.com/embed/o1mThCOfj8U"
                    />
                  </Box>
                </div>
              </li>
            </ol>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout(MaterialOne, "Pencemaran");
