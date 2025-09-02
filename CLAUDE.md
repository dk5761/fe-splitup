# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application for SplitUp - a bill splitting and expense management app. The project uses Expo with React Navigation and follows a feature-based architecture pattern.

## Development Commands

### Package Management
- **Package Manager:** pnpm (not npm)
- **Install dependencies:** `pnpm install`
- **Add dependency:** `pnpm add <package>`

### Running the App
- **Start development server:** `pnpm start`
- **Run on iOS:** `pnpm ios`
- **Run on Android:** `pnpm android`
- **Run on web:** `pnpm web`

### Building
- **iOS build:** `pnpm run ios`
- **Android build:** `pnpm run android`

## Architecture Overview

### Project Structure
```
src/
├── components/          # Shared/reusable components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   └── bottomTabs/     # Custom tab bar components
├── features/           # Feature-specific modules
│   ├── auth/           # Authentication feature
│   ├── home/           # Home/dashboard feature
│   ├── expense/        # Expense management feature
│   ├── friends/        # Friend management feature
│   ├── groups/         # Group management feature
│   ├── activity/       # Activity tracking feature
│   ├── payment/        # Payment processing feature
│   └── profile/        # User profile feature
├── shared/             # Shared utilities and configurations
│   ├── api/            # API client configuration
│   ├── context/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── query/          # TanStack Query client setup
│   └── utils/          # Utility functions
├── navigation/         # Navigation configuration
├── theme/              # Theme configuration (Unistyles)
└── docs/               # API documentation
```

### Feature Module Structure
Each feature follows this structure:
```
features/[feature-name]/
├── components/         # Feature-specific components
├── screens/           # Screen components
├── forms/             # Form components with Zod schemas
├── api/               # API calls and business logic
│   ├── endpoints.ts   # API endpoint constants
│   ├── queryKeyFactory.ts  # Query key factory
│   ├── query.ts       # Query functions
│   └── mutationFn.ts  # Mutation functions
├── types/             # TypeScript types
├── hooks/             # Feature-specific hooks
└── index.ts           # Barrel exports
```

## Key Technologies & Patterns

### Styling
- **Library:** Unistyles v3
- **Documentation:** https://context7.com/jpudysz/react-native-unistyles/llms.txt
- **Theme Support:** Light and dark themes with system preference detection
- **Breakpoints:** Responsive design with xs, sm, md, lg, xl breakpoints

### State Management
- **Server State:** TanStack Query with queryKeyFactory pattern
- **Client State:** React Context for simple state management
- **Forms:** React Hook Form with Zod validation

### Navigation
- **Library:** React Navigation
- **Structure:** Tab-based navigation with nested stack navigators
- **Deep Linking:** Configured with "splitup://" scheme

### API Integration
- **Client:** Axios
- **Base URL:** Configured in shared/api/client.ts
- **Authentication:** Bearer token in Authorization header
- **Documentation:** src/docs/API.md contains all backend API contracts

### Toast Notifications
- **Library:** Sonner Native
- **States:** Success, Error, Warning
- **Position:** Bottom-center

## Code Standards

### TypeScript
- Use strict typing
- Prefer interfaces over types for object shapes
- Avoid `any` type
- Use literal types instead of enums

### Component Structure
- Functional components with hooks
- Keep files under 200-300 LOC
- Component directory structure: `ComponentName/`, `ComponentName.tsx`, `ComponentName.styles.ts`, `index.ts`

### Performance
- Use React.memo for components with static props
- Optimize FlatLists with proper props
- Avoid anonymous functions in render methods
- Use Reanimated for animations

### Forms
- Use React Hook Form
- Validate with Zod schemas
- Store forms in dedicated `forms/` directory within features

### Pressable Components
- Wrap in View with margin
- Border radius on View, not Pressable
- Padding on Pressable, not View

## Query Key Factory Pattern

Each feature has a single `queryKeyFactory.ts` file that generates all query keys:
```typescript
// Example queryKeyFactory
export const homeQueryKeys = {
  all: ['home'] as const,
  balances: () => [...homeQueryKeys.all, 'balances'] as const,
  activity: () => [...homeQueryKeys.all, 'activity'] as const,
}
```

Query functions are stored in `query.ts` using `queryOptions` or `infiniteQueryOptions`.

## API Documentation

The backend API contract is documented in `src/docs/API.md`. Refer to this file when:
- Creating new features that require API calls
- Modifying existing API integrations
- Understanding request/response formats

## Environment Configuration

- Environment variables stored in `.env` file
- Backend API URLs and configuration documented in `src/docs/API.md`

## Important Notes

- This is a mobile-only project (not targeting web)
- Uses Expo development builds (not Expo Go)
- Components should be modular and reusable
- Always add new files to `index.ts` for proper TypeScript module resolution
- Use the existing shared components and utilities before creating new ones