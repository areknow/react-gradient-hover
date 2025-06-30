# React Gradient Hover

A React component that creates an interactive gradient effect following mouse movement on hover. The gradient smoothly animates and creates a spotlight effect that follows the cursor.

[![npm version](https://img.shields.io/npm/v/react-gradient-hover.svg)](https://www.npmjs.com/package/react-gradient-hover)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 Smooth gradient animation that follows mouse movement
- 🎯 Customizable gradient colors
- ⚡ High-performance animations using requestAnimationFrame
- 🔧 Flexible component API with TypeScript support
- 📱 Responsive and works on all screen sizes
- 🎪 Smooth return-to-center animation on mouse leave

## Installation

```bash
npm install react-gradient-hover
```

or

```bash
yarn add react-gradient-hover
```

## Usage

### Basic Example

```tsx
import { GradientHover } from 'react-gradient-hover';

function App() {
  return (
    <GradientHover>
      <div style={{ padding: '2rem' }}>
        <h2>Hover over me!</h2>
        <p>The gradient will follow your mouse movement.</p>
      </div>
    </GradientHover>
  );
}
```

### Custom Colors

```tsx
<GradientHover colors={['#ff6b6b', '#4ecdc4']}>
  <div style={{ padding: '2rem' }}>
    <h2>Custom gradient colors</h2>
  </div>
</GradientHover>
```

### Advanced Configuration

```tsx
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

### Hide Gradient Until Hover

```tsx
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

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `[string, string]` | `['#ff6b6b', '#4ecdc4']` | The two colors used for the gradient effect |
| `children` | `ReactNode` | - | The content to wrap with the gradient hover effect |
| `className` | `string` | `''` | Additional CSS classes to apply |
| `style` | `CSSProperties` | `{}` | Inline styles to apply |
| `onClick` | `() => void` | - | Click handler for the component |
| `isActive` | `boolean` | `true` | Whether the gradient effect is active |
| `animationSpeed` | `number` | `0.01` | Animation speed (0.01 = slower, 0.1 = faster) |
| `borderRadius` | `string` | `'10px'` | Border radius of the component |
| `transitionDuration` | `number` | `1` | Duration of the gradient transition animation in seconds |
| `activeOverlayOpacity` | `number` | `0.05` | Opacity of the active overlay when clicking |
| `shouldAlwaysShowGradient` | `boolean` | `true` | Whether to always show the gradient effect or only on hover |

## Styling

The component is fully customizable through props! All visual aspects can be controlled by passing the appropriate props:

```tsx
<GradientHover
  colors={['#custom-color-1', '#custom-color-2']}
  borderRadius="20px"
  transitionDuration={2}
  activeOverlayOpacity={0.1}
  shouldAlwaysShowGradient={true}
  animationSpeed={0.02}
>
  {/* Your content */}
</GradientHover>
```

### Advanced CSS Customization

If you need additional styling beyond the available props, you can target the component with CSS:

```css
.gradient-hover {
  /* Your custom styles */
}

.gradient-hover--is-hovering {
  /* Styles applied during hover */
}
```

The component uses CSS custom properties internally, which are set from the props you pass.

## Browser Support

This component uses modern CSS features including:
- CSS custom properties
- `inset` property

Make sure your target browsers support these features or provide appropriate fallbacks.

## Development

### Install dependencies

```bash
npm install
```

### Build the package

```bash
npm run build
```

### Run the example in development mode

```bash
npm run example
```

### Run linting

```bash
npm run lint
```

### Run linting with auto-fix

```bash
npm run lint:fix
```

### Format code

```bash
npm run format
```

### Type checking

```bash
npm run typecheck
```

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 