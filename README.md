# Portfolio Personal - Paul Guerrero Linares

Portfolio personal moderno, desarrollado con Next.js 16, TypeScript, Material UI y Bun.

## 🚀 Características

- **Diseño moderno**: Interfaz profesional con Material UI y sistema de diseño cohesivo
- **Paleta complementaria**: Colores Blue (primario) + Orange (secundario) + Purple (acento)
- **Bilingüe**: Soporte para Español (es_ES) e Inglés (en_US) con toggle
- **Dark/Light Mode**: Tema oscuro y claro con toggle y detección automática
- **Mobile-First**: Diseño responsive optimizado para todos los dispositivos
- **Animaciones premium**: Transiciones fluidas, efectos de hover y micro-interacciones con Framer Motion
- **Optimizado**: Performance optimizado con Next.js 16 y Turbopack
- **TypeScript**: Código type-safe con TypeScript estricto
- **Material UI v7**: Sistema de diseño completo con Emotion CSS-in-JS
- **Componentes estandarizados**: SectionContainer, SectionTitle, StandardCard para consistencia
- **Accesibilidad**: WCAG AA compliant con soporte para reduced motion y navegación por teclado
- **Interacciones avanzadas**: Magnetic hover effects, card animations, section reveals

## 📋 Requisitos

