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

        {/* Faster Animation & Custom Styling */}
        <GradientHover
          colors={["#f093fb", "#f5576c"]}
          animationSpeed={0.05}
          borderRadius="20px"
          transitionDuration={0.5}
          activeOverlayOpacity={0.1}
        >
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Faster Animation & Custom Styling</h2>
            <p>
              Faster movement, quicker transition, more visible click effect!
            </p>
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

        {/* Slow Transition */}
        <GradientHover
          colors={["#11998e", "#38ef7d"]}
          transitionDuration={3}
          borderRadius="25px"
        >
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              background: "#f5f5f5",
            }}
          >
            <h2>Slow Transition</h2>
            <p>3-second gradient transition for a smooth effect</p>
          </div>
        </GradientHover>
      </div>
    </div>
  );
}

export default App;
