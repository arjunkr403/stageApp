import { useEffect, useState } from "react";

function App() {
    const [msg, setMsg] = useState("");

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch("/api/hello");
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const data = await response.json();
    //             setMsg(data);
    //             return <h1>{msg}</h1>;
    //         }
    //         catch (error) {
    //             console.error("There was a problem with the fetch operation:", error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    useEffect(()=>{
        fetch("/api/hello")
        .then((res)=>res.json())
        .then((data)=>{
            setMsg(data);
        })
        .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },[]);
    return (
        <div>
            <h1>{msg}</h1>
        </div>
    );
}

export default App;