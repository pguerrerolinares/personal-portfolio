# Plan de Implementación: Sección Playground/Demo con Librería de Web Components

**Fecha**: 2025-12-14
**Proyecto**: viz-components (librería) + personal-portfolio (integración)
**Autor**: Claude Code (claude.ai/code)

---

## Resumen Ejecutivo

Implementar una nueva sección **"Playground/Demo"** en el portafolio con una **librería personalizada de Web Components** basada en **Highcharts**. La librería será **framework-agnostic** (portable a Next.js, Angular, JSP) usando el estándar de Web Components.

**Enfoque**: **Proyecto separado** en GitHub, componentes construidos con **TypeScript + Web Components nativos + @preact/signals-core**, build con **Bun**, integración en portafolio vía npm/Git.

**Filosofía técnica**: Máxima portabilidad y control usando estándares web puros (Custom Elements API, Shadow DOM) con reactividad ligera vía @preact/signals-core. Sin frameworks intermedios (Lit, Stencil), solo TypeScript + Web APIs + signals.

## ⚠️ IMPORTANTE: Proyecto Separado

La librería de Web Components será un **proyecto completamente independiente** en otro directorio/repo de GitHub:
- NO se creará como monorepo dentro de `personal-portfolio`
- Desarrollo en carpeta separada (ej: `viz-components`)
- Repo propio en GitHub
- Se publicará a npm o se integrará vía Git submodule/dependency
- El portafolio personal importará la librería como dependencia externa

---

## 1. Arquitectura General

### 1.1 Estructura del Proyecto (Separado)

**PROYECTO 1: viz-components** (Nuevo repo GitHub)
```
viz-components/                   # ⭐ PROYECTO SEPARADO
├── src/
│   ├── base/                     # Clase base para componentes
│   ├── components/               # Componentes individuales
│   │   ├── chart/                # viz-chart (line, bar, pie, area)
│   │   ├── dashboard/            # viz-dashboard, viz-widget
│   │   ├── table/                # viz-table (sorting, filtering)
│   │   └── advanced/             # viz-heatmap, viz-treemap
│   ├── utils/                    # Theme bridge, formatters
│   ├── types/                    # TypeScript definitions
│   └── index.ts                  # Exports principales
├── dist/                         # Build output
├── examples/                     # Ejemplos de uso
├── docs/                         # Documentación
├── package.json
├── tsconfig.json
├── bunfig.toml                   # Bun build configuration (opcional)
├── README.md
└── LICENSE
```

**PROYECTO 2: personal-portfolio** (Repo existente)
```
personal-portfolio/
├── app/                          # Next.js app
├── components/
│   ├── sections/
│   │   └── playground/           # ⭐ NUEVA: Sección Playground
│   │       ├── playground.tsx
│   │       ├── chart-demo.tsx
│   │       ├── dashboard-demo.tsx
│   │       └── table-demo.tsx
├── package.json                  # ⭐ AGREGAR: dependency a viz-components
└── ...
```

### 1.2 Decisiones Técnicas Clave

| Aspecto | Decisión | Justificación |
|---------|----------|---------------|
| **Arquitectura** | Proyecto separado en GitHub | Librería reutilizable, desarrollo independiente, publicable a npm |
| **Web Components** | Nativos (TypeScript) | Estándar web puro, sin abstracción, máxima portabilidad |
| **Reactividad** | @preact/signals-core | Ligero (~1.5KB), framework-agnostic, excelente DX |
| **Build System** | Bun bundler | Ultra-rápido (3-4x más que Vite), zero-config, bundler nativo integrado |
| **Chart Library** | Highcharts 11.x | Potente, versátil, buena documentación (gratis para uso personal) |
| **Theming** | CSS Custom Properties | Decoupled, reactivo, portable |
| **SSR** | Dynamic import + `ssr: false` | Web Components requieren browser environment |
| **Package Manager** | Bun | All-in-one: runtime + package manager + bundler + test runner |

### 1.3 Arquitectura Web Components + Signals

**Patrón de Implementación**:

