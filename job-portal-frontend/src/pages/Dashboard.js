import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Dashboard.css";

function Dashboard(){

const navigate=useNavigate();

const [dashboard,setDashboard]=useState({

totalJobs:0,
appliedJobs:0,
savedJobs:0,
shortlisted:0,
interviews:0

});


useEffect(()=>{

fetchDashboard();

},[]);



const fetchDashboard=async()=>{

try{

const response=await fetch(
"http://localhost:8080/api/dashboard"
);

const data=await response.json();

setDashboard(data);

}

catch(error){

console.log(error);

}

};



return(

<div className="dashboard-container">


<h1>

Welcome Back 👋

</h1>



<div className="cards">



<div
className="card"
onClick={()=>navigate("/search-jobs")}
>

<h2>{dashboard.totalJobs}</h2>

<p>Total Jobs</p>

</div>




<div
className="card"
onClick={()=>navigate("/my-applications")}
>

<h2>{dashboard.appliedJobs}</h2>

<p>Applied Jobs</p>

</div>




<div
className="card"
onClick={()=>navigate("/my-applications")}
>

<h2>{dashboard.shortlisted}</h2>

<p>Shortlisted</p>

</div>




<div
className="card"
onClick={()=>navigate("/my-applications")}
>

<h2>{dashboard.interviews}</h2>

<p>Interviews</p>

</div>




<div
className="card"
onClick={()=>navigate("/search-jobs")}
>

<h2>{dashboard.savedJobs}</h2>

<p>Saved Jobs</p>

</div>


</div>





<div className="recent-section">

<h2>

Recent Activities

</h2>


<p>

Applied Jobs : {dashboard.appliedJobs}

</p>


<p>

Shortlisted : {dashboard.shortlisted}

</p>


<p>

Interviews : {dashboard.interviews}

</p>


<p>

Saved Jobs : {dashboard.savedJobs}

</p>



</div>



</div>

);

}

export default Dashboard;