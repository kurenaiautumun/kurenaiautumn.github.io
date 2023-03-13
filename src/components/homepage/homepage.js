import React, { useEffect, useState } from "react";

const Homepage = () => {
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        const url = "http://100.25.166.88:8080/";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json.slip.advice);
                setAdvice(json.slip.advice);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <h2>
            <p>{advice}</p>
        </h2>
    );
};

export default Homepage;
