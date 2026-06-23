// ApplyJob.js

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ApplyJob() {

const { id } = useParams();
const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

const userId = user?.id;

const [job,setJob]=useState({});
const [editMode,setEditMode]=useState(false);

const [application,setApplication]=useState({

name:"",
email:"",
phone:"",
resume:""

});

const [resumeFile,setResumeFile]=useState(null);



useEffect(()=>{

fetchJob();
fetchUser();

},[]);




const fetchJob=async()=>{

try{

const response=await fetch(

`https://smartjobportal-production-25fb.up.railway.app/api/jobs/${id}`

);

const data=await response.json();

setJob(data);

}

catch(err){

console.log(err);

}

};





const fetchUser=async()=>{

try{

const response=await fetch(

`https://smartjobportal-production-25fb.up.railway.app/api/users/${userId}`

);

const data=await response.json();


setApplication({

name:data.name || "",

email:data.email || "",

phone:data.phone || "",

resume:data.resumeUrl || ""

});

}

catch(err){

console.log(err);

}

};





const handleChange=(e)=>{

setApplication({

...application,

[e.target.name]:e.target.value

});

};





const saveChanges=()=>{


if(resumeFile){

setApplication({

...application,

resume:resumeFile.name

});

}


setEditMode(false);


};





const apply=async()=>{


const applicationData={


userId:userId,


name:application.name,


email:application.email,


phone:application.phone,


resume:application.resume,


company:job.company,


role:job.title,


status:"Pending",


appliedDate:new Date().toLocaleDateString()


};



try{


await fetch(


"https://smartjobportal-production-25fb.up.railway.app/api/applications",


{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(applicationData)


}


);



alert("Applied Successfully");


navigate("/my-applications");


}


catch(err){


console.log(err);


alert("Failed");


}


};





return(


<div


style={


{


maxWidth:"700px",


margin:"auto",


padding:"20px"


}


}


>



<div


style={



{


background:"white",


padding:"30px",


borderRadius:"12px",


boxShadow:"0 2px 12px rgba(0,0,0,.1)"


}



}


>



<h1>


Apply Job


</h1>



<h2>


{job.title}


</h2>



<p>


🏢 {job.company}


</p>



<p>


📍 {job.location}


</p>



<p>


💰 {job.salary}


</p>




<hr/>




<h2>


Your Details


</h2>





{


!editMode



?



<>



<p>


<b>Name :</b>


{application.name}


</p>



<p>


<b>Email :</b>


{application.email}


</p>



<p>


<b>Phone :</b>


{application.phone}


</p>



<p>


<b>Resume :</b>


{


application.resume


?


application.resume


:


"No Resume Uploaded"


}


</p>




<button



onClick={()=>setEditMode(true)}



style={



{


padding:"10px 20px",


background:"#f39c12",


color:"white",


border:"none",


borderRadius:"6px",


cursor:"pointer"


}



}


>



Edit Details



</button>




</>




:



<>




<label>


Name


</label>



<input


name="name"


value={application.name}


onChange={handleChange}


style={inputStyle}


/>




<label>


Email


</label>



<input


name="email"


value={application.email}


onChange={handleChange}


style={inputStyle}


/>




<label>


Phone


</label>



<input


name="phone"


value={application.phone}


onChange={handleChange}


style={inputStyle}


/>




<p>


<b>Current Resume :</b>


{


application.resume


?


application.resume


:


"No Resume"


}


</p>




<label>


Upload New Resume


</label>




<input



type="file"



accept=".pdf,.doc,.docx"



onChange={(e)=>{


setResumeFile(


e.target.files[0]


);


}}



/>



<br/>
<br/>




<button



onClick={saveChanges}



style={



{


padding:"10px 20px",


background:"#27ae60",


color:"white",


border:"none",


borderRadius:"6px",


marginRight:"10px"


}



}


>



Save Changes



</button>




<button



onClick={()=>setEditMode(false)}



style={



{


padding:"10px 20px",


background:"#95a5a6",


color:"white",


border:"none",


borderRadius:"6px"


}



}


>



Cancel



</button>




</>



}





<br/>
<br/>




<button



onClick={apply}



style={



{


width:"100%",


padding:"14px",


background:"#2563eb",


color:"white",


border:"none",


borderRadius:"8px",


fontSize:"16px",


cursor:"pointer"


}



}


>



Submit Application



</button>




</div>



</div>



);


}



const inputStyle={


width:"100%",


padding:"12px",


marginTop:"5px",


marginBottom:"15px",


border:"1px solid #ddd",


borderRadius:"8px",


outline:"none"


};



export default ApplyJob;