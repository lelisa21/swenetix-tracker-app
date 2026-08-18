# Idea Tracker App - Technical Assessment

## Overview

This project provides a partially completed Idea Tracker application. The initial setup includes the basic UI components, project structure, and required configurations.

The goal of this task is to complete the missing functionality, identify existing issues, and improve the overall code quality.

---

## Required Functionalities

### Idea Management (CRUD)

Implement the following idea management features:

- Create a new idea
- View/list existing ideas
- Update an existing idea
- Delete an idea

---

## Authentication

The login UI has already been implemented. Your task is to:

- Connect the login flow with the backend authentication API
- Handle user authentication state
- Protect idea-related routes
- Ensure only authenticated users can access idea CRUD operations

---

Authentication Backend
-just implement JWT and Bcryptjs

## UI Improvements

- Update the login button styling using a styled system (Emotion)
- Ensure the styling follows the existing project structure and conventions

---

## Route Protection

The idea management routes should be protected:

- Unauthenticated users should not be able to access idea-related pages
- Authenticated users should be able to perform CRUD operations

---

## Code Review & Improvements

While working on the project:

- Identify any bad logic, bugs, or potential issues
- Refactor code where necessary
- Improve readability, maintainability, and overall code quality
- Follow React and TypeScript best practices

---

## Submission

Once completed:

- Push your changes to the repository
- Ensure the project can be installed and run successfully


    --bg:#0A0A0C;
    --bg-nav:#121216;
    --bg-surface:#1A1A22;
    --text-primary:#F8FAFC;
    --text-secondary:#94A3B8;
    --text-muted:#475569;
    --hover:#262630;
    --border:#3F3F46;
    --accent-gold:#C9974D;     /* brand warmth, CTAs, active states */
    --accent-gold-dim:#3A2E1C; /* gold at low opacity for fills */
    --accent-green:#34D399;    /* credit, ready status, vegan tag */
    --accent-red:#F87171;