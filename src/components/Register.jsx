import imgRegister from "../img/signup-image.jpg"
import "../css/register.css"
import "../css/material-design-iconic-font.css"
import "../css/material-design-iconic-font.min.css"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


export default function Register(){
    let API = "https://youtube-backend-pvou.onrender.com"
    const [name,setName] = useState("")
    const [pass,setPass] = useState("")
    const [file,setFile] = useState("")
    const [isError,setIsError] = useState(false)

    let navigate = useNavigate()

    function clickRegister(e){
        e.preventDefault()

        let formData = new FormData()

        formData.append("userName",name)
        formData.append("password",pass)
        formData.append("profilImg",file)

        axios.post(`${API}/api/register`,formData,{
            headers:{
                "Content-Type":"application/multi-part"
            }
        }).then(res => {
            if(res.status === 201){
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
    <div class="container2">
        <div class="wrapper">
            <h1 class="title">Registration Page</h1>
            <form id="registerForm" action="#" class="site-form">
                <span id="errorMessage" style={{"margin-bottom": "15px", "height": "19px", "color": "red"}}>
                {
                    isError ? isError : <></>
                }
                </span>
                <label>
                    <span class="zmdi zmdi-account"></span>
                    <input onChange={e => setName(e.target.value)} type="text" id="usernameInput" placeholder="Your name" required />
                </label>
                <label>
                    <span class="zmdi zmdi-lock"></span>
                    <input onChange={e => setPass(e.target.value)} type="password" id="passwordInput" placeholder="Password" required />
                    <button  class="zmdi zmdi-eye" type="button" id="showButton"></button>
                </label>
                <label class="custom-upload">
                    <span class="zmdi zmdi-upload"></span>
                    <span class="file-name">click upload a avatar picture</span>
                    <input onChange={e => setFile(e.target.files[0])}  type="file" id="uploadInput" accept="image/*" />
                </label>
                <input onClick={clickRegister} type="submit" value="Register" id="submitButton" />
            </form>
            <div style={{"margin-top": "20px"}}>
               <Link style={{"margin-right": "25px"}} to="/" class="sign-link">home</Link>
               <Link to="/login" class="sign-link">I am already member</Link>
           </div>
            <img src={imgRegister} alt="signup-image" class="signup-image" />
        </div>
    </div>

</body>
    )
}