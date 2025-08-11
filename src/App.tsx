
import React from "react";
import logo from "./assets/images/Vysyamalalogo.png"; // adjust the path as needed

export default function App() {
  const red = "#F43B4E";

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#fff",
        color: red,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Logo with local image */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={logo}
          alt="Vysyamala Logo"
          style={{ width: "120px", height: "auto" }}
        />
      </div>

      <h1 style={{ marginTop: "20px", fontSize: "2rem" }}>
        We’ll be back soon
      </h1>

      <p style={{ maxWidth: "500px", fontSize: "1rem", color: "#555" }}>
        Our website is currently undergoing scheduled maintenance to serve you
        better. We appreciate your patience and will be back shortly.
      </p>

      <button
        style={{
          backgroundColor: red,
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px",
          fontWeight: "bold",
        }}
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
    </div>
  );
}
