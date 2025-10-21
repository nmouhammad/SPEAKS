<p align="center">
  <img src="src/assets/parrot.png" width="300" alt="logo"/>
</p>

# SPEAKS
[SPEAKS](https://github.com/nmouhammad/SPEAKS) is the standalone research prototype used in our paper:

**From Nervous to Noteworthy: Evaluating SPEAKS, an Educational Software for Speech Content**  

Nina Mouhammad, Jan Schneider, Roland Klemke and Daniele Di Mitri | 
24th European Conference on E-Learning | ECEL 2025 | [https://doi.org/10.34190/ecel.24.1.4104](https://doi.org/10.34190/ecel.24.1.4104)

You can test SPEAKS yourself [here](https://github.com/nmouhammad/SPEAKS). All data will only be saved on your machine.

SPEAKS has later been integrated into [Presentable](https://presentable.hytea.de/).

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Compile and Minify for Production](#compile-and-minify-for-production)
- [Coding Guidelines](#coding-guidelines)
    - [Documenting Vue Components](#documenting-vue-components)
    - [CSS Framework (Bootstrap)](#css-framework-bootstrap)
- [Project Structure](#project-structure)
- [Customizing Bootstrap](#customizing-bootstrap)
- [Citation](#citation)
- [Acknowledgements](#acknowledgements)

## Project overview
Preparing a speech can be challenging. SPEAKS is an educational application that guides students step by step through preparing their entire speech. With a friendly cockatoo character, users learn to consider their audience’s prior knowledge, define their main message, and craft an engaging introduction and conclusion.

In our [study](https://doi.org/10.34190/ecel.24.1.4104), participants reported that SPEAKS was easy to use and that its guidance-based approach was highly useful. Moreover, their confidence in delivering effective speeches increased significantly after using the application.

Contact person: [Nina Mouhammad](mailto:n.mouhammad@dipf.de)

You can test SPEAKS yourself [here](https://github.com/nmouhammad/SPEAKS). All data will only be saved on your machine.

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
### Vue
This project uses vue 3 and the composition API.

### Documenting vue components
This project uses [Vue Styleguidist](https://vue-styleguidist.github.io/) to document all vue components. The most important thing is to write a concise description for each prop, slot, event, method and component. [Here](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments) you can find more detailed instructions.

To update the documentation run:
```sh
npm run styleguide
```
which creates the documentation and starts a server where you can access the documentation.

### CSS Framework (Bootstrap)
This application uses [bootstrap](https://getbootstrap.com/) as css framework to enable building well-looking pages easily. If you are not familiar with bootstrap, check the [documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)


## Project Structure
The project is structured as a typical vue project. Here is an overview of the different folders and their content:

    .
    ├── .vscode
    ├── dist                            # Contains the compiled version that will 
    |                                   # be deployed
    ├── docs                            # Documentation generated with vue styleguidist
    ├── node_modules                    # Dependencies needed to build the project
    ├── public                          # Files that shouldn't be processed by vite 
    |                                     (e.g. html for static sites, large static 
    |                                      assets, favicon, SEO-related files (e.g. 
    |                                      robots.txt), custom error pages, ...)
    ├── src                             # Application code
    │   ├── assets/                     # Images, style sheets etc.
    |   ├── components/                 # Building blocks of the app
    |   ├── composables/                # Composables (reusable js code)
    |   ├── router/                     # Vue router (app navigation)
    |   ├── stores/                     # Pinia (state management)
    |   |   ├── MC/                     # message composition stores
    |   |   ├── rehearsal/              # rehearsal stores
    │   ├── views/                      # Components for different subpages
    |   |   ├── MC/                     # message composition views
    |   |   ├── rehearsal/              # rehearsal views
    │   ├── App.vue                     # Root component
    └── └── main.js                     # Renders app & mounts it to DOM


## Customizing Bootstrap
The standard bootstrap css framework can be customized (e.g. to change colors) by making changes in the file `src/assets/bootstrap-customisation/custom-styles.scss`. Documentation on how to customize can be found [here](https://getbootstrap.com/docs/5.3/customize/overview/). 

After each change, the `custom-styles.scss` needs to be compiled, this can be done by the following command (from the source folder of the project):
```sh
npx sass ./src/assets/bootstrap-customisation/custom-styles.scss ./src/assets/bootstrap-customisation/custom-styles.css
```

## Citation
Please use the following citation:

```bibtex
@article{Mouhammad25N,
  title      = {From Nervous to Noteworthy: Evaluating SPEAKS, an Educational Software for Speech Content},
  author     = {Mouhammad, Nina and Schneider, Jan and Klemke, Roland and Di Mitri, Daniele},
  year       = 2025,
  month      = oct,
  journal    = {European Conference on e-Learning},
  volume     = {24},
  number     = {1},
  pages      = {271--280},
  issn       = {2048-8645, 2048-8637},
  doi        = {10.34190/ecel.24.1.4104},
  urldate    = {2025-10-19},
}
```

## Acknowledgements
The authors gratefully acknowledge the support of the German Federal Ministry of Education and Research (BMBF) within the framework of the HyTea project (Grant "01|S22075A HyTea").
