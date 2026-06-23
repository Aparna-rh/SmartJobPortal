import {useEffect,useState} from "react";
import axios from "axios";

function SavedJobs(){

const [jobs,setJobs]=useState([]);
const userId=1;

useEffect(()=>{
fetchJobs();
},[]);


const fetchJobs=async()=>{

try{

const res=await axios.get(
`https://smartjobportal-production-25fb.up.railway.app/api/savedjobs/${userId}`
);

setJobs(res.data);

}

catch(err){
console.log(err);
}

};


return(

<div>

<h1>Saved Jobs</h1>

{

jobs.length===0 ?

<h3>No Saved Jobs</h3>

:

jobs.map(job=>(

<div key={job.id}>

<p>Job Id : {job.jobId}</p>

<hr/>

</div>

))

}

</div>

);

}

export default SavedJobs;