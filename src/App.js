import React, { useState, useEffect } from "react";

import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState([false]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  //useEffect Runs a piece of code bsed on specific condition
  //
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser)=> { //keeps loggedn in
      if(authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      }
      else{
        //user has logged out
        setUser(null);
      }
    })
    return () => {
      //perform some cleanup actions
      unsubscribe();
    }
  },[user, username]);  

  useEffect(() => {
    //this is where the code runs (1:16)
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      //every time a new post is added , this code fires up
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []); //[] runs once when the app component loads

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=>alert(error.message));
    setOpen(false)
  }

  const signIn =  (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert.apply(error.message))


    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signup">
            <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            ></img>
            </center>
            <Input
              placeholder = "username"
              type = "text"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)} 
              />
            <Input
              placeholder = "email"
              type = "text"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)} 
              />
              <Input
              placeholder = "password"
              type = "text"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)} 
              />
            
            
            <Button type = "submit" onClick={signUp}>Sign Up</Button>
            
          </form>
        </div>
        
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signup">
            <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            ></img>
            </center>
            
            <Input
              placeholder = "email"
              type = "text"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)} 
              />
              <Input
              placeholder = "password"
              type = "text"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)} 
              />
            
            
            <Button type = "submit" onClick={signIn}>Sign In</Button>
            
          </form>
        </div>
        
      </Modal>

      <div className="app__header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        ></img>
       {user ? (
        <Button onClick={() => auth.signOut()}>LogOut</Button>
      ):(
        <div className = "app_loginContainer">
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        </div>
        
        ) }
      </div>

      <div className = "app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
        <Post
          username="Rahul"
          caption="I am coding"
          imageUrl="https://www.freecodecamp.org/news/content/images/2020/11/cra-packagejson.png"
        />
        <Post
          username="Shakthi Balan"
          caption="Wrking on React"
          imageUrl="https://www.freecodecamp.org/news/content/images/2020/11/cra-browser.png"
        />
        <InstagramEmbed
          url='https://www.instagram.com/p/B89Yleupklm/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
        
      </div>
      
    
      {user?.displayName ? (
          <ImageUpload username = {user.dispalyName}/>):(
                  <h3>Sorry you need to login to upload</h3>
          )}

      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
