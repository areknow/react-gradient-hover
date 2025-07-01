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

## Custom Colors

```jsx
import { GradientHover } from 'react-gradient-hover';

<GradientHover colors={['#ff6b6b', '#4ecdc4']}>
  <div style={{ padding: '2rem' }}>
    <h2>Custom gradient colors</h2>
  </div>
</GradientHover>
```

## Advanced Configuration

```jsx
import { GradientHover } from 'react-gradient-hover';

<GradientHover
  colors={['#667eea', '#764ba2']}
  animationSpeed={0.02}
  borderRadius="20px"
  transitionDuration={0.5}
  activeOverlayOpacity={0.1}
  className="my-custom-class"
  onClick={() => console.log('Clicked!')}
>
  <div style={{ padding: '3rem' }}>
    <h2>Advanced Configuration</h2>
    <p>With custom properties and click handler</p>
  </div>
</GradientHover>
```

## Hide Gradient Until Hover

```jsx
import { GradientHover } from 'react-gradient-hover';

<GradientHover
  colors={['#ff6b6b', '#4ecdc4']}
  shouldAlwaysShowGradient={false}
>
  <div style={{ padding: '2rem' }}>
    <h2>Hidden Gradient</h2>
    <p>The gradient will only appear when you hover over this component</p>
  </div>
</GradientHover>
``` 