# Copilot Instructions for ts-web

## Project Overview

This is a Next.js 14+ portfolio/blog website built with TypeScript, featuring MDX-based content management via Contentlayer, Tailwind CSS styling, and Framer Motion animations. The site includes a blog with view tracking (Upstash Redis), multiple layout patterns, and custom UI components.

## Architecture & Key Patterns

### Path Aliases & Import Conventions

Use the following TypeScript path aliases consistently:

- `@/*` - Root-level imports (lib, types, etc.)
- `@components/*` - All components from `components/` directory
- `@ui` - UI component barrel export from `components/ui/index.ts`
- `@hooks/*` - Custom React hooks from `hooks/`
- `@contexts/*` - React contexts from `contexts/`
- `@content` - Contentlayer-generated content from `.contentlayer/generated`

**Examples:**

```tsx
import { allBlogs } from "@content";
import { GradientText } from "@components/text";
import { Button, Dialog } from "@ui";
import { cn } from "@/lib/utils";
```

### Route Groups & Layouts

The app uses Next.js route groups for different layout strategies:

- `app/(primaryLayout)/` - Main portfolio pages with snap-scroll sections
- `app/(readingLayout)/` - Blog reading experience with different navigation/layout
- Each route group has its own `template.tsx` for layout-specific logic

### Content Management with Contentlayer

Blog content lives in `content/blog/*.mdx` and is transformed by Contentlayer:

- Configuration: [contentlayer.config.ts](contentlayer.config.ts)
- Computed fields include: `slug`, `url`, `readingTime`, `lastModified` (from git history)
- Access via `allBlogs` from `@content`
- Required frontmatter: `title`, `summary`, `img`, `date`, `author`, `tags`
- Optional: `published`, `keywords`, `related`, `authorImg`, `authorDesc`

**Build content separately:** `npm run build:content` (though typically runs as part of Next.js build)

### Component Organization

Components follow a structured hierarchy:

- `components/ui/` - Shadcn/ui primitives with barrel export at `components/ui/index.ts`
- `components/text/` - Text effect components (GradientText, GlitchText, AnimatedHeading) with barrel export
- `components/icons/` - Icon components
- `components/career/` - Domain-specific components
- Root `components/` - Feature components (mdx.tsx, navbar.tsx, blog-\*.tsx, etc.)

**All UI exports are accessible via `@ui` import:**

```tsx
import { Button, Dialog, Badge, ThreeDCardContainer } from "@ui";
```

### Styling Conventions

- **Tailwind utility function:** `cn()` from `@/lib/utils` merges Tailwind classes with `clsx` and `tailwind-merge`
- **Custom Tailwind utilities:** Backface visibility plugin in [tailwind.config.ts](tailwind.config.ts)
- **Theme support:** Dark mode via `next-themes` with `ThemeProvider` in root layout
- **Custom colors:** Check [tailwind.config.ts](tailwind.config.ts) for extended color palette and animations
- **Component-specific CSS:** Some components like `mecha-card` have accompanying `.css` files

### MDX Components & Blog Rendering

Custom MDX components are defined in [components/mdx.tsx](components/mdx.tsx):

- Custom heading styles (h1-h4) with gradient text and animations
- Enhanced paragraphs, links, lists, code blocks
- Special components: `MultiColumn`, `ExternalEmbed`, `ZoomableImgPreview`
- Use `<Mdx code={blog.body.code} />` to render blog content

**Rehype plugins configured in Contentlayer:**

- `rehype-pretty-code` for syntax highlighting with Shiki
- `rehype-slug` and `rehype-autolink-headings` for heading anchors
- Custom `rehypeExternalEmbed` for embedding external content

### API Routes & Redis Integration

View counting system using Upstash Redis:

- `app/api/view-count/` - POST endpoint to track views
- `app/api/get-views/` - GET endpoint to retrieve view counts
- Redis helper: [lib/redis.ts](lib/redis.ts) with `getUserViewKey()` utility
- Client component: [components/blog-view-counter.tsx](components/blog-view-counter.tsx) handles fingerprinting and fetching

## Common Patterns

### Creating New UI Components

1. Place reusable primitives in `components/ui/`
2. Export from `components/ui/index.ts` barrel file
3. Follow Radix UI patterns for accessibility
4. Use `cn()` for className composition

### Adding Blog Posts

1. Create MDX file in `content/blog/`
2. Include required frontmatter fields
3. Contentlayer auto-generates types and transformed content
4. Access via `allBlogs` array from `@content`

### Animation Patterns

- Primary animation library: Framer Motion (imported as `motion` from `motion` package)
- Scroll animations: See [components/animate-element.tsx](components/animate-element.tsx)
- Page transitions: [components/page-transition.tsx](components/page-transition.tsx)
- Text effects: [components/text/](components/text/) directory

### Type Safety

- Component props: Use `UiComponent` type from `@/types` for className/children props
- Icon types: Centralized in `types/icons.ts`
- MDX types: Import from `mdx/types`
- Contentlayer types: Auto-generated in `.contentlayer/generated`

## External Dependencies

- **Vercel Analytics:** Integrated in root layout
- **Upstash Redis:** View counting/analytics
- **Next Cloudinary:** Image optimization and OG image generation
- **Radix UI:** Accessible component primitives
- **Tabler Icons + Lucide:** Icon libraries
- **Shiki:** Syntax highlighting in code blocks
