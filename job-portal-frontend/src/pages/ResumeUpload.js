import React, { useState } from "react";

function ResumeUpload() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const uploadResume = async () => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const response = await fetch(
                "http://localhost:8080/api/resume/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.text();

            setMessage(data);

        } catch (error) {

            console.log(error);

            setMessage("Upload Failed");
        }
    };

    return (

        <div>

            <h2>Resume Upload</h2>

            <input
                type="file"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />

            <br />
            <br />

            <button onClick={uploadResume}>
                Upload
            </button>

            <p>{message}</p>

        </div>

    );
}

export default ResumeUpload;