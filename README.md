# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   npm install

3. Running the Code
   To start the development server with hot module replacement (HMR):
   npm run dev

4. Open your browser and navigate to http://localhost:5173 to see the application running.

5. Executing Tests
   We use Vitest and Cypress for testing.

6. Unit and Integration Tests
   To run unit and integration tests with Vitest:
   npm run test

7. End-to-End Tests
   To run end-to-end tests with Cypress:

   Open the Cypress Test Runner:
   npx cypress open

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
