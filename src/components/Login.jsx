import imgLogin from "../img/signin-image.jpg";
import "../css/login.css";
import "../css/material-design-iconic-font.css";
import "../css/material-design-iconic-font.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    let API = "https://youtube-backend-pvou.onrender.com"
    const [name,setName] = useState("")
    const [pass,setPass] = useState("")
    const [isError,setIsError] = useState("")
    let navigate = useNavigate()
    function clickLogin(e){
        e.preventDefault()

        axios.post(`${API}/api/login`,{
            "userName":name,
            "password":pass
        }).then(res=> {
            if(res.status === 200){
                window.localStorage.setItem("token",res.data.token)
                window.localStorage.setItem("data",JSON.stringify(res.data.data))
                navigate("/")
            }
        }).catch(error => {
            setIsError(error.response.data.message)
            console.log(error)
        })
    }
  return (
    <body>
      <div class="container3">
        <div class="wrapperLogin sign-in">
          <form id="loginForm" action="#" class="site-form">
            <h1 class="title">Sign in</h1>
            <span
              id="errorMessage"
              style={{ "margin-bottom": "15px", height: "19px", color: "red" }}
            >
                {
                    isError ? isError : <></>
                }
            </span>
            <label>
              <span class="zmdi zmdi-account"></span>
              <input onChange={e => setName(e.target.value)} type="text" id="usernameInput" placeholder="Your name" />
            </label>
            <label>
              <span class="zmdi zmdi-lock"></span>
              <input
                onChange={e => setPass(e.target.value)}
                type="password"
                id="passwordInput"
                placeholder="Password"
              />
              <button
                class="zmdi zmdi-eye"
                id="showButton"
                type="button"
              ></button>
            </label>
            <input onClick={clickLogin} type="submit" value="Log in" id="submitButton" />
          </form>
          <div style={{ "margin-top": "20px" }}>
            <Link style={{ "margin-right": "25px" }} to="/" class="sign-link">
              home
            </Link>
            <Link to="/register" class="sign-link">
              Create an account
            </Link>
          </div>
          <img src={imgLogin} alt="signin-image" class="signin-image" />
        </div>
      </div>
    </body>
  );
}