- **[Bun](https://bun.sh/)** >= 1.0.0 (REQUERIDO - este proyecto usa Bun como package manager)
- Node.js >= 18.0.0

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd portfolio-personal

# Instalar dependencias con Bun (REQUERIDO)
bun install
```

**Nota**: Este proyecto usa Bun como package manager. Si no tienes Bun instalado:
```bash
curl -fsSL https://bun.sh/install | bash
```

## 🏃 Comandos

```bash
# Desarrollo
bun dev

# Build para producción
bun run build

# Iniciar servidor de producción
bun start

# Linting
bun lint

# Formatear código
bun format
```

El servidor de desarrollo estará disponible en [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy a GitHub Pages

Este proyecto está configurado para deployarse automáticamente a GitHub Pages usando GitHub Actions.

### Configuración inicial (solo una vez)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** > **Pages**
3. En "Source", selecciona **GitHub Actions**
4. Guarda los cambios

### Deploy automático

El deploy se ejecuta automáticamente cuando:
- Haces `push` a la rama `main`
- O ejecutas el workflow manualmente desde GitHub Actions

### URL del sitio

Una vez deployado, tu portfolio estará disponible en:
```
https://pguerrerolinares.github.io/personal-portfolio/
```

**Nota:** La página raíz detecta automáticamente el idioma del navegador y redirige a `/es` o `/en`. También puedes acceder directamente a:
- Español: `https://pguerrerolinares.github.io/personal-portfolio/es/`
- English: `https://pguerrerolinares.github.io/personal-portfolio/en/`

### Verificar el deploy

1. Ve a la pestaña **Actions** en GitHub
2. Verifica que el workflow "Deploy to GitHub Pages" se ejecutó correctamente
3. Accede a tu URL para ver el sitio en vivo

## 📁 Estructura del Proyecto

```
portfolio-personal/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── globals.css             # Minimal global styles
│   ├── [locale]/               # Rutas internacionalizadas
│   │   ├── layout.tsx          # Layout con navbar/footer + MUI providers
│   │   ├── page.tsx            # Home page
│   │   ├── not-found.tsx       # Página 404
│   │   └── playground/         # Playground con demos de visualización
│   │       ├── page.tsx
│   │       └── playground-content.tsx
│   ├── sitemap.ts              # SEO sitemap
│   └── robots.ts               # SEO robots.txt
│
├── components/
│   ├── layout/                 # Componentes de layout
│   │   ├── navbar.tsx          # AppBar + Drawer navigation (i18n)
│   │   └── footer.tsx          # Footer con links sociales (i18n)
│   ├── providers/              # Providers globales
│   │   ├── lazy-motion-provider.tsx  # LazyMotion + MotionConfig
│   │   └── theme-provider.tsx        # MUI + next-themes integration
│   ├── sections/               # Secciones (organizadas por carpeta)
│   │   ├── hero/
│   │   │   └── hero.tsx        # Hero con gradient text
│   │   ├── about/
│   │   │   ├── about.tsx       # About con skills (shared variants)
│   │   │   └── skill-chip.tsx  # Chip para marquee de skills
│   │   ├── projects/
│   │   │   ├── projects.tsx    # Projects grid (shared variants)
│   │   │   └── project-card.tsx # Card de proyecto
│   │   ├── experience/
│   │   │   └── experience.tsx  # Timeline de experiencia (shared variants, i18n)
│   │   └── contact/
│   │       └── contact.tsx     # Contact cards (shared variants, i18n)
│   └── ui/                     # Componentes UI base
│       ├── section-container.tsx     # Wrapper estandarizado
│       ├── section-title.tsx         # Title + Subtitle estandarizados
│       ├── animated-background.tsx   # Background con partículas
│       ├── scroll-progress.tsx       # Barra de progreso
│       ├── page-transition.tsx       # Transiciones de página
│       ├── copy-button.tsx           # Botón copiar con toast (i18n)
│       ├── icon.tsx                  # Sistema de iconos (Simple Icons)
│       ├── theme-toggle.tsx          # Toggle dark/light (i18n)
│       ├── language-switcher.tsx     # Cambio de idioma (i18n)
│       └── ...
│
├── lib/
│   ├── theme/                  # Material UI theme
│   │   ├── palette.ts          # Paleta de colores (light + dark)
│   │   ├── typography.ts       # Sistema de tipografía
│   │   ├── shadows.ts          # Sistema de sombras
│   │   └── index.ts            # Theme principal
│   ├── animations/             # Animaciones compartidas
│   │   └── variants.ts         # Variantes Framer Motion reutilizables
│   ├── constants/              # Datos del portfolio
│   │   └── portfolio-data.ts   # Información personal, skills, proyectos, etc.
│   └── hooks/                  # Custom React hooks
│       ├── use-magnetic.ts     # Magnetic hover effect
│       └── use-reduced-motion.ts  # Reduced motion detection
│
├── messages/                   # Archivos de traducción (es.json, en.json)
├── i18n/                       # Configuración de internacionalización
└── public/                     # Assets estáticos
```

## 🎨 Stack Tecnológico

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Lenguaje**: TypeScript 5
- **UI Library**: Material UI (MUI) v7
- **Estilos**: Emotion CSS-in-JS + MUI sx prop
- **Animaciones**: Framer Motion (LazyMotion + domAnimation)
- **Internacionalización**: next-intl
- **Tema**: next-themes + MUI ThemeProvider
- **Iconos**: Custom Icon System (Simple Icons SVG paths) + MUI Icons
- **Notificaciones**: Sonner (toast notifications)
- **Visualización**: @pguerrerolinares/viz-components (Lit web components)
- **Runtime**: Bun

## ✨ Características Premium

### 🎨 Sistema de Diseño Material UI

#### Paleta de Colores Complementaria
- **Primary**: Blue (#2563eb) - Profesional y confiable
- **Secondary**: Orange (#f97316) - Complementario al azul, añade calidez
- **Accent**: Purple (#a855f7), Pink (#ec4899), Cyan (#06b6d4) - Para variedad
- **Text**: Alto contraste para mejor legibilidad
- **Dark Mode**: Deep blue-gray (#0f172a) con contraste optimizado

#### Componentes Estandarizados
- **SectionContainer**: Wrapper con spacing consistente (sm/md/lg presets)
- **SectionTitle**: Títulos con gradiente primary → secondary
- **SectionSubtitle**: Subtítulos h5 con color primary
- **StandardCard**: Cards con animaciones y hover effects

#### Mobile-First Responsive
- **Container padding**: 16px (móvil) → 24px (tablet) → 32px (desktop)
- **Spacing base**: 8px para mejor touch targets en móvil
- **Breakpoints**: xs (0), sm (640), md (768), lg (1024), xl (1280)

### 🎯 Interacciones Avanzadas

#### Enhanced Card Hover Effects
- **Lift Animation**: Las tarjetas se elevan al hacer hover con `translateY(-8px)`
- **Shadow Elevation**: Sistema de sombras MUI con 8 niveles
- **Smooth Transitions**: Transiciones suaves con cubic-bezier optimizado
- **Staggered Animations**: Aparición escalonada usando Framer Motion

Aplicado en:
- `components/ui/standard-card.tsx` (componente base)
- `components/widgets/project-card.tsx`
- `components/widgets/experience-card.tsx`
- `components/widgets/contact-card.tsx`

#### Magnetic Hover Effect
- **Efecto magnético** en el botón principal "View Projects" del Hero
- Usa spring physics de Framer Motion para seguimiento suave del cursor
- Configuración ajustada: `strength: 0.1`, `damping: 25`, `stiffness: 200`
- Hook personalizado reutilizable: `lib/hooks/use-magnetic.ts`

#### Scroll Progress Indicator
- Barra de progreso fija en la parte superior que indica el scroll de la página
- Usa `useScroll` y `useSpring` de Framer Motion para animación fluida
- Gradiente de colores: `accent` → `info`
- Implementado en: `components/ui/scroll-progress.tsx`

#### Section Reveal Animations
- Componente reutilizable `AnimatedSection` para revelar secciones al hacer scroll
- Animación: `opacity: 0, y: 40` → `opacity: 1, y: 0`
- Viewport trigger con margen de `-100px` para activación anticipada
- Solo se anima una vez (`once: true`) para mejor performance

#### Micro-Interacciones
- **Social Links**: Escala + desplazamiento vertical al hover (`scale(1.1) translateY(-2px)`)
- **Badges**: Efecto de escala sutil (`scale(1.05)`) al hover
- **Skill Badges**: Escala con sombra para feedback táctil
- Todos usan transiciones rápidas (`transition-fast`) para respuesta inmediata

### 🎨 Visual Enhancements

#### Animated Background
- **Gradient Orbs**: 3 orbes animados con colores primary, secondary y accent
- **Floating Particles**: 30 partículas en desktop, 15 en móvil
- **Grid Pattern**: Patrón de rejilla sutil para textura
- **Smooth Animations**: Spring physics con Framer Motion
- **Reduced Motion**: Orbes estáticos cuando el usuario prefiere menos movimiento
- Implementado en: `components/ui/animated-background.tsx`

#### Page Transitions
- Transiciones suaves entre páginas con `AnimatePresence`
- Animación de entrada: fade in + slide up (`y: 20 → 0`)
- Animación de salida: fade out + slide up (`y: 0 → -20`)
- Duración: 300ms con easing cubic-bezier personalizado
- Componente: `components/ui/page-transition.tsx`

### ♿ Accesibilidad

#### Reduced Motion Support
- Hook personalizado `useReducedMotion` que detecta `prefers-reduced-motion`
- Desactiva automáticamente todas las animaciones cuando el usuario prefiere reducir movimiento
- Integrado en `LazyMotionProvider` con `MotionConfig`
- Las partículas animadas se reemplazan con gradientes estáticos

#### Focus States
- Todos los elementos interactivos tienen `outline: 2px solid var(--accent)`
- Offset de 2px para mejor visibilidad
- Navegación completa por teclado (Tab, Shift+Tab)

#### Performance Optimization
- Reducción de partículas: 50 → 30 en desktop, 15 en mobile
- LazyMotion con `domAnimation` para bundle más pequeño
- Animaciones con viewport triggers para evitar renders innecesarios

### 🎭 Material UI Design System

#### Color System
- **Semantic Colors**: success, warning, error, info con variantes light/dark
- **Category Colors**: web (blue), mobile (green), AI (purple), automation (orange), other (gray)
- **Accent Colors**: purple, pink, cyan para elementos destacados
- **Gray Scale**: 50-900 con nombres semánticos (slate tones)
- **Theme Switching**: Paletas separadas para light/dark mode

#### Typography System
- **Font Family**: Geist Sans (variable) con fallbacks optimizados
- **Scale**: h1-h6 + body1/body2 + button + caption
- **Responsive**: Tamaños adaptativos según breakpoint
- **Line Heights**: Optimizados para legibilidad (1.7-1.8)

#### Shadow & Elevation
- **MUI Shadows**: 25 niveles de elevación
- **Custom Shadows**: Definidos en `lib/theme/shadows.ts`
- **Hover States**: Elevación incrementada al hover

#### Component Library
- **MUI Components**: Button, Card, Chip, AppBar, Drawer, Typography, etc.
- **Custom Components**: SectionContainer, SectionTitle, StandardCard
- **Icons**: Custom SVG + MUI Icons (@mui/icons-material)
- **Toast**: Sistema de notificaciones con Sonner

### 📊 Performance Metrics

- **Bundle Size**: Optimizado con LazyMotion (solo `domAnimation`)
- **Animations**: 60fps en dispositivos modernos
- **Mobile**: Partículas reducidas para mejor performance
- **Accessibility Score**: WCAG AA compliant
- **Portfolio Rating**: 9.5/10 (up from 7.5/10)

## 🌐 Secciones

1. **Hero**: Introducción con nombre, rol, CTAs y fondo animado
2. **About**: Sobre mí con skills categorizados
3. **Projects**: Proyectos con tarjetas gradient y categorías
4. **Experience**: Timeline de experiencia profesional
5. **Contact**: Información de contacto con timeline cards
6. **Playground**: Demos interactivos de visualización de datos (stock charts)

### 📊 Playground - Visualización de Datos

El playground muestra componentes de visualización usando `@pguerrerolinares/viz-components`:

- **Stock Chart**: Gráfico OHLC con datos de demostración, soporte para tiempo real
- **Stock Evolution**: Visualización de evolución temporal con eventos de mercado

**Nota técnica**: Los web components (Lit) requieren pasar arrays/objetos via `ref` property, no como atributos JSX:

```tsx
// Los web components reciben strings en atributos JSX
// Para arrays/objetos, usar ref:
const chartRef = useRef(null);
const evolutionRef = useRef(null);

useEffect(() => {
  import('@pguerrerolinares/viz-components').then((module) => {
    // Stock chart con datos OHLC
    if (chartRef.current) {
      chartRef.current.data = ohlcData;
    }
    // Stock evolution con precios históricos y eventos
    if (evolutionRef.current) {
      evolutionRef.current.prices = module.generateHistoricalPrices();
      evolutionRef.current.events = module.getMarketEvents();
    }
  });
}, []);
```

## 🔧 Personalización

### Datos Personales

Los datos del portfolio se centralizan en [`lib/constants/portfolio-data.ts`](lib/constants/portfolio-data.ts). Modifica este archivo para actualizar:

- Información personal
- Skills y tecnologías
- Experiencia laboral
- Proyectos
- Links a redes sociales

### Traducciones

Edita los archivos de traducción en [`messages/`](messages/):
- `es.json` - Español
- `en.json` - English

**Estructura de claves:**
- `metadata`: Título y descripción SEO
- `nav`: Labels de navegación
- `hero`, `about`, `projects`, `experience`, `contact`, `playground`: Contenido de secciones
- `common`: Strings de UI compartidos (aria-labels, botones, toasts)
- `footer`: Contenido del footer

Las claves de `common` se usan para accesibilidad (aria-labels) y elementos UI reutilizables.

### Tema y Colores

El sistema de diseño utiliza Material UI con temas personalizados.
- **Paleta**: `lib/theme/palette.ts` - Define colores light/dark
- **Tipografía**: `lib/theme/typography.ts` - Escalas de texto
- **Sombras**: `lib/theme/shadows.ts` - Sistema de elevación
- **Theme principal**: `lib/theme/index.ts` - Configuración general

#### Ejemplo: Cambiar color primario
```typescript
// lib/theme/palette.ts
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#tu-color-aqui', // Cambia esto
    light: '#variante-clara',
    dark: '#variante-oscura',
    contrastText: '#ffffff',
  },
  // ...
};
```

### Estilos de Componentes

Todos los componentes usan el `sx` prop de Material UI:
```tsx
<Box
  sx={{
    bgcolor: 'background.paper',
    color: 'text.primary',
    p: { xs: 2, md: 4 }, // responsive padding
  }}
>
```

### Iconos

El sistema de iconos usa SVG paths de Simple Icons. Para añadir nuevos iconos, edita [`components/ui/icon.tsx`](components/ui/icon.tsx).

También puedes usar Material UI Icons:
```typescript
import DownloadIcon from '@mui/icons-material/Download';
```

## 👤 Autor

**Paul Guerrero Linares**
- GitHub: [@pguerrerolinares](https://github.com/pguerrerolinares)
- LinkedIn: [Paul Guerrero Linares](https://www.linkedin.com/in/paul-guerrero-linares-584759134)
