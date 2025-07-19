This project is a modern, full-stack chat application built with a powerful and type-safe technology stack. At its core, it leverages the Next.js framework for both the frontend and backend, providing a seamless and efficient development experience. The application is designed to facilitate conversations with a Large Language Model (LLM), likely using the OpenAI API, and includes features for user account management and settings.

### Key Technologies

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling approach.
- **UI Components:** A combination of custom components and likely a component library like [shadcn/ui](https://ui.shadcn.com/), indicated by the presence of `tailwind-merge` and `tailwindcss-animate`.
- **LLM Integration:** The `openai` package suggests direct integration with OpenAI's services for chat functionality.
- **Code Quality:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/#/) are configured to ensure code consistency and quality.

### Project Structure

The project follows a well-organized structure that separates concerns and promotes maintainability:

- `app/`: This directory contains the main application pages and layouts, following the Next.js App Router conventions. It includes routes for the main chat interface (`/chat`), user settings (`/settings`), and the home page.
- `server/`: This holds the backend logic, including database-related code.
  - `db/`: Contains the Drizzle ORM schema (`schema.ts`), database connection setup (`db.ts`), and migration scripts.
  - `queries.ts`: Likely contains the application's primary database query functions.
- `src/`: This directory is dedicated to the application's source code, including:
  - `components/`: Reusable React components, organized by feature (e.g., `chat`, `common`, `settings`).
  - `lib/`: Core logic and utility functions, such as the LLM interaction service (`llm.ts`), a logger, and type definitions.
- `public/`: Static assets like images and icons are stored here.

### Core Features

- **Interactive Chat:** The heart of the application is a chat interface that allows users to communicate with an LLM.
- **User and Model Settings:** The application provides pages for users to manage their details and configure LLM settings.
- **Database Persistence:** User data, chat history, and settings are stored in a PostgreSQL database.
- **Markdown and Code Rendering:** The use of `react-markdown` and `rehype-highlight` suggests that the chat interface can render Markdown-formatted text and highlight code blocks.
- **Modern UI:** The project is set up with modern tooling to create a visually appealing and responsive user interface.