```typescript
import { signal, computed, effect } from '@preact/signals-core';

class VizChart extends HTMLElement {
  // Signals para estado reactivo
  private data = signal<any[]>([]);
  private type = signal<'line' | 'bar' | 'pie'>('line');
  private config = signal<any>({});

  // Computed values
  private chartOptions = computed(() => ({
    chart: { type: this.type.value },
    series: [{ data: this.data.value }],
    ...this.config.value
  }));

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    // Effect para re-render cuando cambian las signals
    effect(() => {
      this.updateChart(this.chartOptions.value);
    });
  }

  // Observed attributes (Web Components API)
  static get observedAttributes() {
    return ['type', 'data'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'type') {
      this.type.value = newValue as any;
    }
    if (name === 'data') {
      this.data.value = JSON.parse(newValue);
    }
  }

  private render() {
    // Shadow DOM rendering
  }

  private updateChart(options: any) {
    // Actualizar Highcharts
  }
}

customElements.define('viz-chart', VizChart);
```

**Beneficios de este enfoque**:
- ✅ **Web Components nativos**: Sin abstracción, máxima compatibilidad
- ✅ **@preact/signals-core**: Reactividad granular y eficiente (~1.5KB vs ~5KB de Lit)
- ✅ **TypeScript**: Tipos completos, autocomplete, refactoring seguro
- ✅ **Shadow DOM**: Encapsulación CSS, no hay colisiones de estilos
- ✅ **Custom Elements API**: Estándar web, funciona en todos los frameworks
- ✅ **Zero dependencies**: Solo @preact/signals-core como runtime reactivo
- ✅ **Full control**: Acceso directo a Web Components API sin abstracciones

**Comparación vs Lit.js**:

| Aspecto | Web Components + Signals | Lit.js |
|---------|-------------------------|--------|
| Bundle size | ~1.5KB (signals only) | ~5KB (Lit runtime) |
| Abstracción | Cero (Web APIs directas) | Decorators, templates |
| Curva aprendizaje | Steeper (APIs nativas) | Gentler (API simplificada) |
| Control | Máximo | Moderado |
| Portabilidad | 100% (estándar web) | 100% (también estándar) |
| DX | Manual rendering | Automatic re-render |

**Decisión**: Preferimos **control total** y **menor bundle size** sobre la conveniencia de Lit.

---

## 2. Componentes de la Librería (MVP)

### 2.1 Core Components

1. **`<viz-chart>`** - Chart universal
   - Props: `type` (line/bar/pie/area), `data`, `config`
   - Features: Responsive, theme-aware, eventos custom
   - Highcharts modules: core

2. **`<viz-dashboard>`** - Dashboard layout
   - Props: `columns`, `gap`, `layout`
   - Features: CSS Grid responsive, slots nombrados

3. **`<viz-widget>`** - Widget wrapper
   - Props: `title`, `span`, `height`
   - Features: Header/footer, loading states

4. **`<viz-table>`** - Data table interactiva
   - Props: `data`, `columns`, `sortable`, `filterable`, `paginate`
   - Features: Sort, filter, paginación, row selection

5. **`<viz-heatmap>`** - Heatmap visualization
   - Highcharts module: heatmap

6. **`<viz-treemap>`** - Treemap visualization
   - Highcharts module: treemap

**Total**: 6 componentes core (calidad > cantidad)

---

## 3. Integración con Next.js Portfolio

### 3.1 Nueva Sección Playground

```
components/sections/playground/
├── playground.tsx              # Main section (patrón existente)
├── demo-showcase.tsx           # Container de demos
├── chart-demo.tsx              # Ejemplos de charts
├── dashboard-demo.tsx          # Dashboard demo
├── table-demo.tsx              # Data table demo
└── advanced-demo.tsx           # Visualizaciones avanzadas
```

### 3.2 Modificaciones Requeridas (Personal Portfolio)

**Archivos a Modificar** (en `personal-portfolio` repo):

1. **`package.json`**
   - Agregar dependency: `"@pguerrero/viz-components": "^0.1.0"` (o Git URL)

2. **`components/providers/theme-provider.tsx`**
   - Agregar: `ThemeVariablesInjector` (mapea MUI theme → CSS custom properties)

3. **`components/sections/index.ts`**
   - Agregar: `export { Playground } from "./playground/playground";`

4. **`app/[locale]/page.tsx`**
   - Agregar: `<Playground />` entre Projects y Experience

5. **`components/layout/navbar.tsx`**
   - Agregar: `{ key: 'playground', href: '#playground' }` a `navItems`

6. **`messages/es.json` y `en.json`**
   - Agregar namespace `playground` con traducciones

