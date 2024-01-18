import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import mqtt from 'mqtt';
import mysql from 'mysql';

import cors from "cors";
const app = express();

const client = mqtt.connect("mqtt://test.mosquitto.org");
const topik = 'topik1';


let processRunning = true;
let delayCheck = false;

// client.on("connect", () => {
//   console.log("Klien terhubung ke broker MQTT");
// });

client.on('connect', () => {
  // Melakukan subscribe ke topik setelah koneksi ke broker MQTT berhasil
  client.subscribe(topik, (err) => {
      if (!err) {
          console.log('Klien terhubung ke broker MQTT');
      }
  });
});

client.on('message', (topic, message) => {
  // Menangani pesan yang diterima dari MQTT
  message = message.toString();
  console.log(`Pesan diterima pada topik ${topic}: ${message}`);

  if (message === '0') {
      // Menghentikan sementara proses jika pesan '0' diterima
      console.log('Proses dihentikan sementara pada:', new Date());
      processRunning = false;
  }
});


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.get('/btnOff' , (req , res) => {
  // console.log('Pesan terkirim untuk menghentikan buzzer');
  // client.publish('topik1', '0');
  // res.send('Klik berhasil!');

  // Mengirim pesan '0' ke broker MQTT saat tombol diklik
  client.publish(topik, '0');
  console.log('Pesan terkirim untuk menghentikan buzzer');
  
  // Menetapkan penahanan proses memeriksa alarm setelah tombol diklik
  delayCheck = true;
  
  // Melepaskan penahanan setelah beberapa detik (misalnya, 10 detik)
  setTimeout(() => {
      delayCheck = false;

      checkAlarms();
  }, 50000); // Atur waktu penahanan dalam milidetik (contoh 10 detik) secondsUntilNextMinute * 1000

  res.send('Klik berhasil!');
});

app.get('/stop', (req, res) => {
  // Mengirim pesan '1' ke broker MQTT saat tombol stop diklik
  client.publish(topik, '1');
  console.log('Pesan terkirim untuk menyalakan kembali buzzer');
  
  // Mengaktifkan kembali proses
  processRunning = true;
  
  res.send('Proses dihentikan sementara!');
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clock'
});

connection.connect((err) => {
  // Menangani koneksi ke database
  if (err) {
      console.error('Gagal terhubung ke database:', err);
      return;
  }
  console.log('Terhubung ke database MySQL');
});

function checkAlarms() {
  // // Memeriksa alarm hanya jika proses berjalan dan tidak ada penahanan
  // if (!processRunning || delayCheck) {
  //     console.log('Proses dihentikan sementara pada:', new Date());
  //     return;
  // }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const currentTime = `${currentHour}:${currentMinute}`;

  console.log('Checking alarms at:', currentTime);

  const query = `
      SELECT * FROM posts
      WHERE DATE_FORMAT(waktu, '%H:%i') = ?;
  `;

  connection.query(query, [currentTime], (err, results) => {
      if (err) {
          console.error('Kesalahan dalam kueri:', err);
          return;
      }

      if (results.length > 0) {
          results.forEach((row) => {
              console.log(`Mengirim perintah ke NodeMCU untuk menghidupkan buzzer`);
              client.publish(topik, '1');
          });
      } else {
          console.log('Tidak ada alarm pada waktu ini.');
      }
  });
}

// Memeriksa alarm setiap 5 detik pada database jika tidak ada penahanan
setInterval(() => {
  if (!delayCheck) {
      checkAlarms();
  }
}, 5000);






app.listen(8800, () => {
  console.log("Connected!");
});
