# Portfolio Personal - Paul Guerrero Linares

Portfolio personal, desarrollado con Next.js 16, TypeScript, Bun y SCSS.

## 🚀 Características

- **Diseño minimalista**: Interfaz minimalista y profesional con mucho espacio en blanco
- **Bilingüe**: Soporte para Español (es_ES) e Inglés (en_US) con toggle
- **Dark/Light Mode**: Tema oscuro y claro con toggle y detección automática
- **Responsive**: Mobile-first, adaptado a todos los dispositivos
- **Animaciones premium**: Transiciones fluidas, efectos de hover, scroll progress y micro-interacciones con Framer Motion
- **Optimizado**: Performance optimizado con Next.js 16 y Turbopack
- **TypeScript**: Código type-safe con TypeScript estricto
- **SCSS Design System**: Sistema de diseño completo con tokens, elevación y gradientes
- **Accesibilidad**: WCAG AA compliant con soporte para reduced motion y navegación por teclado
- **Interacciones avanzadas**: Magnetic hover effects, gradient borders, section reveals

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

### Verificar el deploy

1. Ve a la pestaña **Actions** en GitHub
2. Verifica que el workflow "Deploy to GitHub Pages" se ejecutó correctamente
3. Accede a tu URL para ver el sitio en vivo

## 📁 Estructura del Proyecto

```
portfolio-personal/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── [locale]/               # Rutas internacionalizadas
│   │   ├── layout.tsx          # Layout con navbar/footer
│   │   ├── layout.module.scss  # Estilos del layout (colocados)
│   │   ├── page.tsx            # Home page
│   │   ├── not-found.tsx       # Página 404
│   │   └── not-found.module.scss
│   ├── sitemap.ts              # SEO sitemap
│   └── robots.ts               # SEO robots.txt
│
├── components/
│   ├── layout/                 # Componentes de layout
│   │   ├── navbar.tsx
│   │   ├── navbar.module.scss
│   │   └── ...
│   ├── providers/              # Providers globales
│   │   ├── lazy-motion-provider.tsx  # LazyMotion + MotionConfig
│   │   └── ...
│   ├── sections/               # Secciones (organizadas por carpeta)
│   │   ├── hero/
│   │   │   ├── hero.tsx
│   │   │   └── hero.module.scss
│   │   ├── about/
│   │   │   ├── about.tsx
│   │   │   └── about.module.scss
│   │   └── ...
│   ├── widgets/                # Widgets reutilizables
│   │   ├── project-card.tsx
│   │   ├── project-card.module.scss
│   │   └── ...
│   └── ui/                     # Componentes UI base
│       ├── animated-section.tsx      # Section reveal animations
│       ├── button.tsx                # Button component
│       ├── button.module.scss
│       ├── badge.tsx                 # Badge component
│       ├── badge.module.scss
│       ├── spinner.tsx               # Loading spinner
│       ├── spinner.module.scss
│       ├── scroll-progress.tsx       # Scroll progress bar
│       ├── scroll-progress.module.scss
│       ├── page-transition.tsx       # Page transitions
│       ├── toast-provider.tsx        # Toast notifications (Sonner)
│       ├── icon.tsx                  # Sistema de iconos (Simple Icons)
│       ├── theme-toggle.tsx
│       └── ...
│
├── styles/                     # Design System SCSS Global
│   ├── globals.scss            # Estilos base + CSS variables
│   ├── _variables.scss         # Design tokens (colores, spacing, etc.)
│   ├── _mixins.scss            # Mixins reutilizables
│   ├── _typography.scss        # Estilos de tipografía
│   └── _animations.scss        # Keyframes y animaciones
│
├── lib/
│   ├── constants/              # Datos del portfolio
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
- **Estilos**: SCSS + CSS Modules
- **Animaciones**: Framer Motion (LazyMotion + domAnimation)
- **Internacionalización**: next-intl
- **Tema**: next-themes
- **Iconos**: Custom Icon System (Simple Icons SVG paths)
- **Notificaciones**: Sonner (toast notifications)
- **Runtime**: Bun

## ✨ Características Premium

### 🎯 Interacciones Avanzadas

#### Enhanced Card Hover Effects
- **Lift Animation**: Las tarjetas se elevan suavemente al hacer hover con `translateY(-4px)`
- **Gradient Borders**: Bordes con gradiente animado usando CSS mask composite
- **Shadow Elevation**: Sistema de sombras con 5 niveles de elevación para dar profundidad
- **Bounce Effect**: Transiciones con cubic-bezier personalizado `(0.34, 1.56, 0.64, 1)` para efecto elástico sutil

Aplicado en:
- `components/widgets/project-card.module.scss`
- `components/widgets/experience-card.module.scss`
- `components/widgets/contact-card.module.scss`

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

#### Enhanced Gradient Backgrounds
- **Mesh Gradients**: 5 gradientes radiales superpuestos con colores del design system
- **Noise Texture**: Textura de ruido SVG con `fractalNoise` para añadir profundidad
- Posicionamiento estratégico: `27% 37%`, `97% 21%`, `52% 99%`, `10% 29%`, `84% 67%`
- Opacidad controlada: gradientes al 60%, ruido al 3%
- Implementado en: `components/ui/animated-background.module.scss`

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

### 🎭 Design System Enhancements

#### Color System Expansion
- **Semantic Colors**: success, warning, error, info (light + dark variants)
- **Category Colors**: web, mobile, AI, automation, other
- **Gray Scale**: 50-950 (11 tonos)
- **Opacity Scale**: 5%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%
- Todas con versiones RGB para transparencias

#### Shadow Elevation System
```scss
$elevation-0: none
$elevation-1: sm shadow
$elevation-2: md shadow
$elevation-3: lg shadow
$elevation-4: xl shadow
$elevation-5: 2xl shadow (25px blur)
```

#### Component Library
- **Button**: 4 variantes (primary, secondary, outline, ghost) × 3 tamaños (sm, md, lg)
- **Badge**: 6 variantes (default, accent, success, warning, error, outline)
- **Spinner**: 3 tamaños con animación de rotación suave
- **Toast**: Sistema de notificaciones con Sonner (rich colors, position customizable)

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

### Estilos

El sistema de diseño utiliza SCSS Modules y Variables CSS.
- **Tokens globales**: `styles/_variables.scss`
- **Componentes**: Estilos colocados junto a cada componente (`.module.scss`)

### Iconos

El sistema de iconos usa SVG paths de Simple Icons. Para añadir nuevos iconos, edita [`components/ui/icon.tsx`](components/ui/icon.tsx).

## 👤 Autor

**Paul Guerrero Linares**
- GitHub: [@pguerrerolinares](https://github.com/pguerrerolinares)
- LinkedIn: [Paul Guerrero Linares](https://www.linkedin.com/in/paul-guerrero-linares-584759134)