7. **`lib/constants/portfolio-data.ts`**
   - Agregar: `playgroundDemos` array con datos de ejemplo

8. **`types/index.ts`**
   - Agregar: `PlaygroundDemo`, `VisualizationType` types

---

## 4. Theme Bridge: MUI → Web Components

### 4.1 Estrategia

**Problema**: Web Components usan Shadow DOM (CSS aislado), MUI theme está en React context.

**Solución**: CSS Custom Properties como puente.

### 4.2 Implementación

**En `theme-provider.tsx`** (agregar):

```typescript
function ThemeVariablesInjector() {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Colores primarios
    root.style.setProperty('--viz-primary', theme.palette.primary.main);
    root.style.setProperty('--viz-bg', theme.palette.background.default);
    root.style.setProperty('--viz-text', theme.palette.text.primary);

    // Accent colors
    root.style.setProperty('--viz-accent-purple', theme.palette.accent.purple);
    root.style.setProperty('--viz-accent-pink', theme.palette.accent.pink);
    root.style.setProperty('--viz-accent-cyan', theme.palette.accent.cyan);

    // Category colors
    root.style.setProperty('--viz-category-web', theme.palette.category.web);
    root.style.setProperty('--viz-category-ai', theme.palette.category.ai);

    // Layout
    root.style.setProperty('--viz-radius', '16px');
  }, [theme]);

  return null;
}
```

**En Web Components** (consumir):

```typescript
// En el Shadow DOM del componente
class VizChart extends HTMLElement {
  private applyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --chart-primary: var(--viz-primary, #0071e3);
        --chart-bg: var(--viz-bg, #ffffff);
      }

      .chart-container {
        background: var(--chart-bg);
        border-radius: var(--viz-radius, 16px);
      }
    `;
    this.shadowRoot?.appendChild(style);
  }
}
```

**Beneficios**:
- ✅ Web Components totalmente desacoplados de MUI
- ✅ Theme switching automático (light/dark)
- ✅ Portable (fallback values para uso standalone)

---

## 5. Build Configuration

### 5.0 Configuración del Build con Bun

**package.json** (scripts recomendados):

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
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "bun build src/index.ts --outdir dist --target browser --minify --sourcemap",
    "build:watch": "bun build src/index.ts --outdir dist --target browser --watch",
    "build:types": "tsc --emitDeclarationOnly --declaration --declarationMap",
    "dev": "bun run build:watch",
    "prepublishOnly": "bun run build && bun run build:types"
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

**tsconfig.json**:

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
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**bunfig.toml** (opcional - configuración avanzada):

```toml
[build]
target = "browser"
format = "esm"
minify = true
sourcemap = "external"
splitting = true

[build.naming]
entry = "[dir]/[name].[ext]"
chunk = "[name]-[hash].[ext]"
asset = "[name]-[hash].[ext]"
```

**Comandos de build**:

```bash
# Build de producción (minificado + sourcemaps)
bun run build

# Build en modo watch (desarrollo)
bun run build:watch

# Generar tipos TypeScript (.d.ts)
bun run build:types

# Build completo (código + tipos) - se ejecuta antes de publish
bun run prepublishOnly
```

**Ventajas de Bun bundler**:
- ✅ **Ultra-rápido**: 3-4x más rápido que Vite/esbuild
- ✅ **Zero-config**: Funciona out-of-the-box sin configuración
- ✅ **Tree-shaking nativo**: Elimina código no usado automáticamente
- ✅ **Sourcemaps**: Debug facilitado en dev
- ✅ **Watch mode**: Rebuild automático en cambios
- ✅ **Minificación**: Producción optimizada
- ✅ **Code splitting**: Lazy loading automático

### 5.1 Opciones de Integración

**Opción 1: npm publish** (Recomendado para producción)
```bash
# En viz-components:
bun run build
bun publish

# En personal-portfolio:
bun add @pguerrero/viz-components
```

**Opción 2: Git dependency** (Más simple para desarrollo)
```json
{
  "dependencies": {
    "@pguerrero/viz-components": "github:pguerrerolinares/viz-components#main"
  }
}
```

**Opción 3: bun link** (Solo desarrollo local)
```bash
# En viz-components:
bun link

