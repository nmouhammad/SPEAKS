# Presentable Client (Vue)
Client of "Presentable" (Vue version).

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)

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
    - Open settings.json (File > Preferences > Settings) and add the following configuration:
    ```json
    {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "editor.formatOnSave": true
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

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```