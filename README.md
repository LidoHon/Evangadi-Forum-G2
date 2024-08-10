# Evangadi Forum

Welcome to the **Evangadi Forum** project! This is a community-driven forum application designed to facilitate discussions and sharing of ideas. The project incorporates modern technologies and practices to deliver a robust and scalable forum experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Evangadi Forum is an interactive platform that allows users to ask questions, provide answers, and engage in discussions. It includes functionalities for user registration, login, profile management, and forum interaction. The project aims to create a user-friendly and efficient environment for community engagement.

## Technologies Used

This project utilizes a variety of technologies to ensure a seamless user experience and robust functionality:

- **Frontend:**

  - **React:** A JavaScript library for building user interfaces.
  - **Vite:** A build tool for faster development and bundling.
  - **Tailwind CSS:** A utility-first CSS framework for styling.
  - **React Router:** For handling routing within the application.
  - **Ant Design (antd):** A design system for React.
  - **Axios:** For making HTTP requests.
  - **React Toastify:** For displaying notifications.
  - **@mui/material** and **@mui/icons-material:** For additional UI components.

- **Backend:**

  - **Node.js:** JavaScript runtime environment for server-side development.
  - **Express:** Web framework for Node.js, used for building the API.
  - **MySQL:** Relational database for storing forum data.
  - **Cookie-Parser:** Middleware for handling cookies.
  - **JWT (JSON Web Token):** For authentication and authorization.
  - **Bcrypt:** For password hashing.
  - **dotenv:** For managing environment variables.
  - **Concurrently:** For running multiple npm scripts concurrently.
  - **Nodemon:** For automatically restarting the server during development.

- **Development Tools:**
  - **VS Code:** Used for development.
  - **Gitpod:** For running and developing the project in an online environment.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Profile Management:** Users can update their profiles and manage settings.
- **Question and Answer System:** Users can ask questions, provide answers, and interact with posts.
- **Responsive Design:** Ensures compatibility with various devices and screen sizes.
- **Notifications:** Real-time notifications for user interactions.

## Installation

To get started with the Evangadi Forum project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/LidoHon/Evangadi-Forum-G2.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd evangadi-forum
   ```

3. **Install Dependencies:**

   - For the Backend:

     ```bash
     npm install
     ```

   - For the Frontend:

     ```bash
     cd ../client
     npm install
     ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the `server` directory and add the required environment variables:

   ```plaintext
   DB_USER= <>
   DB_PASSWORD= <>
   DB_NAME=<>
   JWT_SECRET=<>
   ```

## Run the Development Server

From the root directory, start both the frontend and backend:

```bash
npm run dev
```

The application will be accessible at [http://localhost:5173](http://localhost:5173).

## Usage

- **Register:** Create an account to start using the forum.
- **Login:** Access your account and manage your profile.
- **Ask Questions:** Post questions and engage with the community.
- **Answer Questions:** Provide answers and participate in discussions.

## Contributing

We welcome contributions to the Evangadi Forum project. If you would like to contribute, please follow these guidelines:

1. **Fork the Repository:**

   Click the "Fork" button on GitHub to create your own copy of the repository.

2. **Create a New Branch:**

   ```bash
   git checkout -b feature-branch
   ```

3. **Make Your Changes:**

   Implement your changes and ensure they work as expected.

4. **Submit a Pull Request:**

   Push your changes to your forked repository and open a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
