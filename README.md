# YouVet Assignment - React Celebrity App

This project is a React application that displays information about celebrities. It includes features such as viewing celebrity details, searching for celebrities, and more.

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [File Usage](#file-usage)
4. [Running the Project](#running-the-project)
5. [Building for Production](#building-for-production)


## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

```shellscript
git clone https://github.com/yourusername/react-celebrity-app.git
cd react-celebrity-app
```


2. **Install dependencies:**

```shellscript
npm install
```




## Project Structure

The project structure is as follows:

```plaintext
react-celebrity-app/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   ├── dummyData/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── Accordion/
│   │   ├── Inputs/
│   │   ├── ListView/
│   │   ├── Modal/
│   │   ├── Select/
│   │   └── App.tsx
│   ├── types/
│   ├── utils/
│   └── main.tsx
├── package.json
└── README.md
```

## File Usage

### `src/assets/`

Contains static assets used in the project.

- `css/`: Contains CSS files for styling the application.

- `App.css`: Styles specific to the App component.
- `index.css`: Global styles for the application.


- `dummyData/celebrities.json`: Contains dummy data for celebrities.


### `src/components/`

Contains reusable React components used throughout the project.

- `Accordion/index.tsx`: Accordion component for expandable content.
- `Inputs/index.tsx`: Input components for forms.
- `ListView/page.tsx`: List view component to display a list of celebrities.
- `Modal/index.tsx`: Modal component for pop-up dialogs.
- `Select/index.tsx`: Select component for dropdowns.
- `App.tsx`: Main App component.


### `src/types/`

Contains TypeScript type definitions.

- `index.tsx`: Type definitions for the application.


### `src/utils/`

Contains utility functions and helpers used across the project.

- `getBirthDate.tsx`: Utility function to get the birth date of a celebrity.


### `src/main.tsx`

Entry point of the application.

### `package.json`

Contains project metadata and dependencies.

### `README.md`

The documentation file you are currently reading.

## Running the Project

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Building for Production

To build the project for production, use the following command:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory. To start the production server, use:

```bash
npm start
```

This will start the server on `http://localhost:3000`.
