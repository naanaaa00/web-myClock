import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  // getWaktu,
  // updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost); //ubah
router.delete("/:id", deletePost);

// router.get("/getWaktu", getWaktu)


export default router;
