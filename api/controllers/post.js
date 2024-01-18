import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};


export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`,`date`,`text` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    const post = data[0];

    // Pastikan ID pengguna saat ini cocok dengan pemilik postingan
    if (post && post.uid === req.userInfo.id) {
      return res.status(200).json(post);
    } else {
      return res.status(403).json("You are not authorized to view this post.");
    }
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`date`, `uid`, `waktu`,`text`) VALUES (?, ?, ?, ?)";

    const waktu = req.body.waktu;

    // Gabungkan date dan waktu menjadi satu string
    const dateTimeString = `${req.body.date} ${waktu}`;

    const values = [
      dateTimeString,
      userInfo.id,
      waktu,
      req.body.text,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};