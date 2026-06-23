import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplications.css";

function MyApplications() {

const [applications,setApplications]=useState([]);

const userId = 1;


useEffect(()=>{

fetchApplications();

},[]);



const fetchApplications = ()=>{

axios.get(

`https://smartjobportal-production-25fb.up.railway.app/api/applications/${userId}`

)

.then(res=>{

setApplications(res.data);

})

.catch(err=>{

console.log(err);

});

};




const deleteApplication = async(id)=>{

try{


await axios.delete(

`https://smartjobportal-production-25fb.up.railway.app/api/applications/${id}`

);


alert("Application Deleted");


fetchApplications();


}
catch(err){

console.log(err);

alert("Delete Failed");

}




};




return(

<div className="applications-container">

<h2>

My Applications

</h2>



{

applications.length===0

?

<p>No Applications Found</p>

:

applications.map(app=>(


<div

key={app.id}

className="app-card"

>


<h3>

{app.company}

</h3>



<p>

<b>Role :</b>

{app.role}

</p>



<p>

<b>Name :</b>

{app.name}

</p>



<p>

<b>Email :</b>

{app.email}

</p>



<p>

<b>Phone :</b>

{app.phone}

</p>



<p>

<b>Resume :</b>

{app.resume}

</p>



<p>

<b>Status :</b>

<span>

{

app.status==="Applied"

&&

" 🟡 Applied"

}


{

app.status==="Shortlisted"

&&

" 🟢 Shortlisted"

}


{

app.status==="Interview"

&&

" 🔵 Interview"

}


{

app.status==="Accepted"

&&

" ✅ Accepted"

}


{

app.status==="Rejected"

&&

" ❌ Rejected"

}

</span>

</p>



<br/>



<button


onClick={()=>deleteApplication(app.id)}


style={


{


background:"#e74c3c",

color:"white",

padding:"10px 20px",

border:"none",

borderRadius:"6px",

cursor:"pointer"


}


}


>


Delete Application


</button>



</div>


))


}



</div>

);

}

export default MyApplications;