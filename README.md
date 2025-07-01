# React Gradient Hover

A high-performance React component that creates an elegant, interactive gradient effect that follows cursor movement. Perfect for creating engaging hover states and modern UI elements.

[![npm version](https://img.shields.io/npm/v/react-gradient-hover.svg)](https://www.npmjs.com/package/react-gradient-hover)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Documentation-blue)](https://areknow.github.io/react-gradient-hover/)

## Overview

React Gradient Hover enhances your UI with smooth, performant gradient animations that respond to user interaction. The component creates a dynamic spotlight effect that follows the cursor, providing a modern and engaging user experience.

### Key Features

- 🎨 Fluid gradient animations using requestAnimationFrame
- 🌈 Support for multiple gradient colors (minimum of 2)
- ⚡ Optimized performance with debounced event handling
- 🎯 Customizable animation speed and transition duration
- 📱 Responsive design with automatic resizing
- 🔧 TypeScript support with comprehensive type definitions
- 🎪 Smooth return-to-center animation

## Installation

```bash
npm install react-gradient-hover
```

or

```bash
yarn add react-gradient-hover
```

## Quick Start

```tsx
import { GradientHover } from "react-gradient-hover";

function App() {
  return (
    <GradientHover>
      <div style={{ padding: "2rem" }}>
        <h2>Interactive Gradient</h2>
        <p>Hover to see the effect in action</p>
      </div>
    </GradientHover>
  );
}
```

## Component API

### Props

| Prop                       | Type            | Default                  | Description                                 |
| -------------------------- | --------------- | ------------------------ | ------------------------------------------- |
| `colors`                   | `string[]`      | `['#EB2DD2', '#5AB5EE']` | Array of gradient colors (minimum 2)        |
| `children`                 | `ReactNode`     | Required                 | Content to wrap with the gradient effect    |
| `className`                | `string`        | `''`                     | Additional CSS class names                  |
| `style`                    | `CSSProperties` | `{}`                     | Additional inline styles                    |
| `onClick`                  | `() => void`    | -                        | Optional click handler                      |
| `animationSpeed`           | `number`        | `5`                      | Animation speed (1-10, where 10 is fastest) |
| `transitionDuration`       | `number`        | `1`                      | Transition duration in seconds              |
| `shouldAlwaysShowGradient` | `boolean`       | `true`                   | Whether to show gradient before hover       |

## Advanced Usage

### Custom Color Gradients

```tsx
// Two-color gradient
<GradientHover colors={["#667eea", "#764ba2"]}>
  <div>Your content</div>
</GradientHover>

// Multi-color gradient
<GradientHover colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}>
  <div>Your content</div>
</GradientHover>
```

### Animation Control

```tsx
<GradientHover
  animationSpeed={7}
  transitionDuration={0.5}
  shouldAlwaysShowGradient={false}
>
  <div>Your content</div>
</GradientHover>
```

## Browser Support

The component utilizes modern CSS features including:

- CSS Custom Properties (CSS Variables)
- `requestAnimationFrame` API
- Standard CSS positioning and transforms

Ensure your target browsers support these features or include appropriate polyfills.

## Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Run tests:

   ```bash
   npm test
   ```

4. Build the package:
   ```bash
   npm run build
   ```

### Documentation

View the interactive documentation and examples at [https://areknow.github.io/react-gradient-hover/](https://areknow.github.io/react-gradient-hover/)

To run the documentation locally:

```bash
npm run styleguide
```

### Publishing Process

Before publishing a new version, ensure you complete the following checklist:

- [ ] All tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] TypeScript compilation succeeds (`npm run typecheck`)
- [ ] Documentation is up to date
- [ ] Version number is appropriate for changes (following semver)
- [ ] Changelog is updated
- [ ] Git working directory is clean

#### Testing the Package Locally

Before publishing to npm, it's recommended to test the package locally:

1. Create a test package:

   ```bash
   npm pack --dry-run  # List the files that will be included
   npm pack           # Create the tarball
   ```

2. Test in another project:

   ```bash
   cd ../your-test-project
   npm install ../react-gradient-hover/react-gradient-hover-x.y.z.tgz
   ```

3. Verify the package works as expected in your test project

#### Publishing Steps

1. Update the version:

   ```bash
   npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # for new features (1.0.0 -> 1.1.0)
   npm version major  # for breaking changes (1.0.0 -> 2.0.0)
   ```

2. Build and publish:

   ```bash
   npm run build
   npm publish
   ```

3. Push changes and tags:
   ```bash
   git push && git push --tags
   ```

#### Troubleshooting

If publishing fails:

- Ensure you're logged in: `npm whoami`
- Verify you have publish permissions: `npm access ls-packages`
- Check that the package name is available: `npm view react-gradient-hover`

For build errors:

- Verify all dependencies are installed
- Check TypeScript and Rollup configurations
- Review the build logs for specific errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) © [areknow](https://github.com/areknow)
