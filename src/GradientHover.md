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
  const [color1, setColor1] = React.useState('#ff6b6b');
  const [color2, setColor2] = React.useState('#4ecdc4');
  const [animationSpeed, setAnimationSpeed] = React.useState(0.01);
  const [borderRadius, setBorderRadius] = React.useState('10px');
  const [transitionDuration, setTransitionDuration] = React.useState(1);
  const [activeOverlayOpacity, setActiveOverlayOpacity] = React.useState(0.05);
  const [shouldAlwaysShowGradient, setShouldAlwaysShowGradient] = React.useState(true);
  const [isActive, setIsActive] = React.useState(true);

  const controlsStyle = {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    fontSize: '14px'
  };

  const controlGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#333'
  };

  const inputStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  };

  return (
    <div>
      <div style={controlsStyle}>
        <div style={controlGroupStyle}>
          <label style={labelStyle}>First Color:</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Second Color:</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Animation Speed: {animationSpeed}</label>
          <input
            type="range"
            min="0.001"
            max="0.1"
            step="0.001"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Border Radius:</label>
          <input
            type="text"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            placeholder="e.g., 10px, 50%, 0"
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Transition Duration: {transitionDuration}s</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={transitionDuration}
            onChange={(e) => setTransitionDuration(parseFloat(e.target.value))}
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Active Overlay Opacity: {activeOverlayOpacity}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={activeOverlayOpacity}
            onChange={(e) => setActiveOverlayOpacity(parseFloat(e.target.value))}
            style={inputStyle}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={shouldAlwaysShowGradient}
              onChange={(e) => setShouldAlwaysShowGradient(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Always Show Gradient
          </label>
        </div>
        
        <div style={controlGroupStyle}>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Is Active
          </label>
        </div>
      </div>

      <GradientHover
        colors={[color1, color2]}
        animationSpeed={animationSpeed}
        borderRadius={borderRadius}
        transitionDuration={transitionDuration}
        activeOverlayOpacity={activeOverlayOpacity}
        shouldAlwaysShowGradient={shouldAlwaysShowGradient}
        isActive={isActive}
      >
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2>🎨 Interactive Gradient Hover</h2>
          <p>Try adjusting the controls above to see how they affect the component!</p>
          <p>Move your mouse around to see the gradient follow your cursor.</p>
        </div>
      </GradientHover>
    </div>
  );
}

<InteractiveDemo />
```

## Color Scheme Presets

Choose from beautiful pre-configured color combinations:

```jsx
function ColorSchemeDemo() {
  const colorSchemes = {
    sunset: ['#ff6b6b', '#ffa726'],
    ocean: ['#42a5f5', '#26c6da'],
    forest: ['#66bb6a', '#81c784'],
    purple: ['#ab47bc', '#7e57c2'],
    fire: ['#ff5722', '#ff9800'],
    mint: ['#4ecdc4', '#45b7aa'],
    galaxy: ['#667eea', '#764ba2'],
    peach: ['#ff9a9e', '#fecfef']
  };
  
  const [selectedScheme, setSelectedScheme] = React.useState('sunset');
  
  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginBottom: '1rem'
  };
  
  return (
    <div>
      <label style={{ fontWeight: 'bold', marginRight: '1rem' }}>
        Color Scheme:
        <select 
          value={selectedScheme} 
          onChange={(e) => setSelectedScheme(e.target.value)}
          style={selectStyle}
        >
          {Object.keys(colorSchemes).map(scheme => (
            <option key={scheme} value={scheme}>
              {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
            </option>
          ))}
        </select>
      </label>
      
      <GradientHover colors={colorSchemes[selectedScheme]}>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>🌈 {selectedScheme.charAt(0).toUpperCase() + selectedScheme.slice(1)} Theme</h3>
          <p>Hover to see the {selectedScheme} gradient effect!</p>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            {colorSchemes[selectedScheme].map((color, index) => (
              <div 
                key={index}
                style={{
                  width: '40px',
                  height: '20px',
                  backgroundColor: color,
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            ))}
          </div>
        </div>
      </GradientHover>
    </div>
  );
}

<ColorSchemeDemo />
```

## Animation Speed Comparison

See how animation speed affects the smoothness:

```jsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
  <GradientHover animationSpeed={0.001}>
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h4>Slow (0.001)</h4>
      <p>Smooth & gentle</p>
    </div>
  </GradientHover>
  
  <GradientHover animationSpeed={0.05}>
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h4>Fast (0.05)</h4>
      <p>Quick & responsive</p>
    </div>
  </GradientHover>
</div>
```

## Shape Variations

Different border radius values create different effects:

```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
  <GradientHover borderRadius="0px" colors={['#e74c3c', '#c0392b']}>
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h4>Sharp (0px)</h4>
      <p>Angular design</p>
    </div>
  </GradientHover>
  
  <GradientHover borderRadius="10px" colors={['#3498db', '#2980b9']}>
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h4>Rounded (10px)</h4>
      <p>Soft corners</p>
    </div>
  </GradientHover>
  
  <GradientHover borderRadius="50px" colors={['#9b59b6', '#8e44ad']}>
    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
      <h4>Very Rounded (50px)</h4>
      <p>Pill shape</p>
    </div>
  </GradientHover>
</div>
```

## Advanced Usage

Complex example with custom styling and click handlers:

```jsx
function AdvancedDemo() {
  const [clickCount, setClickCount] = React.useState(0);
  
  return (
    <GradientHover
      colors={['#667eea', '#764ba2']}
      animationSpeed={0.02}
      borderRadius="20px"
      transitionDuration={0.5}
      activeOverlayOpacity={0.1}
      onClick={() => setClickCount(prev => prev + 1)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ 
        padding: '3rem', 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px'
      }}>
        <h3>🎯 Click Me!</h3>
        <p>This component responds to clicks and hover</p>
        <p><strong>Clicked: {clickCount} times</strong></p>
        <button 
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: '#667eea',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setClickCount(0);
          }}
        >
          Reset Counter
        </button>
      </div>
    </GradientHover>
  );
}

<AdvancedDemo />
```
