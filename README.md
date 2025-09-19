# 🛍️ Store Directory Project

This is a responsive, feature-rich web application that displays a directory of stores. It was built as a front-end assessment and includes functionality for searching, filtering, sorting, and viewing store details. The project also features advanced capabilities such as multi-language support and a dark/light theme switcher.

## 🚀 Live Demo

[**You can view the live demo here**](https://www.google.com/search?q=https://your-live-demo-link.vercel.app) *(\<- Replace with your Vercel/Netlify link)*

-----

## ✨ Key Features & Implementation Highlights

This project meets all the core requirements and includes several optional and self-implemented features to enhance performance and user experience.

  * **Advanced Filtering & Sorting**: Includes robust client-side functionality for **pagination**, multi-criteria **sorting** (by name and rating), and **category filtering**.
  * **Performance First**: Built with performance in mind, incorporating several key optimizations:
      * **Lazy Loading** for images to reduce initial load time.
      * **Debouncing** on the search input to prevent excessive API calls or re-renders.
      * **Memoization** using the `useMemo` hook to avoid expensive re-calculations on every render.
      * **Skeleton Loaders** to provide an excellent user experience while data is being fetched.
  * **Multi-Language Support (i18n)**: Fully bilingual (English/Persian) using React's Context API. The application remembers the user's language preference via **localStorage**.
  * **Dark/Light Theme**: A theme switcher allows users to toggle between dark and light modes, with their preference saved in **localStorage**.
  * **Modular & Composable Code**: The application is built with a **component-based architecture**, ensuring that UI components are reusable, maintainable, and self-contained.
  * **Intelligent Search**: The search functionality performs a substring match, checking the **entire store name** for a query, not just from the beginning.
  * **Zero Vulnerabilities**: The project's dependencies have been audited and confirmed to have **0 vulnerabilities**, ensuring a secure and stable foundation.
  * **Fully Responsive Design**: The UI is optimized for a seamless experience across all devices, from mobile phones to desktops.

-----

## 🛠️ Tech Stack & Rationale

| Tool | Purpose |
| :--- | :--- |
| **Next.js (React)** | Chosen for its powerful features like file-based routing, server-side rendering capabilities, and built-in optimizations, which provide a great foundation for a fast and scalable application. |
| **TypeScript** | For adding static types to JavaScript, which improves code quality, maintainability, and developer experience by catching errors early. |
| **Material-UI (MUI)** | Selected for its rich library of pre-built, accessible, and customizable components. This allowed for the rapid development of a modern and responsive user interface. |
| **Jest & RTL** | Used for unit testing to ensure component reliability and logical correctness. |

-----

## 🏛️ Architectural Decisions

For this project, I adopted a **centralized state management** approach within the main `HomePage` component. This architecture is highly effective for this application's scale, where a single parent component manages the state for filtering, searching, and sorting, and passes data down to child components via props. This keeps the data flow predictable and easy to trace.

### Alternative for a Larger Project

For a larger, more complex application, I would evolve this architecture to use a **global state management library** like **Redux Toolkit** or **Zustand**.

  * **Why?** In a bigger project, passing state through many layers of components ("prop drilling") becomes cumbersome. A global state manager decouples state from the components, allowing any component to access or update the state directly without props. This makes the application more scalable, easier to maintain, and simplifies the logic within individual components.

-----

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ArefCheraghali/ae-store-project.git
    cd ae-store-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser** and navigate to `http://localhost:3000`.
