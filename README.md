# React Gradient Hover

A React component that creates an interactive gradient effect following mouse movement on hover. The gradient smoothly animates and creates a spotlight effect that follows the cursor.

[![npm version](https://img.shields.io/npm/v/react-gradient-hover.svg)](https://www.npmjs.com/package/react-gradient-hover)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue)](https://areknow.github.io/react-gradient-hover/)

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

## Live Demo

Check out the [live demo](https://areknow.github.io/react-gradient-hover/) to see the component in action!

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

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Install dependencies

```bash
npm install
```

### Development Workflow

#### Build the package

```bash
npm run build
```

This creates the distribution files in the `dist/` directory:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle  
- `dist/index.d.ts` - TypeScript declarations

#### Run the example in development mode

```bash
npm run example
```

This starts a development server with the example app at `http://localhost:5173`

#### Build the example for production

```bash
npm run example:build
```

### GitHub Pages Deployment

The example site is automatically deployed to GitHub Pages when you push to the `main` branch. The deployment is handled by GitHub Actions.

#### Manual deployment

If you need to deploy manually:

1. Build the example site:
   ```bash
   npm run example:build
   ```

2. The built files will be in the `example-dist/` directory

3. You can then upload these files to GitHub Pages through your repository settings

#### GitHub Pages URL

Once deployed, your example site will be available at:
`https://areknow.github.io/react-gradient-hover/`

### Code Quality

#### Run linting

```bash
npm run lint
```

#### Run linting with auto-fix

```bash
npm run lint:fix
```

#### Format code

```bash
npm run format
```

#### Check formatting

```bash
npm run format:check
```

#### Type checking

```bash
npm run typecheck
```

### Testing Before Publishing

#### Dry run package creation

```bash
npm pack --dry-run
```

This shows what files will be included in the published package without actually creating the tarball.

#### Test the package locally

```bash
npm pack
npm install ./react-gradient-hover-1.0.0.tgz
```

This creates a local tarball and installs it to test the package before publishing.

### Publishing to npm

#### 1. Login to npm (if not already logged in)

```bash
npm login
```

#### 2. Check if you're logged in

```bash
npm whoami
```

#### 3. Check if the package name is available

```bash
npm view react-gradient-hover
```

If you get a 404 error, the name is available. If you get package details, the name is taken.

#### 4. Update version (if needed)

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0  
npm version major  # 1.0.0 -> 2.0.0
```

#### 5. Build and publish

```bash
npm publish
```

This will automatically:
- Run the build process (via `prepublishOnly` script)
- Create the package tarball
- Upload to npm registry

#### 6. Verify the published package

```bash
npm view react-gradient-hover
```

### Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] TypeScript compilation succeeds
- [ ] Example builds and runs correctly
- [ ] README is up to date
- [ ] Package.json has correct metadata (name, version, author, repository)
- [ ] License file is present
- [ ] No sensitive information in the package
- [ ] Version number is appropriate for the changes

### Troubleshooting

#### Package name already taken
If the package name is already taken, update the `name` field in `package.json` to something unique.

#### Publishing fails
- Ensure you're logged in: `npm whoami`
- Check if you have permission to publish: `npm access ls-packages`
- Verify the package name is available

#### Build errors
- Check that all dependencies are installed: `npm install`
- Ensure TypeScript configuration is correct
- Verify Rollup configuration is valid

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 