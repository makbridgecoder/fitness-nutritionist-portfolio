# TrainWise – Fitness & Nutrition Website

Responsive multi-page fitness and nutrition website built as a portfolio project to simulate a real client-facing application.

## 🔗 Live Demo

🔗 Live Demo: https://trainwise.netlify.app

💻 Source Code: https://github.com/makbridgecoder/fitness-nutritionist-portfolio

## Overview

TrainWise is a multi-page website for a fictional fitness and nutrition business.

The project was created to practice front-end development in a realistic environment, with a focus on responsive layouts, JavaScript application logic, reusable functions, localStorage, debugging, Git workflow, and project organization.

A major part of the project is the shop and basket functionality implemented with vanilla JavaScript.

## Tech Stack

- HTML5

- CSS3 

- JaveScript ES6+

- ES Modules

- LocalStorage

- Flexbox

- Responsive Web Design

- Google Fonts

- Font Awesome

- Git & GitHub

- Netlify 

## Features

### Responsive multi-page website

- Responsive layouts for desktop and mobile devices

- Shared navigation and footer styling

- Mobile hamburger navigation

- Multiple website sections including shop, about, cooperation, calculator, blog and contact pages

### Shopping basket

- Add products to the basket

- Prevent duplicated product entries

- Increase product quantity when an existing product is added again

- Increase and decrease quantities directly from the basket

- Remove products from the basket

- Dynamically calculate product subtotals

- Calculate total and final basket price

- Update basket values after user actions

### LocalStorage

Basket data is saved in localStorage, allowing products and quantities to remain available after refreshing the page or navigating between subpages.

### Shared JaveScript logic

Reusable functions are separated into shared modules such as helpers.js.
Shared functionality includes:

- retrieving basket data from localStorage

- rendering the basket counter

- finding product by ID

- updating quantities

- calculating total price

- rendering calculated basket values

### Basket counter

The basket counter is available across multiple subpages and updates according to the current basket state.



## Project Structure

fitness-nutritionist-portfolio/
├── index.html
├── pages/
├── styles/
├── images/
├── icons/
├── scripts/
    ├── helpers.js
    ├── shop.js
    ├── basket.js
    ├── ...
└── README.md

## What I Practiced

This project helped me develop practical experience with:

- DOM manipulation

- event listeners

- arrays and objects

- array methods such as find(), findIndex(), filter() and forEach()

- localStorage

- ES Modules

- imports and exports

- dynamic DOM rendering

- application state management

- calculating derived values such as subtotal and total price

- debugging with browser DevTools

- working with relative paths

- organizing shared and page-specific JavaScript

- Git branches, commits and merge workflow

- refactoring existing functionality


## Future Improvements

- Add JavaScript interactivity

- Implement mobile navigation toggle

- Accessibility enhancements

- Performance optimizations

- Component refactoring

## Development Process

TrainWise was developed incrementally.

The project initially focused on HTML, CSS and responsive layout. JavaScript functionality was then introduced step by step, including navigation, product management, basket state, quantity controls and price calculations.

During development, I also refactored duplicated logic into reusable helper functions and used browser DevTools to debug issues related to DOM elements, localStorage and application state.


## Author

Piotr Makuch
Aspiring Front-End Developer transitioning from civil engineering.

GitHub: https://github.com/makbridgecoder