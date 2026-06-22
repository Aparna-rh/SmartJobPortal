import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Internships() {

    const [internships, setInternships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/jobs"
            );

            const data = await response.json();

            const filtered = data.filter(job =>
                job.type &&
                job.type.toLowerCase().includes("intern")
            );

            setInternships(filtered);

        }

        catch (err) {
            console.log(err);
        }
    };


    return (

        <div>

            <h1>Internships</h1>

            {
                internships.length === 0 ?

                    <h3>No Internships Available</h3>

                    :

                    internships.map(job => (

                        <div
                            key={job.id}
                            style={{
                                background: "white",
                                padding: "20px",
                                marginBottom: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 10px rgba(0,0,0,.1)"
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

                                onClick={() =>
                                    navigate(`/apply/${job.id}`)
                                }

                                style={{
                                    padding: "10px 20px",
                                    background: "#2563eb",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >

                                Apply

                            </button>

                        </div>

                    ))
            }

        </div>

    );

}

export default Internships;