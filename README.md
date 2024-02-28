<p align="center">
  <img src="src/assets/logo-presentable-v2.png" width="300" alt="logo"/>
</p>

# Presentable Client (Vue)
Client of "Presentable" (Vue version).

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Compile and Minify for Production](#compile-and-minify-for-production)
- [Coding Guidelines](#coding-guidelines)
- [Project Structure](#project-structure)

## Getting started
### Prerequisites
Before you begin, ensure you have Node.js and npm installed on your machine ([Click here to download & install Node.js](https://nodejs.org/))

We recommend to use
[VSCode](https://code.visualstudio.com/) with the extension [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Installation of the project
1) Clone the repository: 
```sh
git clone https://gitlab.educs-hosting.net/hytea/presentable-client-vue
```

2) Navigate into the project directory
```sh
cd presentable-client-vue
```

3) Install dependencies
```sh
npm install
```

4) Set up ESLint and Prettier
- For VS Code users:
    - Install the extensions [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Open the workspace settings.json (File > Preferences > Settings > Workspace, on the top right click on the "file"-symbol with an arrow (text on hover: "Open Settings (JSON)")) and add the following configuration:
    ```json
    {
        "editor.codeActionsOnSave": {

            "source.fixAll.eslint": true
        },
        "[vue]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnSave": true
        },
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnSave": true
        },
        "[css]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnSave": true
        },
        "[html]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.formatOnSave": true
        },
        "eslint.codeActionsOnSave.rules": null
    }
    ```
- For other editors:
    - Integrate ESLint and Prettier according to your editor's documentation.

### Running the project
To run the project locally, use the following command in the project directory:

```sh
npm run dev
```
This will start a development server. Its URL will be logged in the terminal after running `npm run serve`. You can view the application by opening this URL in your browser. When you change the source files, the application will automatically be updated.

### Compile and Minify for Production
To compile and minify the project for production run the following command in the project directory:
```sh
npm run build
```
This command compiles the project and generates a dist directory containing the production-ready assets (HTML, CSS, JavaScript).

*Please test the output before deploying it.*

## Coding Guidelines
### Documenting vue components
This project uses [vuese](https://vuese.github.io/website/cli/) to document all vue components. The most important thing is to write a concise description for each prop, slot, event, method and component. You can do this by adding a comment before the corresponding prop, slot, etc. [Here](https://vuese.github.io/website/cli/#writing-documentation-for-your-component) you can find more detailed instructions.

To update the documentation run:
```sh
npx vuese gen
```

To then view the documentation run:
```sh
npx vuese serve --open
```
which starts and opens a server where you can access the documentation.


## Project Structure
The project is structured as a typical vue project. Here is an overview of the different folders and their content:

    .
    ├── .vscode
    ├── dist                            # Contains the compiled version that will 
    |                                   # be deployed
    ├── node_modules                    # Dependencies needed to build the project
    ├── public                          # Files that shouldn't be processed by vite 
    |                                     (e.g. html for static sites, large static 
    |                                      assets, favicon, SEO-related files (e.g. 
    |                                      robots.txt), custom error pages, ...)
    ├── src                             # Application code
    │   ├── assets/                     # Images, style sheets etc.
    |   ├── components/                 # Building blocks of the app
    |   ├── router/                     # Vue router (app navigation)
    |   ├── stores/                     # Pinia (state management)
    │   ├── views/                      # Components for different subpages
    │   ├── App.vue                     # Root component
    │   └── main.js                     # Renders app & mounts it to DOM
    └── vuese-documentation             # Documentation generated with vuese
