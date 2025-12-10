# Portfolio Personal - Paul Guerrero Linares

Portfolio profesional con diseño minimalista estilo Apple, desarrollado con Next.js 16, TypeScript, Bun y Tailwind CSS.

## 🚀 Características

- **Diseño Apple-like**: Interfaz minimalista y profesional con mucho espacio en blanco
- **Bilingüe**: Soporte completo para Español (es_ES) e Inglés (en_US) con toggle
- **Dark/Light Mode**: Tema oscuro y claro con toggle y detección automática
- **Responsive**: Mobile-first, completamente adaptable a todos los dispositivos
- **Animaciones suaves**: Transiciones y micro-interacciones con Framer Motion
- **Optimizado**: Performance optimizado con Next.js 16 y Turbopack
- **TypeScript**: Código type-safe con TypeScript estricto
- **Preparado para WebSocket**: Arquitectura lista para tablero en tiempo real

## 📋 Requisitos

- **[Bun](https://bun.sh/)** >= 1.0.0 (**REQUERIDO** - este proyecto usa Bun como package manager)
- Node.js >= 18.0.0

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd portfolio

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
# O: npm run lint

# Formatear código
bun format
# O: npm run format
```

El servidor de desarrollo estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── [locale]/           # Rutas internacionalizadas
│   │   ├── layout.tsx      # Layout principal con providers
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Estilos globales
│   └── api/
│       └── contact/        # API endpoint contacto
├── components/
│   ├── layout/             # Componentes de layout (Navbar, Footer)
│   ├── sections/           # Secciones del portfolio
│   ├── widgets/            # Widgets reutilizables
│   └── ui/                 # Componentes UI base
├── lib/
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utilidades
│   └── constants/          # Datos estáticos
├── messages/               # Archivos de traducción (es.json, en.json)
├── public/                 # Assets estáticos
└── types/                  # TypeScript types
```

## 🎨 Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Internacionalización**: next-intl
- **Tema**: next-themes
- **Runtime**: Bun

## 🌐 Secciones

1. **Hero**: Introducción con nombre, rol y CTAs
2. **About**: Sobre mí con tecnologías principales
3. **Projects**: Proyectos destacados y link a GitHub
4. **Experience**: Experiencia profesional
5. **Contact**: Formulario de contacto

## 🔧 Personalización

### Datos Personales

Los datos del portfolio se centralizan en [`lib/constants/portfolio-data.ts`](lib/constants/portfolio-data.ts). Modifica este archivo para actualizar:

- Información personal
- Skills y tecnologías
- Experiencia laboral
- Links a redes sociales

### Traducciones

Edita los archivos de traducción en [`messages/`](messages/):
- `es.json` - Español
- `en.json` - English

### Estilos

El sistema de diseño se configura en [`tailwind.config.ts`](tailwind.config.ts):
- Colores del tema
- Tipografía
- Espaciado
- Animaciones

### CV

Coloca tu CV en PDF en [`public/cv/`](public/cv/) y actualiza el link en portfolio-data.ts

### Imágenes

Añade tu foto de perfil y screenshots en [`public/images/`](public/images/)

## 🔮 Futuras Integraciones

El proyecto está preparado para integrar un tablero en tiempo real con WebSocket sin necesidad de refactorizar:

- Hook `useRealtimeData` preparado en `lib/hooks/`
- Componente placeholder en `components/widgets/RealTimeBoardPlaceholder.tsx`
- Documentación incluida en comentarios

## 📝 Licencia

Privado - © 2025 Paul Guerrero Linares

## 👤 Autor

**Paul Guerrero Linares**
- GitHub: [@pguerrerolinares](https://github.com/pguerrerolinares)
- LinkedIn: [Paul Guerrero Linares](https://www.linkedin.com/in/paul-guerrero-linares-584759134)

