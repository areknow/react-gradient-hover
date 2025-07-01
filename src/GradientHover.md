# GradientHover

The main component that creates the interactive gradient hover effect.

## Basic Usage

```jsx
import { GradientHover } from 'react-gradient-hover';

<GradientHover>
  <div style={{ padding: '2rem' }}>
    <h2>Hover over me!</h2>
    <p>The gradient will follow your mouse movement.</p>
  </div>
</GradientHover>
```

## Interactive Playground

Use the controls below to dynamically experiment with all the component props:

```jsx
function InteractiveDemo() {
  const [color1, setColor1] = React.useState('#0dc3e7');
  const [color2, setColor2] = React.useState('#fc42ff');
  const [animationSpeed, setAnimationSpeed] = React.useState(0.01);
  const [transitionDuration, setTransitionDuration] = React.useState(1);
  const [shouldAlwaysShowGradient, setShouldAlwaysShowGradient] = React.useState(true);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* Demo Component */}
      <GradientHover
        colors={[color1, color2]}
        animationSpeed={animationSpeed}
        transitionDuration={transitionDuration}
        shouldAlwaysShowGradient={shouldAlwaysShowGradient}
      >
        <div 
          style={{ 
            padding: '3rem 2rem', 
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>
            🚀 Interactive Demo
          </h2>
          <p style={{ margin: 0, fontSize: '1.1rem', maxWidth: '400px' }}>
            Hover over this area and watch the gradient follow your mouse! 
            Adjust the controls above to see how they affect the behavior.
          </p>
        </div>
      </GradientHover>


      {/* Control Panel */}
      <div 
        style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          


         

          {/* Animation Speed */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
              ⚡ Animation Speed: {animationSpeed.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
              Lower = Smoother, Higher = Snappier
            </div>
          </div>

          {/* Transition Duration */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
              ⏱️ Transition Duration: {transitionDuration}s
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={transitionDuration}
              onChange={(e) => setTransitionDuration(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
              Duration of gradient transitions
            </div>
          </div>

           {/* Always Show Gradient */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#555', cursor: 'pointer' }}>
              
              🌈 Always Show Gradient
            </label>
            <label style={{display: 'flex', paddingTop: '10px'}}>
              <input
                  type="checkbox"
                  checked={shouldAlwaysShowGradient}
                  onChange={(e) => setShouldAlwaysShowGradient(e.target.checked)}
                  style={{ marginRight: '0.5rem', transform: 'scale(1.2)' }}
                />
                <div>{JSON.stringify(shouldAlwaysShowGradient)}</div>
            </label>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
              Show gradient even when not hovering
            </div>
          </div>

          {/* Color Controls */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
              🎨 First Color:
            </label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ 
                width: '100%', 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                display: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' }}>
              🎨 Second Color:
            </label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ 
                width: '100%', 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                display: 'none'
              }}
            />
          </div>

        </div>
      </div>

    
    </div>
  );
}

<InteractiveDemo />
```
