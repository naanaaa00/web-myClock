import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../img/unnamed.jpg";
import { AuthContext } from "../context/authContext";


const Simpan = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const { currentUser } = useContext(AuthContext);

  const renderUserName = (post) => {
    if (post.uid === currentUser.id) {
      return <b><i>{currentUser.displayName}</i></b>;
    } else {
      return <b><i>anonymous</i></b>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  const userPosts = posts.filter((post) => post.uid === currentUser.id);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      // Refresh the posts after deleting
      const res = await axios.get(`/posts${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="simpan">
        <div className="posts">
          {userPosts.map((post) => (
            <div className="post">
              <div className="content">
                <div className="logo">
                  <img src={Logo} alt="Logo" />
                </div>
                <div className="link">
                  <h2> Text: </h2>
                  <br />
                  <h1>{post.text}</h1>
                </div>
                <div className="bor">
                  <p>
                    <h2>Set Waktu Alarm :</h2>
                  </p>
                  <p className="waktu">{formatDateTime(post.waktu)}</p>
                  <p>
                    <span>
                      <br />
                      <b className="create">create: </b>
                      <br />
                      <p className="waktu">{formatDateTime(post.date)}</p>
                      <br />
                      <b className="user">{currentUser?.username}</b>
                    </span>
                  </p>
                </div>
                <div className="delete"><span onClick={() => handleDelete(post.id)}>Delete</span></div>
                
              </div>
              
            </div>
          ))}
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Simpan;
