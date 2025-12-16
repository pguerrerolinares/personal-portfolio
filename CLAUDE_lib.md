# CLAUDE.md - viz-components Library

This file provides guidance to Claude Code (claude.ai/code) when working with the `viz-components` Web Components library.

## Development Commands

**Package Manager**: This project uses **Bun** (required). Do not use npm or yarn.

```bash
# Install dependencies
bun install

# Build for production (minified + sourcemaps)
bun run build

# Build in watch mode (development)
bun run dev

# Generate TypeScript declarations (.d.ts)
bun run build:types

# Full build (code + types) - runs before publish
bun run prepublishOnly

# Run tests
bun test

# Lint code
bun lint
```

## Architecture Overview

### Project Philosophy

This library provides **framework-agnostic Web Components** for data visualization. Key principles:

1. **Native Web Components**: No frameworks (Lit, Stencil) - pure Custom Elements API
2. **Maximum Portability**: Works in Next.js, Angular, JSP, vanilla HTML
3. **Minimal Dependencies**: Only `@preact/signals-core` (~1.5KB) + Highcharts
4. **TypeScript-First**: Full type safety, no `any` types
5. **Shadow DOM Encapsulation**: Isolated styles, no CSS conflicts

### Tech Stack

- **Web Components**: Custom Elements API v1 (native)
- **Reactivity**: @preact/signals-core ~1.5.0
- **Charts**: Highcharts 11.x (lazy-loaded)
- **Build**: Bun bundler (ultra-fast, zero-config)
- **TypeScript**: Strict mode enabled
- **Target**: ES2020, browser environment

### Project Structure

```
viz-components/
├── src/
│   ├── index.ts                 # Main exports
│   ├── base/
│   │   └── viz-base-component.ts  # Base class for all components
│   ├── components/
│   │   ├── chart/
│   │   │   └── viz-chart.ts     # Universal chart (line/bar/pie/area)
│   │   ├── dashboard/
│   │   │   ├── viz-dashboard.ts # Dashboard grid layout
│   │   │   └── viz-widget.ts    # Widget wrapper with header/slots
│   │   ├── table/
│   │   │   └── viz-table.ts     # Interactive data table
│   │   └── advanced/
│   │       ├── viz-heatmap.ts   # Heatmap visualization
│   │       └── viz-treemap.ts   # Treemap visualization
│   ├── utils/
│   │   ├── theme-bridge.ts      # CSS custom properties utilities
│   │   └── formatters.ts        # Data formatters
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── dist/                        # Build output (git-ignored)
├── examples/                    # Usage examples
├── docs/                        # Documentation
├── package.json
├── tsconfig.json
├── bunfig.toml                  # Bun build config (optional)
└── README.md
```

## Component Architecture

### Base Component Pattern

All components extend `VizBaseComponent`:

```typescript
import { signal, computed, effect } from '@preact/signals-core';

export abstract class VizBaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.injectStyles();
    this.render();
    this.setupEffects();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  protected abstract render(): void;
  protected abstract injectStyles(): void;
  protected setupEffects(): void {}
  protected cleanup(): void {}
}
```

### Creating a New Component

```typescript
import { signal, effect } from '@preact/signals-core';
import { VizBaseComponent } from '../base/viz-base-component';

class VizMyComponent extends VizBaseComponent {
  // Reactive state with signals
  private data = signal<any[]>([]);
  private config = signal<Record<string, any>>({});

  // Observed attributes (Web Components API)
  static get observedAttributes() {
    return ['data', 'config'];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'data':
        this.data.value = JSON.parse(newValue);
        break;
      case 'config':
        this.config.value = JSON.parse(newValue);
        break;
    }
  }

  protected injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        /* Use CSS custom properties for theming */
        --component-bg: var(--viz-bg, #ffffff);
        --component-text: var(--viz-text, #1d1d1f);
      }

      .container {
        background: var(--component-bg);
        color: var(--component-text);
        border-radius: var(--viz-radius, 16px);
      }
    `;
    this.shadow.appendChild(style);
  }

  protected render() {
    const container = document.createElement('div');
    container.className = 'container';
    // ... build DOM
    this.shadow.appendChild(container);
  }

  protected setupEffects() {
    // React to signal changes
    effect(() => {
      this.updateContent(this.data.value);
    });
  }

  private updateContent(data: any[]) {
    // Update DOM based on new data
  }
}

