# Insighta Web Portal

A secure data analytics dashboard built with Next.js and Tailwind CSS for the Insighta Labs internal teams.

## Overview
This repository serves as the frontend visual interface for the Insighta Labs application. It securely connects to the Insighta Backend API using GitHub OAuth tokens to visualize paginated user profile data in a clean, enterprise-grade data table.

## Features
- **Secure Authentication:** Two-step login process utilizing GitHub OAuth tokens.
- **Data Visualization:** Clean, responsive data table built with Tailwind CSS.
- **Pagination:** Server-side pagination controls for efficient database querying.
- **Modular Architecture:** Clean separation of API logic, TypeScript interfaces, and UI components.

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS (v4)
- Axios
- TypeScript

## Setup & Installation

1. Clone this repository to your local machine.
2. Navigate into the directory and install the dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`

## Usage

1. Open `http://localhost:3000` in your browser.
2. Click **"1. Get Token via GitHub"** to authenticate via the backend API (opens in a new tab).
3. Copy the generated `access_token` from the backend response.
4. Return to the portal, paste the token into the input field, and click **"Access Dashboard"**.
5. View and navigate through the paginated user profiles securely.