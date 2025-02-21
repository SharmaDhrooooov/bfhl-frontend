import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      if (!input.trim()) {
        alert("Please enter a valid JSON input.");
        return;
      }

      let parsedInput;
      try {
        parsedInput = JSON.parse(input);
      } catch (error) {
        alert("Invalid JSON format. Please enter valid JSON.");
        return;
      }

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        alert("JSON must have a 'data' key with an array.");
        return;
      }

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
    <div style={styles.container}>
      <h1 style={styles.heading}>BFHL Frontend</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here...'
        style={styles.textarea}
      />
      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>

      {response && (
        <div style={styles.responseBox}>
          <h2 style={styles.responseHeading}>Response:</h2>
          <pre style={styles.responseText}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// Styles for better UI
const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    fontSize: "28px",
    marginBottom: "20px",
  },
  textarea: {
    width: "80%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    resize: "none",
    fontFamily: "monospace",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  responseBox: {
    marginTop: "20px",
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    display: "inline-block",
    textAlign: "left",
  },
  responseHeading: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  },
  responseText: {
    backgroundColor: "#eee",
    padding: "10px",
    borderRadius: "5px",
    fontFamily: "monospace",
  },
};

export default App;
