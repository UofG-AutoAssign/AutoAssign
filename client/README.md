# Front-end Notes
## Current front-end technologies:
> ### React, TypeScript, MobX, Tailwind CSS

## If you've just cloned the project
### Steps (Work in Progress)
1. `cd ./client`
2. `npm install`

## Useful Tutorials/Documentations
1. React/TypeScript
    > https://youtu.be/z8lDwLKthr8  
    > https://youtu.be/Z5iWr6Srsj8  
2. MobX
    > https://youtu.be/nGZCL6Wd_zQ  
3. Tailwind CSS
    > https://youtu.be/UBOj6rqRUME  
4. Other Documents
    > https://www.typescriptlang.org/docs/handbook/react.html  
    > https://tailwindcss.com/docs/utility-first  
    > https://nerdcave.com/tailwind-cheat-sheet  
    > https://mobx.js.org/README.html  


## Steps to generate a skeleton project with `React, TypeScript, Tailwind`

### Prerequisites
- Code editor of your choice (VSCode/Webstorm)
- Node.js
- NPM (Node Package Manager)
    > Installing Node.js + NPM: https://youtu.be/JcwHHpim-CY

### Generating a `React + TypeScript` skeleton project 
1. `npm install vite@latest`
1. `npm create vite@latest` then enter your project name
2. Navigate down to React -> TypeScript
3. `cd {your_project_name}`
4. `code .` (to open up VSCode in that directory)
5. `npm install`
6. `npm run dev` (to check if it works)


### Installing `Tailwind`
1. Install `PostCSS Language Support` extension on VSCode
1. `npm install -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init -p`
3. Your `tailwind.config.js` should look like this:
``` /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
4. Put 👇 in all .css files, since we're writing Tailwind CSS
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
5. If you're playing around with the skeleton and Tailwind doesn't seem to work — make sure to wipe all generated CSS from `App.css` and `Index.css`

### Recommended Extensions for VSCode 
- `HTML CSS Support`
- `ES7+ React/Redux/React-Native snippets`
- `JavaScript and TypeScript Nightly`
- `Tailwind CSS IntelliSense`
- `Path Intellisense`
- `Live Share`
- `Live Server`