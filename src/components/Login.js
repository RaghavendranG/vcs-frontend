import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import '../styles/cssFiles/Login.css'
import 'animate.css';
const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
    const res= await fetch("https://vcs-backend.vercel.app/logIn",{
      method:"POST",
      body:JSON.stringify({
        email,
        password
      }),
      headers:{
        "Content-Type": "application/json",
      }
    })
    const response = await res.json();
    localStorage.setItem("userName",response.userName);
    localStorage.setItem("AuthToken",response.AuthToken);
    swal(response.message);
    navigate("/homepage")
    } catch (error) {
      console.log(error);
      swal('Error occured Logging in')
    }
    


  };
  return (
    <div className="login">
    <div className="container-lg w-50">
      <form onSubmit={(event) => handleSubmit(event)} className="form">
      <h1 className="greet">CodeHub</h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend mx-2 inputBox text-center">
            <span className="input-group-text" id="basic-addon1">
              Email Id :
            </span>
          </div>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your Email ID here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend mx-2 inputBox text-center">
           <span className="input-group-text" id="basic-addon1">
              Password :
            </span> 
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your password here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="btnClass">
        <button type="submit" className="btn btn-success">
          submit
        </button>
        </div>
        <div className="text-center">
        <h4>Login Credentials</h4>
        <div className="credential">
        <div className="cred">
<p>Email - userOne@gmail.com</p>
<p>Password - Password</p>
        </div>
        <div className="cred">
        <p>Email - userTwo@gmail.com</p>
<p>Password - PasswordTwo</p>
        </div>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};
export default LogIn;