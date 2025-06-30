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
  className="my-custom-class"
  onClick={() => console.log('Clicked!')}
  as="section"
>
  <div style={{ padding: '3rem' }}>
    <h2>Advanced Configuration</h2>
    <p>With custom properties and click handler</p>
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
| `as` | `keyof JSX.IntrinsicElements \| React.ComponentType` | `'div'` | The HTML element or React component to render as |
| `isActive` | `boolean` | `true` | Whether the gradient effect is active |
| `animationSpeed` | `number` | `0.01` | Animation speed (0.01 = slower, 0.1 = faster) |
| `borderRadius` | `string` | `'10px'` | Border radius of the component |

## Styling

The component uses CSS custom properties (CSS variables) for styling. You can override these in your CSS:

```css
.gradient-hover {
  /* Override default styles */
  --gradient-stop-1: #your-color-1;
  --gradient-stop-2: #your-color-2;
  --border-radius: 15px;
}
```

## Browser Support

This component uses modern CSS features including:
- CSS custom properties
- `color-mix()` function
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

### Run in development mode

```bash
npm run dev
```

### Run linting

```bash
npm run lint
```

### Type checking

```bash
npm run typecheck
```

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 