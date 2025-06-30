import React from "react";
import { GradientHover } from "react-gradient-hover";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>React Gradient Hover Examples</h1>

      <div style={{ display: "grid", gap: "2rem", marginTop: "2rem" }}>
        {/* Basic Example */}
        <GradientHover>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Basic Gradient Hover</h2>
            <p>
              Hover over this box to see the gradient effect follow your mouse!
            </p>
          </div>
        </GradientHover>

        {/* Custom Colors */}
        <GradientHover colors={["#667eea", "#764ba2"]}>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Purple Gradient</h2>
            <p>Custom gradient colors</p>
          </div>
        </GradientHover>

        {/* Faster Animation */}
        <GradientHover
          colors={["#f093fb", "#f5576c"]}
          animationSpeed={0.05}
          borderRadius="20px"
        >
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Faster Animation</h2>
            <p>This gradient moves faster!</p>
          </div>
        </GradientHover>

        {/* Click Handler */}
        <GradientHover
          colors={["#4facfe", "#00f2fe"]}
          onClick={() => alert("Clicked!")}
        >
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Clickable</h2>
            <p>Click me!</p>
          </div>
        </GradientHover>
      </div>
    </div>
  );
}

export default App;
