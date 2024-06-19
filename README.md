# The DKM blog frontend author

Welcome to the DKM blog Frontend AUthor repository, this is one of three parts of a full stack blog system including a front end user interface, a frontend author dashboard, both connected to an API backend endpoint, handling RESTful crud operations to a mongoDB database.

If interested, check out the other parts of the project

[DKM-blog-API-backend](https://github.com/DanishKodeMonkey/DKM-blog-backend), [DKM-blog-frontend-user](https://github.com/DanishKodeMonkey/DKM-blog-frontend-user)

This part of the project is focused on providing a seamless and intuitive interface for authors of the blog to create, edit and manage blog posts, users and comments.
Below are the information about this part of the project.

## Overview

The DKM blog Frontend Author part of the project is a react-based web application, designed to leverage the custom API backend system to connect the author to the database and perform nessecary CRUD operations on blog posts, and provides additional features like rich text editing, and post publishing.

## Features

-   **User Authentication**: Secure login and session management for authors.
-   **Rich text editing**: Utilize TinyMCE for a full-featured text editor
-   **Post Management**: Create, edit, delete and view blog posts.
-   **User management**: View, or delete users as needed

## Architecture

The project follows a modular architecture, ensuring seperation of concerns and enabling easy maintainability. It interacts with a RESTful backend API for data management and uses various libraries to enhance functionality.

### Components

-   **Authentication**: Handles user login and session management.
-   **Post management**: Ease to use API interaction endpoints to commence operations with the backend database.
-   **Comment management**: Additional management of comments, including viewing and deleting comments as needed
-   **User management**: View user details and delete as needed.

### State Management

The application makes rich use of React's context API and hooks for state management, providing a clean and effecient way to handle global state and side effects.

## Style

TailwindCSS has been used to leverage powerful CSS class rules to streamline the styling of the project.
