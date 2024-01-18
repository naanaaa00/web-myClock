import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Gabungkan impor
import moment from "moment";


const Write = () => {
  const state = useLocation().state;
  const [dateTime, setDateTime] = useState(""); // Tambah state untuk datetime
  const [text, setText] = useState("");
  const [buzzerStatus, setBuzzerStatus] = useState(false);



  const navigate = useNavigate()
  const handleOff = async() => {
    try {
      // Kirim pesan MQTT untuk mematikan buzzer
      await axios.get("http://localhost:8800/btnOff"); // Sesuaikan dengan endpoint yang sesuai di server
      setBuzzerStatus(true); // Set status buzzer menjadi mati
      console.log("Buzzer dimatikan");
    } catch (error) {
      console.error("Gagal mematikan buzzer:", error);
    }
  }

  
  const handleClick = async (e) => {
    e.preventDefault();
   

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            text: text,
            waktu: dateTime,
          })
        : await axios.post(`/posts/`, {
            text: text,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            waktu: dateTime,
          });
      navigate("/simpan")
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="container">
    <div className="write">
      <div className="buttonOFF">
      <span>
          <b onClick={handleOff}>menengo</b>
        </span>
      </div>
      <div className="jam">
        <input
          required
          type="datetime-local"
          placeholder="datetime"
          value={dateTime} // Hubungkan dengan state dateTime
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>
      <div className="text-jam">
        <input
          type="text"
          placeholder="Text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Link className="history" to="/simpan">
        <span>
          <b>history</b>
        </span>
      </Link>
      <div className="buttons">
        <button onClick={handleClick}>Publish</button>
      </div>
    </div>
    </div>
  );
};

export default Write;
