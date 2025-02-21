import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      // Check if input is empty
      if (!input.trim()) {
        alert("Please enter a valid JSON input.");
        return;
      }

      // Validate JSON format
      let parsedInput;
      try {
        parsedInput = JSON.parse(input);
      } catch (error) {
        alert("Invalid JSON format. Please enter valid JSON.");
        return;
      }

      // Ensure the JSON has a "data" key and it's an array
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        alert("JSON must have a 'data' key with an array.");
        return;
      }

      // Send request to backend
      const res = await axios.post(
        "https://web-production-0e91f.up.railway.app/bfhl",
        parsedInput
      );
      setResponse(res.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("API error. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL Frontend</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here'
        rows={5}
        cols={50}
        style={{ width: "80%", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      {response && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>Response:</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              display: "inline-block",
              textAlign: "left",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
