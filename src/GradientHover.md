## Basic Usage

```jsx
import { GradientHover } from "react-gradient-hover";

<GradientHover>
  <div
    style={{
      padding: "2rem",
      textAlign: "center",
      color: "white",
      textShadow: "1px 1px 2px black",
    }}
  >
    <h2>Hover over me!</h2>
    <p>The gradient will follow your mouse movement.</p>
  </div>
</GradientHover>;
```

## Multiple Gradient Colors

The component supports multiple color stops. The more colors added, the higher the performance cost.

```jsx
<GradientHover
  colors={["#E95A45", "#FCF2C1", "#539C99"]}
  style={{ marginBottom: 10 }}
  animationSpeed={8}
>
  <div style={{ padding: 20 }}>Three-color gradient</div>
</GradientHover>
```

## Interactive Playground

Use the controls below to dynamically experiment with all the component props:

```jsx
function InteractiveDemo() {
  const [colors, setColors] = React.useState(["#0dc3e7", "#fc42ff", "#E6FB46"]);
  const [animationSpeed, setAnimationSpeed] = React.useState(9);
  const [transitionDuration, setTransitionDuration] = React.useState(3);
  const [shouldAlwaysShowGradient, setShouldAlwaysShowGradient] =
    React.useState(true);

  return (
    <div>
      {/* Demo Component */}
      <GradientHover
        colors={colors}
        animationSpeed={animationSpeed}
        transitionDuration={transitionDuration}
        shouldAlwaysShowGradient={shouldAlwaysShowGradient}
      >
        <div
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: "0 0 1rem 0", fontSize: "2rem" }}>
            🚀 Interactive Demo
          </h2>
          <p style={{ margin: 0, fontSize: "1.1rem", maxWidth: "400px" }}>
            Adjust the controls below to see how they affect the behavior of
            this playground.
          </p>
        </div>
      </GradientHover>

      {/* Control Panel */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {/* Animation Speed */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              ⚡ Animation Speed: {animationSpeed.toFixed(0)}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginTop: "0.25rem",
              }}
            >
              Lower = Smoother, Higher = Snappier
            </div>
          </div>

          {/* Transition Duration */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              ⏱️ Transition Duration: {transitionDuration}s
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={transitionDuration}
              onChange={(e) =>
                setTransitionDuration(parseFloat(e.target.value))
              }
              style={{ width: "100%" }}
            />
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginTop: "0.25rem",
              }}
            >
              Duration of gradient transitions
            </div>
          </div>

          {/* Always Show Gradient */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#555",
                cursor: "pointer",
              }}
            >
              🌈 Always Show Gradient
            </label>
            <label style={{ display: "flex", paddingTop: "10px" }}>
              <input
                type="checkbox"
                checked={shouldAlwaysShowGradient}
                onChange={(e) => setShouldAlwaysShowGradient(e.target.checked)}
                style={{ marginRight: "0.5rem", transform: "scale(1.2)" }}
              />
              <div>{JSON.stringify(shouldAlwaysShowGradient)}</div>
            </label>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginTop: "0.25rem",
              }}
            >
              Show gradient even when not hovering
            </div>
          </div>

          {/* Color Controls */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              🎨 Gradient Colors ({colors.length} colors):
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...colors];
                      newColors[index] = e.target.value;
                      setColors(newColors);
                    }}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  />
                  <button
                    onClick={() => {
                      const newColors = colors.filter((_, i) => i !== index);
                      if (newColors.length >= 2) {
                        setColors(newColors);
                      }
                    }}
                    disabled={colors.length <= 2}
                    style={{
                      marginTop: "0.25rem",
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.7rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: colors.length <= 2 ? "#f0f0f0" : "#fff",
                      cursor: colors.length <= 2 ? "not-allowed" : "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setColors([...colors, "#000000"])}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "2px dashed #ddd",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#666",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

<InteractiveDemo />;
```
