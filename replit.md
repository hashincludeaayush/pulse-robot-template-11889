# Overview

This is a full-stack web application built with React frontend and Express backend, featuring a sophisticated UI design for a humanoid robot landing page. The project uses modern web technologies including React, TypeScript, Tailwind CSS, shadcn/ui components, and Drizzle ORM for database interactions. The application appears to be a marketing/showcase website for an advanced humanoid robot called "Atlas" with various interactive components, animations, and responsive design elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: React Router DOM for client-side navigation with a catch-all NotFound route
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility
- **State Management**: TanStack React Query for server state management and data fetching
- **Animations**: Custom CSS animations with Intersection Observer API for scroll-triggered effects
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules for modern JavaScript features
- **Development**: TSX for TypeScript execution in development mode
- **Storage Interface**: Abstract storage layer with in-memory implementation for user data
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Error Handling**: Centralized error middleware for consistent error responses

## Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured through Neon Database serverless connection
- **Schema**: Shared type definitions between frontend and backend using Drizzle Zod
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Validation**: Zod schemas for runtime type validation

## Development Environment
- **Monorepo Structure**: Client and server code organized in separate directories with shared schemas
- **Hot Reload**: Vite HMR for frontend development with Express server integration
- **Path Aliases**: TypeScript path mapping for clean imports using `@` and `@shared` prefixes
- **Replit Integration**: Custom plugins for Replit development environment support

# External Dependencies

## UI and Design
- **Radix UI**: Comprehensive set of accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Modern icon library for consistent iconography
- **Class Variance Authority**: Utility for building type-safe component variants
- **Lottie React**: Animation library for complex motion graphics

## Data and Forms
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant form handling with minimal re-renders
- **Hookform Resolvers**: Integration layer for form validation libraries
- **Date-fns**: Modern date utility library for date manipulation

## Charts and Visualization
- **Recharts**: Composable charting library built on React components for data visualization

## Database and Backend
- **Neon Database**: Serverless PostgreSQL platform for cloud database hosting
- **Drizzle ORM**: Modern TypeScript ORM with excellent developer experience
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Express**: Minimal and flexible Node.js web application framework

## Development Tools
- **Vite**: Next-generation frontend tooling for fast builds and development
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: Tool for transforming CSS with JavaScript plugins
- **Autoprefixer**: PostCSS plugin for vendor prefix automation