# En personal-portfolio:
bun link @pguerrero/viz-components
```

---

## 6. Fases de Implementación

### **Fase 0: Foundation** (3-4 días)

**Objetivo**: Setup de infraestructura

**PARTE A: Crear proyecto viz-components** (nuevo repo)

1. Crear nuevo directorio fuera de `personal-portfolio`:
   ```bash
   cd /home/paul/Documentos/proyectos/frontend
   mkdir viz-components
   cd viz-components
   ```

2. Inicializar proyecto:
   ```bash
   git init
   bun init
   ```

3. Instalar dependencias:
   ```bash
   bun add @preact/signals-core highcharts
   bun add -d typescript @types/node
   ```

4. Crear estructura básica:
   - `src/index.ts`
   - `src/base/viz-base-component.ts`
   - `tsconfig.json`
   - `bunfig.toml` (configuración de build opcional)
   - `README.md`

5. Setup build scripts en `package.json`

6. Crear repo en GitHub y hacer push

**PARTE B: Implementar theme bridge en personal-portfolio**

7. Modificar `components/providers/theme-provider.tsx` para inyectar CSS custom properties

**Entregables**:
- ✅ Proyecto `viz-components` creado y en GitHub
- ✅ Build de librería exitoso (vacía)
- ✅ Theme bridge en portafolio inyectando variables CSS

---

### **Fase 1: Core Charts** (5-7 días)

**Objetivo**: Componente `<viz-chart>` funcional

1. Implementar `VizChart` con Web Components nativos + TypeScript
2. Integrar @preact/signals-core para reactividad
3. Lazy load de Highcharts
4. Soportar tipos: line, bar, pie, area
5. Integración con theme (colors, fonts)
6. Responsive sizing
7. Event system (`chart-click`, `series-hover`)
8. Crear `playground.tsx` section
9. Crear `chart-demo.tsx` con ejemplos
10. Agregar traducciones es/en
11. Agregar al navbar y home page

**Entregables**:
- ✅ `<viz-chart>` funcional con 4 tipos
- ✅ Sección Playground visible en portafolio
- ✅ Theme switching funciona
- ✅ Ejemplos interactivos de charts

---

### **Fase 2: Dashboard Layout** (4-5 días)

**Objetivo**: Componentes `<viz-dashboard>` y `<viz-widget>`

1. Implementar `VizDashboard` (CSS Grid layout)
2. Implementar `VizWidget` (card wrapper con slots)
3. Responsive columns config
4. Loading/error states
5. Crear `dashboard-demo.tsx` con ejemplo completo
6. Sample dashboard con 4-6 widgets (mix de charts, stats)

**Entregables**:
- ✅ Dashboard layout funcional
- ✅ Demo dashboard visualmente atractivo
- ✅ Mobile responsive

---

### **Fase 3: Data Table** (5-6 días)

**Objetivo**: Componente `<viz-table>` interactiva

1. Implementar `VizTable` básica (columnas, rows)
2. Sorting (single/multi-column)
3. Filtering (per-column + global search)
4. Pagination (client-side)
5. Row selection (single/multi)
6. Responsive (stack en mobile)
7. Crear `table-demo.tsx` con dataset de ejemplo

**Entregables**:
- ✅ Tabla interactiva completa
- ✅ Todos los features funcionando
- ✅ Demo con dataset real

---

### **Fase 4: Advanced Visualizations** (4-5 días)

**Objetivo**: 2 visualizaciones avanzadas

1. Implementar `VizHeatmap`
   - Cargar Highcharts heatmap module
   - Gradient config
   - Tooltip customization

2. Implementar `VizTreemap`
   - Cargar Highcharts treemap module
   - Hierarchical data handling
   - Interactive drill-down

3. Crear `advanced-demo.tsx` con ejemplos

**Entregables**:
- ✅ Heatmap funcional
- ✅ Treemap funcional
- ✅ Demos convincentes

---

### **Fase 5: Polish & Documentation** (3-4 días)

**Objetivo**: Refinamiento final

1. **Accessibility**:
   - ARIA labels y roles
   - Keyboard navigation
   - Screen reader testing
   - Color contrast verification

2. **Performance**:
   - Lazy load de Highcharts modules
   - Debounce resize handlers
   - Bundle size analysis
   - Virtual scrolling (table)

3. **UX Playground**:
   - Interactive controls (cambiar datos, config)
   - Code snippets mostrando uso
   - Tab navigation entre demos
   - Mobile optimization

4. **Documentation**:
   - README con setup instructions
   - Component API docs
   - Usage examples
   - Integration guide (Angular, JSP)

**Entregables**:
- ✅ Lighthouse score > 90
- ✅ Accessibility compliant
- ✅ Documentation completa
- ✅ UX pulida

---

**Timeline Total**: 4-5 semanas

---

## 7. Workflow de Desarrollo

### Desarrollo Local (con bun link):

**Setup inicial** (una sola vez):
```bash
# En viz-components:
cd /home/paul/Documentos/proyectos/frontend/viz-components
bun link