// Register the custom element
customElements.define('viz-my-component', VizMyComponent);
```

## Theming System

### CSS Custom Properties Bridge

Components consume CSS custom properties injected by the host application:

```css
/* Variables injected by host (e.g., Next.js theme provider) */
:root {
  --viz-primary: #0071e3;
  --viz-bg: #ffffff;
  --viz-text: #1d1d1f;
  --viz-accent-purple: #6366f1;
  --viz-accent-pink: #0ea5e9;
  --viz-accent-cyan: #0d9488;
  --viz-category-web: #0071e3;
  --viz-category-ai: #6366f1;
  --viz-radius: 16px;
}

/* Dark mode */
.dark {
  --viz-primary: #0a84ff;
  --viz-bg: #000000;
  --viz-text: #f5f5f7;
}
```

### Using Theme Variables in Components

```typescript
protected injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    :host {
      /* Fallback values for standalone use */
      --chart-primary: var(--viz-primary, #0071e3);
      --chart-bg: var(--viz-bg, #ffffff);
      --chart-text: var(--viz-text, #1d1d1f);
    }

    .chart-container {
      background: var(--chart-bg);
      color: var(--chart-text);
      border-radius: var(--viz-radius, 16px);
    }
  `;
  this.shadow.appendChild(style);
}
```

## Component Catalog

### 1. `<viz-chart>` - Universal Chart

```html
<viz-chart
  type="line"
  data='[{"name": "Series 1", "data": [1, 2, 3, 4, 5]}]'
  config='{"title": {"text": "My Chart"}}'
></viz-chart>
```

**Attributes:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `'line' \| 'bar' \| 'pie' \| 'area'` | `'line'` | Chart type |
| `data` | JSON string | `[]` | Series data array |
| `config` | JSON string | `{}` | Highcharts config override |

**Events:**
- `chart-click`: Fired when chart is clicked
- `series-hover`: Fired on series hover
- `point-click`: Fired when a data point is clicked

### 2. `<viz-dashboard>` - Dashboard Layout

```html
<viz-dashboard columns="3" gap="16">
  <viz-widget slot="widget-1" title="Sales">...</viz-widget>
  <viz-widget slot="widget-2" title="Users">...</viz-widget>
</viz-dashboard>
```

**Attributes:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `columns` | number | `2` | Number of grid columns |
| `gap` | number | `16` | Gap between widgets (px) |
| `layout` | `'grid' \| 'masonry'` | `'grid'` | Layout mode |

### 3. `<viz-widget>` - Widget Wrapper

```html
<viz-widget title="Revenue" span="2" height="300">
  <viz-chart type="bar" ...></viz-chart>
</viz-widget>
```

**Attributes:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | `''` | Widget header title |
| `span` | number | `1` | Column span in dashboard |
| `height` | number \| `'auto'` | `'auto'` | Widget height (px) |

**Slots:**
- Default slot: Main content
- `header`: Custom header content
- `footer`: Footer content

### 4. `<viz-table>` - Interactive Data Table

```html
<viz-table
  data='[{"id": 1, "name": "John", "age": 30}]'
  columns='[{"key": "name", "label": "Name", "sortable": true}]'
  sortable
  filterable
  paginate="10"
></viz-table>
```

**Attributes:**
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | JSON string | `[]` | Row data array |
| `columns` | JSON string | `[]` | Column definitions |
| `sortable` | boolean | `false` | Enable sorting |
| `filterable` | boolean | `false` | Enable filtering |
| `paginate` | number | `0` | Rows per page (0 = no pagination) |
| `selectable` | `'none' \| 'single' \| 'multi'` | `'none'` | Row selection mode |

**Events:**
- `row-click`: Fired when row is clicked
- `row-select`: Fired when selection changes
- `sort-change`: Fired when sort changes
- `filter-change`: Fired when filter changes

### 5. `<viz-heatmap>` - Heatmap Visualization

```html
<viz-heatmap
  data='[[0,0,10],[0,1,19],[1,0,8]]'
  x-categories='["Mon", "Tue", "Wed"]'
  y-categories='["Morning", "Afternoon"]'
></viz-heatmap>
```

### 6. `<viz-treemap>` - Treemap Visualization

```html
<viz-treemap
  data='[{"name": "A", "value": 10, "children": [...]}]'
  drillable
></viz-treemap>
```

## Build Configuration

### package.json

```json
{
  "name": "@pguerrero/viz-components",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./chart": {
      "import": "./dist/components/chart/viz-chart.js",
      "types": "./dist/components/chart/viz-chart.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "bun build src/index.ts --outdir dist --target browser --minify --sourcemap",
    "dev": "bun build src/index.ts --outdir dist --target browser --watch",
    "build:types": "tsc --emitDeclarationOnly --declaration --declarationMap",
    "prepublishOnly": "bun run build && bun run build:types",
    "test": "bun test",
    "lint": "eslint src --ext .ts"
  },
  "dependencies": {
    "@preact/signals-core": "^1.5.0",
    "highcharts": "^11.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Integration Guide

### Next.js Integration

```tsx
// components/providers/theme-provider.tsx
// Add ThemeVariablesInjector to sync MUI theme with Web Components

function ThemeVariablesInjector() {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--viz-primary', theme.palette.primary.main);
    root.style.setProperty('--viz-bg', theme.palette.background.default);
    root.style.setProperty('--viz-text', theme.palette.text.primary);
    // ... more variables
  }, [theme]);

  return null;
}
```

```tsx
// Using components (dynamic import for SSR compatibility)
'use client';

import dynamic from 'next/dynamic';

const ChartDemo = dynamic(
  () => import('@pguerrero/viz-components').then(() => {
    // Components are now registered
    return () => (
      <viz-chart
        type="line"
        data={JSON.stringify([{ name: 'Sales', data: [1, 2, 3] }])}
      />
    );
  }),
  { ssr: false }
);
```

### Angular Integration

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@pguerrero/viz-components';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

```html
<!-- component.html -->
<viz-chart [attr.type]="chartType" [attr.data]="chartData | json"></viz-chart>
```

### Vanilla HTML

```html
<script type="module">
  import '@pguerrero/viz-components';
</script>

<viz-chart type="bar" data='[{"data": [1, 2, 3]}]'></viz-chart>
```

## Development Workflow

### Local Development with Portfolio

```bash
# Terminal 1: Watch mode for library
cd /path/to/viz-components
bun run dev

# Terminal 2: Link to portfolio
bun link

# Terminal 3: Portfolio dev server
cd /path/to/personal-portfolio
bun link @pguerrero/viz-components
bun dev
```

### Publishing to npm

```bash
# Build and publish
bun run prepublishOnly
bun publish --access public
```

## Important Notes

- Always use Bun commands (never npm/yarn)
- All components must extend `VizBaseComponent`
- Use @preact/signals-core for reactive state, not class properties
- Always provide CSS custom property fallbacks for standalone use
- Lazy-load Highcharts modules only when needed
- Register custom elements at the end of each component file
- Use `useSyncExternalStore`-friendly patterns for React integration
- Test in multiple environments: Next.js, Angular, vanilla HTML
- Keep bundle size minimal: signals (~1.5KB) + lazy Highcharts
- Shadow DOM isolates styles - use CSS custom properties for theming

## Bundle Size Targets

| Package | Target Size |
|---------|-------------|
| @preact/signals-core | ~1.5KB gzip |
| viz-components (base) | < 2KB gzip |
| Highcharts core | ~90KB gzip (lazy) |
| Total initial | < 4KB gzip |

## Browser Support

- Chrome/Edge: Full support (Custom Elements v1)
- Firefox: Full support
- Safari: Full support (iOS 10.3+)
- IE11: Not supported (acceptable for modern library)
