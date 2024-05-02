This is a quite basic project management tool built with Next.js.
No database used here, worked with JSON file mock data and file systems using "NEXT.js API ROUTES".
I focused on the functionality more than styling.

---

## Setup Instructions and CLI

- git clone "repo_ssh or https",
- cd "repo name"
- create an .env file, and add BASE_URL=http://localhost:3000
- npm install / yarn install
- npm run dev / yarn dev

---

## Core Functionalities:

- User Registration and Login (Naive Auth process, nothing related to API security)

- Project Listing, new Project creation, existing Project Editable and can be DELETED. (SERVER SIDE RENDERING used for Project Listing)

- Tasks can be Added to a project, Existing Tasks can be sorted using Drag and Drop, we can also use Drag and drop to change task status. ZUSTAND is used for maintaining state.

- Existing Tasks can be DELETED and UPDATED, tasks can be assigned to Team members.

- Task filer functionalities, used Zustand to manage and update states after filtering. Filtering criteria's [Filter by Status, Filter by Assignee, Filter by Due Time and Search by Task Name]

- Member listing. (Used SERVER SIDE RENDERING for these)

---

## Project Architecture and Folder Structure

- I have used --src-- directory in the root to organize my folders and files.

- Used the --LATEST App Router-- of Next.js for all kind of routing inside the application.

- Used Two different --ROUTE GROUPS-- for well described and consistent layout. One is AuthLayout and the other one is main AppLayout, and the other one is Root Layout, all the obvious resources are imported in the Root Layout inside which is used application wide.

- I have a declared a dedicated --providers.tsx-- inside the root app directory file to organize all the context providers for the application so that my base layout file doesn't get too much cluttered.

- Used --API Routes-- for mocking the REST API's which just reads and writes. Tried to maintain consisment naming patterns.

- Inside the --src-- directory, I have defined a dedicated --components-- subdirectory, here I have organized the components that are closely shared and used inside the same page.

- Inside --src-- directory, I have defined a layout subdirectory which has all my frontend layout, currently I have only one as it's a really small application.

- I have a --src/server/actions-- directory which contains all my barebone API calls bundled with axios, and all these are utilizing my server.

- Inside my --src/store-- directory it contains all my Zustand stores.

- Though NEXT.js kept the styles inside the app directory, but I personally think it's good to have all my styles under one hood, that's why I used a style subdirectory inside my root directory.

- src/types directory is the vault of my declared types which is used throughout the application development, I tried to keep it as Type Safe as possible.

- And the other configurations files for the project in the root directory.

- Public folder has my mock JSON files.

## Routes

BASE_URL/auth/register
BASE_URL/auth/login
BASE_URL/members
BASE_URL/
BASE_URL/project/{id}

## Packages and their Purposes

- Next.js
- TypeScript
- Ant Design
- React beautiful DnD [For Drag and Drop Functionality]
- axios
- React query
- Zustand
- Tailwind CSS for utilities
- React Icons
- Prettier Plugin for Tailwind CSS [ For class sorting and avoiding class duplication ]
