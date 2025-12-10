# Portfolio Personal - Paul Guerrero Linares

Portfolio personal, desarrollado con Next.js 16, TypeScript, Bun y SCSS.

## 🚀 Características

- **Diseño minimalista**: Interfaz minimalista y profesional con mucho espacio en blanco
- **Bilingüe**: Soporte para Español (es_ES) e Inglés (en_US) con toggle
- **Dark/Light Mode**: Tema oscuro y claro con toggle y detección automática
- **Responsive**: Mobile-first, adaptado a todos los dispositivos
- **Animaciones suaves**: Transiciones y micro-interacciones con Framer Motion
- **Optimizado**: Performance optimizado con Next.js 16 y Turbopack
- **TypeScript**: Código type-safe con TypeScript estricto
- **SCSS Design System**: Sistema de estilos con SCSS

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
│       ├── icon.tsx            # Sistema de iconos (Simple Icons)
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
├── lib/constants/              # Datos del portfolio
├── messages/                   # Archivos de traducción (es.json, en.json)
├── i18n/                       # Configuración de internacionalización
└── public/                     # Assets estáticos
```

## 🎨 Stack Tecnológico

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Lenguaje**: TypeScript 5
- **Estilos**: SCSS + CSS Modules
- **Animaciones**: Framer Motion
- **Internacionalización**: next-intl
- **Tema**: next-themes
- **Iconos**: Custom Icon System (Simple Icons SVG paths)
- **Runtime**: Bun

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
