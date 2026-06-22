import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";

function Register(){

const navigate = useNavigate();

const [user,setUser] = useState({

name:"",
email:"",
password:"",
role:"USER"

});


const handleChange=(e)=>{

setUser({

...user,
[e.target.name]:e.target.value

});

};


const register = async()=>{

try{

const response = await fetch(

"http://localhost:8080/api/auth/register",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

}

);


const data = await response.text();

alert(data);

if(data==="Registered Successfully"){

navigate("/login");

}

}
catch(error){

console.log(error);

alert("Registration Failed");

}

};


return(

<div className="auth-container">

<div className="auth-card">

<h2>Create Account 🚀</h2>

<p className="subtitle">
Join Smart Job Portal
</p>


<input

name="name"
placeholder="Full Name"
value={user.name}
onChange={handleChange}

/>


<input

name="email"
placeholder="Email"
value={user.email}
onChange={handleChange}

/>



<input

type="password"
name="password"
placeholder="Password"
value={user.password}
onChange={handleChange}

/>



<select

name="role"
value={user.role}
onChange={handleChange}

>

<option value="USER">
User
</option>

<option value="ADMIN">
Admin
</option>

</select>



<button onClick={register}>

Register

</button>


</div>

</div>

);

}

export default Register;