## This project is a solution to the given code challenge by Archimydes to me - Adetola Daniel

### Introduction

This project was bootstrapped with create-next-app and Chakra UI as the design framework

#### PLEASE NOTE:

Please set the node.js api server to listen at `localhost:5000` rather than localhost:3000. So it doesn't conflict with this development port and break the code .

I have already set the base url to `localhost:5000` (you can see/change that in the url.js file)

### To install:

- clone this repo
- run `yarn add` or `npm install` to install all necessary packages
- run `yarn dev` or `npm run dev` to start the development server

### Methods/Steps

#### 1. Theming

Chakra UI supports inline styling of components (sort of like how it's done in Tailwind CSS). Hence, there are no separate .css files.

For responsiveness, style values for different breakpoints are used in arrays. So if you see something like

`height={[200,300,400]}`

It simply means;

`@media(min-width: 576px){ height: 200px }`

`@media(min-width: 768px){ height: 300px }`

`@media(min-width: 991px){ height: 400px }`

#### 2. Utils

The two major utils here are the `withAuth` HOC and the `findInArray` helper function.

- The `withAuth` HOC is used on protected pages to check if the user already has a saved session on the app. If not, it will redirect the user to the `Login` page

- The `findInArray` helper function is used to find an object in an array with a unique identifier (usually an `id`). It accepts three parameters;
  The body(array), the group(specific object key to search from) and the query(the value that is being searched for)

#### 3. State Management

State management was implemented using Redux with Hooks
