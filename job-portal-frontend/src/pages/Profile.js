import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {

const userId = 1;

const emptyProfile = {

name:"",
email:"",
phone:"",
dob:"",
gender:"",
address:"",

tenthPercentage:"",
twelfthPercentage:"",
cgpa:"",
college:"",
degree:"",

skills:"",
experience:"",

linkedin:"",
github:"",

aboutMe:"",

profileImage:"",
resumeUrl:""

};


const [profile,setProfile]=useState(emptyProfile);
const [editMode,setEditMode]=useState(true);
const [loading,setLoading]=useState(true);


useEffect(()=>{
fetchProfile();
},[]);



const fetchProfile=async()=>{

try{

const response=await fetch(
`https://smartjobportal-production-25fb.up.railway.app/api/users/${userId}`
);

const data=await response.json();

if(data && data.name){
setProfile(data);
setEditMode(false);
}

}

catch(error){
console.log(error);
}

finally{
setLoading(false);
}

};



const handleChange=(e)=>{

setProfile({

...profile,
[e.target.name]:e.target.value

});

};



const handleImageChange=(e)=>{

const file=e.target.files[0];

if(file){

setProfile({

...profile,

profileImage:
URL.createObjectURL(file)

});

}

};



const handleResumeChange=(e)=>{

const file=e.target.files[0];

if(file){

setProfile({

...profile,

resumeUrl:file.name

});

}

};



const saveProfile=async()=>{

try{

await fetch(

`https://smartjobportal-production-25fb.up.railway.app/api/users/${userId}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(profile)

}

);

alert("Profile Saved");

setEditMode(false);

}

catch(error){

console.log(error);

alert("Failed");

}

};



if(loading){

return <h2>Loading...</h2>;

}
return(

<div className="profile-container">

{

editMode ? (

<>

<div className="profile-banner"></div>

<div className="profile-card">

<div className="profile-header">

{

profile.profileImage ?

<img
src={profile.profileImage}
alt=""
className="profile-image"
/>

:

<div className="profile-placeholder">

Upload Photo

</div>

}


<div>

<input
type="file"
onChange={handleImageChange}
/>

</div>

</div>


<h3 className="section-title">

Personal Details

</h3>



<div className="form-grid">


<input
className="form-control"
name="name"
placeholder="Name"
value={profile.name}
onChange={handleChange}
/>



<input
className="form-control"
name="email"
placeholder="Email"
value={profile.email}
onChange={handleChange}
/>



<input
className="form-control"
name="phone"
placeholder="Phone"
value={profile.phone}
onChange={handleChange}
/>



<input
type="date"
className="form-control"
name="dob"
value={profile.dob}
onChange={handleChange}
/>



<select
className="form-control"
name="gender"
value={profile.gender}
onChange={handleChange}
>

<option value="">Gender</option>
<option>Male</option>
<option>Female</option>

</select>



<input
className="form-control"
name="address"
placeholder="Address"
value={profile.address}
onChange={handleChange}
/>

</div>



<h3 className="section-title">

Education

</h3>


<div className="form-grid">


<input
className="form-control"
name="tenthPercentage"
placeholder="X Percentage"
value={profile.tenthPercentage}
onChange={handleChange}
/>


<input
className="form-control"
name="twelfthPercentage"
placeholder="XII Percentage"
value={profile.twelfthPercentage}
onChange={handleChange}
/>


<input
className="form-control"
name="cgpa"
placeholder="CGPA"
value={profile.cgpa}
onChange={handleChange}
/>


<input
className="form-control"
name="college"
placeholder="College"
value={profile.college}
onChange={handleChange}
/>


<input
className="form-control"
name="degree"
placeholder="Degree"
value={profile.degree}
onChange={handleChange}
/>


<input
className="form-control"
name="experience"
placeholder="Experience"
value={profile.experience}
onChange={handleChange}
/>


</div>
<h3 className="section-title">
Professional
</h3>

<input
className="form-control"
name="skills"
placeholder="Skills"
value={profile.skills}
onChange={handleChange}
/>

<br/>

<input
className="form-control"
name="linkedin"
placeholder="LinkedIn URL"
value={profile.linkedin}
onChange={handleChange}
/>

<br/>

<input
className="form-control"
name="github"
placeholder="GitHub URL"
value={profile.github}
onChange={handleChange}
/>

<br/>

<textarea
className="form-control"
name="aboutMe"
placeholder="About Me"
value={profile.aboutMe}
onChange={handleChange}
/>

<br/>

<h3 className="section-title">
Resume
</h3>

<input
type="file"
accept=".pdf,.doc,.docx"
onChange={handleResumeChange}
/>

<br/><br/>

{
profile.resumeUrl &&

<p>

Selected Resume :

<b>

{profile.resumeUrl}

</b>

</p>

}

<br/>

<button
className="save-btn"
onClick={saveProfile}
>

Save Profile

</button>

</div>

</>

)

:

(

<>

<div className="profile-banner"></div>

<div className="profile-card">


<div className="profile-header">

{

profile.profileImage ?

<img
src={profile.profileImage}
alt=""
className="profile-image"
/>

:

<div className="profile-placeholder">

Photo

</div>

}


<div className="user-info">

<h1>{profile.name}</h1>

<p>

📧 {profile.email}

</p>

<p>

📱 {profile.phone}

</p>

<p>

📍 {profile.address}

</p>

</div>

</div>


<div className="info-section">

<h3>🎓 Education</h3>

<p>X : {profile.tenthPercentage}</p>
<p>XII : {profile.twelfthPercentage}</p>
<p>CGPA : {profile.cgpa}</p>
<p>College : {profile.college}</p>
<p>Degree : {profile.degree}</p>

</div>


<div className="info-section">

<h3>💼 Professional</h3>

<div>

{

profile.skills?.split(",")

.map((skill,index)=>(

<span
key={index}
className="skill"
>

{skill.trim()}

</span>

))

}

</div>

<p>

Experience :

{profile.experience}

</p>

</div>


<div className="info-section">

<h3>🔗 Social</h3>

<p>

LinkedIn :

{profile.linkedin}

</p>

<p>

GitHub :

{profile.github}

</p>

</div>


<div className="info-section">

<h3>📝 About Me</h3>

<p>

{profile.aboutMe}

</p>

</div>


<div className="info-section">

<h3>📄 Resume</h3>

<div className="resume-box">

{

profile.resumeUrl

?

profile.resumeUrl

:

"No Resume Uploaded"

}

</div>

</div>


<button
className="edit-btn"
onClick={()=>setEditMode(true)}
>

Edit Profile

</button>

</div>

</>

)

}

</div>

);

}

export default Profile;