# En personal-portfolio:
cd /home/paul/Documentos/proyectos/frontend/personal-portfolio
bun link @pguerrero/viz-components
```

**Durante desarrollo**:

**Terminal 1** - Watch mode para librería:
```bash
cd /home/paul/Documentos/proyectos/frontend/viz-components
bun run build --watch  # Bun watch mode
```

**Terminal 2** - Next.js dev server:
```bash
cd /home/paul/Documentos/proyectos/frontend/personal-portfolio
bun dev
```

**Hot reload**: Cambios en Web Components → Bun rebuild automático → Next.js detecta cambios

---

## 8. Consideraciones Importantes

### 8.1 Bundle Size

**Tamaño estimado**:
- @preact/signals-core: ~1.5KB minified + gzip
- Highcharts core: ~300KB minified
- Web Components (nativos): 0KB (browser built-in)

**Total librería base**: ~1.5KB (sin Highcharts)
**Total con Highcharts**: ~301.5KB (lazy-loaded)

**Mitigación**:
- ✅ Lazy load por componente (no en initial page load)
- ✅ Tree-shaking (importar solo módulos necesarios)
- ✅ Code-split Playground section
- ✅ Considerar Highcharts Lite para charts simples
- ✅ Web Components nativos (0KB overhead vs ~5KB de Lit)

**Impacto**: Muy bajo (Playground es feature opcional + signals ultra-ligero)

### 8.2 Licencia Highcharts

**Status Actual**: Gratis para uso personal/no-comercial ✅

**Futuro**: Si el portafolio evoluciona a uso comercial:
- Opción 1: Comprar licencia (~$500/año)
- Opción 2: Migrar a librería open-source (Chart.js, Apache ECharts)
- Opción 3: Mantener como proyecto personal

### 8.3 Browser Support

**Web Components**:
- ✅ Chrome/Edge: Soporte nativo
- ✅ Firefox: Soporte nativo
- ✅ Safari: Soporte nativo (iOS 10.3+)
- ⚠️ IE11: No soportado (aceptable para portafolio moderno)

### 8.4 Portabilidad Verificada

**Testing Plan**:
1. ✅ Next.js - Integración primaria
2. ⚡ Angular - Crear app test simple
3. ⚡ JSP - HTML file con `<script>` tag
4. ⚡ Vanilla JS - Plain HTML page

---

## 9. Métricas de Éxito

### Técnicas:
- ✅ Build exitoso (0 errors)
- ✅ Bundle size librería base < 2KB (solo signals)
- ✅ Bundle size total < 305KB (con Highcharts lazy-loaded)
- ✅ Lighthouse performance > 90
- ✅ TypeScript strict mode OK

### Funcionales:
- ✅ Theme switching (light/dark) funciona
- ✅ SSR sin errores (dynamic import)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (keyboard, screen reader)

### Portabilidad:
- ✅ Funciona en Next.js
- ✅ Puede importarse en Angular
- ✅ Puede cargarse vía `<script>` en HTML

---

## Resumen

Este plan implementa una **solución moderna, portable y escalable** para una sección de Playground/Demo con Web Components. Arquitectura basada en estándares web, integración seamless con Next.js, y diseño que permite futuro uso en Angular/JSP sin modificaciones.

**Ventajas clave**:
1. ✅ Framework-agnostic (Web Components nativos estándar)
2. ✅ TypeScript-first sin abstracción de framework
3. ✅ Reactividad ligera con @preact/signals-core (~1.5KB)
4. ✅ Proyecto separado (reutilizable, publicable)
5. ✅ Theme bridge elegante (CSS custom properties)
6. ✅ Performance optimizado (lazy loading, code splitting)
7. ✅ Portable (npm publish posible en futuro)
8. ✅ Bun all-in-one (package manager + bundler + runtime, ultra-rápido)

---

**Próximos pasos**: Comenzar con Fase 0 (Foundation) - Setup de infraestructura
