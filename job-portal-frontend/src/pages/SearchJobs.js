import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchJobs() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState("");

    const userId = 1;

    useEffect(() => {
        getJobs();
    }, []);


    const getJobs = async () => {

        try {

            const response = await fetch(
                "https://smartjobportal-production-25fb.up.railway.app/api/jobs"
            );

            const data = await response.json();

            setJobs(data);

        }

        catch (err) {
            console.log(err);
        }

    };


    const searchJobs = async () => {

        try {

            if(keyword===""){
                getJobs();
                return;
            }

            const response = await fetch(

                `https://smartjobportal-production-25fb.up.railway.app/api/jobs/search?keyword=${keyword}`

            );

            const data = await response.json();

            setJobs(data);

        }

        catch(err){
            console.log(err);
        }

    };



    const saveJob = async(jobId)=>{

        try{

            const savedJob={

                userId:userId,
                jobId:jobId

            };


            const response=await fetch(

                "https://smartjobportal-production-25fb.up.railway.app/api/savedjobs",

                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(savedJob)

                }

            );


            if(response.ok){

                alert("Job Saved");

            }
            else{

                alert("Already Saved");

            }

        }

        catch(err){

            console.log(err);

        }

    };



    return (

        <div>

            <h1>Search Jobs</h1>

            <br/>


            <input

                placeholder="Search Jobs"

                value={keyword}

                onChange={(e)=>setKeyword(e.target.value)}

                style={{

                    padding:"10px",
                    width:"300px",
                    borderRadius:"5px",
                    border:"1px solid gray"

                }}

            />


            <button

                onClick={searchJobs}

                style={{

                    marginLeft:"10px",
                    padding:"10px 20px"

                }}

            >

                Search

            </button>


            <br/>
            <br/>


            {

                jobs.length===0 ?

                <h3>No Jobs Found</h3>

                :

                jobs.map(job=>(


                    <div

                        key={job.id}

                        style={{

                            background:"white",
                            padding:"20px",
                            marginBottom:"20px",
                            borderRadius:"10px",
                            boxShadow:"0 2px 10px rgba(0,0,0,.1)"

                        }}

                    >

                        <h3>{job.title}</h3>

                        <p>
                            <b>Company :</b> {job.company}
                        </p>

                        <p>
                            <b>Location :</b> {job.location}
                        </p>

                        <p>
                            <b>Salary :</b> {job.salary}
                        </p>

                        <p>
                            <b>Type :</b> {job.type}
                        </p>


                        <button

                            onClick={()=>
                                navigate(`/apply/${job.id}`)
                            }

                            style={{

                                padding:"10px 20px",
                                background:"#2563eb",
                                color:"white",
                                border:"none",
                                borderRadius:"6px",
                                cursor:"pointer"

                            }}

                        >

                            Apply

                        </button>



                        <button

                            onClick={()=>
                                saveJob(job.id)
                            }

                            style={{

                                marginLeft:"10px",
                                padding:"10px 20px",
                                background:"#16a34a",
                                color:"white",
                                border:"none",
                                borderRadius:"6px",
                                cursor:"pointer"

                            }}

                        >

                            Save Job

                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default SearchJobs;