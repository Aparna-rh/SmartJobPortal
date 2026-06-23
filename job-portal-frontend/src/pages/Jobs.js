import React, { useEffect, useState } from "react";

function Job() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {

        try {

            const response = await fetch(
                "https://smartjobportal-production-25fb.up.railway.app/api/jobs"
            );

            const data = await response.json();

            setJobs(data);

        } catch (error) {

            console.log(error);
            alert("Failed to fetch jobs");

        }

        setLoading(false);
    };


    const searchJobs = async () => {

        try {

            const response = await fetch(
                `https://smartjobportal-production-25fb.up.railway.app/api/jobs/search?keyword=${search}`
            );

            const data = await response.json();

            setJobs(data);

        } catch (error) {

            console.log(error);
        }

    };


    if (loading) {
        return <h2>Loading Jobs...</h2>;
    }


    return (

        <div style={{padding:"30px"}}>

            <h2>Available Jobs</h2>

            <input
                placeholder="Search Jobs"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <button onClick={searchJobs}>
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
                            border:"1px solid #ddd",
                            padding:"20px",
                            marginBottom:"20px",
                            borderRadius:"10px"
                        }}
                    >

                        <h3>{job.title}</h3>

                        <p>{job.company}</p>

                        <p>{job.location}</p>

                        <p>{job.description}</p>

                        <p>₹ {job.salary}</p>

                        <button>
                            Apply
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default Job;