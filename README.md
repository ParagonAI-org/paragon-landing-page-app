# ParagonAI | Frontier Tech Addis Ababa

The official landing page for ParagonAI, a research and deployment company based in Addis Ababa, Ethiopia, focused on building safe and beneficial AGI.

## Key Features

-   **Next.js:** Utilizes the power of Next.js for server-side rendering, static site generation, and optimized performance.
-   **TypeScript:** Enforces type safety and improves code maintainability with TypeScript.
-   **Biome:** All-in-one tool for linting, formatting, and import organization, replacing ESLint, Prettier, and Stylelint.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **Lucide React:** Beautifully simple, pixel-perfect icons from Lucide.
-   **next-themes:** Easily switch between light and dark themes.
-   **Vitest:** A fast and modern unit testing framework.
-   **Playwright:** End-to-end testing for reliable and robust applications.
-   **Husky:** Git hooks to automate tasks before commits.
-   **lint-staged:** Run Biome on staged files to ensure code quality.

## Project Structure

```
src/
├── app/             # Next.js app directory for routing and pages
├── components/      # Reusable UI components
├── contexts/        # React contexts for managing global state
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and helper modules
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Getting Started

1.  **Install dependencies:**
    ```bash
    yarn install
    ```
2.  **Run the development server:**
    ```bash
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

-   `yarn dev`: Starts the development server with Turbopack.
-   `yarn build`: Builds the application for production.
-   `yarn start`: Starts the production server.
-   `yarn check`: Checks and fixes code formatting and linting issues using Biome.
-   `yarn type-check`: Performs TypeScript type checking.
-   `yarn test`: Runs unit tests with Vitest.
-   `yarn test:e2e`: Runs end-to-end tests with Playwright.

## How-To Guides

### Adding a New Component

1.  Create a new file in the `src/components` directory.
2.  Import and use the component.

### Adding a New Page

1.  Create a new file in the `src/app` directory (e.g., `src/app/about/page.tsx`).
2.  Define a React component as the default export.

## Component Rule

All components should always be pure functional arrow functions with direct props destructuring to ensure consistency, readability, and maintainability.

## Linting and Formatting

This project uses **Biome** to enforce code quality, formatting, and import consistency.

-   Run `yarn check` to check and automatically fix issues across the codebase.
-   Husky and lint-staged are configured to automatically run `biome check --write` on staged files before committing.
