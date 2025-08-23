# Gemini Context: SplitUp Frontend

## Project Overview

This is the frontend for the SplitUp application, a mobile app for splitting expenses with friends and groups. It is built using **React Native** and the **Expo** framework, allowing for cross-platform development for iOS, Android, and Web from a single codebase.

The project is written in **TypeScript** and uses modern React features like hooks. It follows a feature-sliced design, with distinct modules for major functionalities like `auth`, `friends`, `groups`, and `home` located in `src/features`.

### Core Technologies

- **UI & Framework:** React Native, Expo
- **Language:** TypeScript
- **Navigation:** React Navigation (with Native Stack and Bottom Tabs)
- **State Management:** React Query for server state, React Context for global UI state.
- **Styling:** `react-native-unistyles` for themeable, responsive styles. It supports light and dark modes.
- **HTTP Client:** Axios, with interceptors for authentication and token refresh.
- **Forms:** React Hook Form with Zod for validation.
- **UI Components:** A custom component library is being built in `src/components/ui`, including buttons, inputs, and bottom sheets.

### Architecture

The application is structured around a `RootStack.Navigator` which conditionally renders either the `AuthStack` or the `MainStackNavigator` based on the user's authentication status. The main stack includes a tab navigator for the primary sections of the app.

API interactions are centralized in `src/shared/api/client.ts`, which uses an Axios instance with interceptors to handle access token injection and automatic token refresh. Each feature has its own API definitions (`endpoints.ts`, `query.ts`, `mutationFn.ts`) and types.

## Building and Running

The project uses `pnpm` as its package manager.

- **Install Dependencies:**
  ```sh
  pnpm install
  ```

- **Run Development Server:**
  ```sh
  pnpm start
  ```
  This command starts the Expo development server with the dev client.

- **Run on Simulators/Emulators:**
  - **iOS:**
    ```sh
    pnpm run ios
    ```
  - **Android:**
    ```sh
    pnpm run android
    ```

- **Run in Web Browser:**
  ```sh
  pnpm run web
  ```

**Note:** This project is configured to use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and cannot be run with the standard Expo Go app.

## Development Conventions

- **Styling:** Use the `react-native-unistyles` library for all styling. Theme variables (colors, spacing, etc.) are defined in `src/theme/index.ts`. Avoid inline styles.
- **File Structure:** Follow the existing feature-sliced structure. For a new feature, create a directory under `src/features` and include subdirectories for `api`, `components`, `hooks`, `screens`, and `types` as needed.
- **API Layer:** When adding new API calls, define endpoints in `endpoints.ts`, create query/mutation functions in `query.ts` or `mutationFn.ts`, and define types in `*.types.ts`.
- **State Management:** Use React Query for managing server state (fetching, caching, updating data). Use React Context for global UI state (e.g., authentication status).
- **Path Aliases:** The project uses a path alias `@/*` which maps to the `src/` directory. Use this for cleaner import statements (e.g., `import { Button } from '@/components/ui/button';`).
