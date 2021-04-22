# Beer Game

---

## Table of Contents

<!-- TOC -->

- [Beer Game](#beer-game)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Software requirements](#software-requirements)
  - [Architecture](#architecture)
  - [Setup and Deployment](#setup-and-deployment)
    - [Setup backend](#setup-backend)
    - [Setup frontend](#setup-frontend)
  - [Tests](#tests)
    - [Run frontend tests](#run-frontend-tests)
    - [Run backend tests](#run-backend-tests)
  - [Documentation](#documentation)
    - [Generate frontend documentation](#generate-frontend-documentation)
    - [Generate backend documentation](#generate-backend-documentation)
  - [Individual contributions](#individual-contributions)
    - [Sprint 1 - 9/3/2021](#sprint-1---932021)

<!-- /TOC -->

# Introduction

This is the ReadMe.md for Sprint 01 Group 6 consisting of team members: Prashiddha Dhoj Thapa and Petri Gjoni.

Our main focus was to build the user interface and layout for the landing page. We decided to use React.js, along with styled-components for styling, because it is fast, scalable and simple. Furthermore, it also provides numerous packages to ease the process of web development. We have implemented the following packages: react-scroll, react-icon, and react-router-dom.

# Software Requirements

Software requirements have already been explained in first assignment but, again for convenience, a general overiew of our goal, what it offers and what it should also offer for the next sprint are:

- The user can either be a host or a player.
- A student is provided with a password from the host which they shall enter in the Log-In page for 'players'. They shall enter their display name and the password to join the respective beer game.
- The display name shouldn't contain special characters and doing so will throw an input error.
- A host can select one of the available games to spectate and is provided with the current game settings and live analytics.
- To host a game, the user must register an account using the Sign Up page.
- Once the game starts, the player screen is split up in 4 quadrants with each quadrant serving a specific purpose.
- The user will be able to access “What it is” and “How to Play” sections for additional information regarding the supply-chain game.

## Architecture

| Component      | Implementation        |
| -------------- | --------------------- |
| Database       | MySQL                 |
| Backend        | Python with Django    |
| Frontend       | React.js              |
| Communication  | REST API architecture |
| Authentication | JSON Web Tokens (JWT) |

# Setup and Deployment

### Setup backend

- Make sure you have python and python3-venv installed
- Create a virtual environment using `venv` module. Activate the virtual environment and install the requirements for the backend.

````bash
python3 -m venv myenv
source myenv/bin/activate
pip install wheel                           # Compatibility issues might arise
pip install -r requirements.txt

- Update database credentials inside of `backend/backend/settings.py` (inside the DATABASE part) (or create new user and corresponding database)

- Change into the `backend` directory. Make migrations and migrate changes to the database. Run the backend.

```bash
cd backend
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
````

### Setup frontend

- Download Node.js from the official [website](https://nodejs.org/en/).
- This should automatically also install the node package manager (npm) and node package execute (npx).

- Change into the `frontend` directory. Install the required packages.

````bash
cd client
npm install --legacy-peer-deps --include=dev

- Run the frontend.

```bash
npm run start
````


## Tests

### Run frontend tests

Change into the `frontend` directory. Run the testing script.

```bash
cd client
npm run test
```

### Run backend tests

Testing has not yet been implemented for the backend.

---

## Documentation

### Generate frontend documentation

Change into the `frontend` directory. Run the documentation script.

```bash
cd client
npm run doc
```

Documentation can then be found at `client/docs/index.html`.

### Generate backend documentation

Change into the `backend` directory. Run the backend.

```bash
cd server
python3 manage.py runserver
```

The backend API documentation is served at endpoint `api/swagger/`.


# Individual contribution

## Sprint 1

Prashiddha Dhoj Thapa : The main page + README + documentation(JsDocs, found inside the source files)

Petri Gjoni : Login/Signup page + README + unit testing using enzyme

## Sprint 2
Parts of the code was reused from the code of our members' in previous sprint and adapted. 

Tuan Pham and Mario Alberto Hernandez Salamanca

- Frontend:
	- Implemented authentication and state updating logic for authorized users
	-Connecting with the backend, making API calls
   - Make signup and login work. However, due to time limit, we have not implemented the profile page and hence it is now routing us to / if the API request is succesful
- Backend:
	- Created User Models for classes described in the UML Class Diagram (Player, Instructor)
	- Implemented custom user manager to authenticate user with email address
	- Created serializers for models, user sign up and log in
	- Implemented unauthenticated views (User Sign Up, User Log In)
	- Setup test suites for Users, Instructors, Players, Games, Demand Patterns APIs (will be implemented in the future)
	- Created REST API endpoint for retrieving data (api/)
	- Created REST API endpoints for registration and authentication (api/users/signup/, api/users/login/)
	- Implemented logic to authenticate users with JSON Web Tokens (access and refresh tokens)
	- Created REST API endpoints for obtaining and refreshing JWTs (api/token/obtain/, api/token/refresh/)
    - Implemented basic API documentation using drf-yasg (api/swagger/)
- Test:
	- Since we had problems with the test.py we developed test using postman https://www.postman.com/avionics-geoscientist-15330024/workspace/sprint02
	
Due to time limit, we have only developed basic testing with few test cases for the components mentioned above. UI test cases and routing test cases are complex and can not be correctly tested without prior unification of both backend and frontend communication.


# End User Documentation

As stated previously, our main focus was to implement a **_user-friendly interface_** with a somewhat **_minimalisitc_** design. The landing page consists of a Hero background video, to grab the attension of the user, with a brief introduction and a navigation button to start playing. The start playing button directs the user to the 'Player' Login page where they can enter their display name and the password, for a game session, provided by the host. The landing page also consists of a navigation bar with links to the following sections: What It Is, How To Play, Customizing Games, and Example Settings along with Host a Game button. To keep everything simple and clean, we have decided to implement minimal number of pages. Consequently, the sections on the navigation bar have been implemented on the landing page itself which act as a general information container.

**What It Is**:
Contains information on what the game is about and it's goal. A link to a detailed information page on the game will be provided after it's implementation.

**How To Play**:
Contains information on log in feature and how to join a game. Also, contains a navigation button to the Sign In page for convenience.

**Customizing Games**:
Conatins general information about the available settings and other features such as live analytics to the Host.

**Example Settings**:
Shows the user some examples of settings that they can configure as a Host.

Again, going with the theme of user-friendliness, all of the informations have been provided with a illustrative svg to futher establish the feel of minimalism. All of the buttons have active property which, if hovered over, changes their color. To make switching pages effortless, we have implemented react-router. Also, the navigation bar has scrollspy implemented which automatically updates links in a navigation list based on the current scroll position. Furthermore, when a section on the nav bar is clicked, the website smoothly scrolls to the section. All of the pages currently implemented have a beer-case logo which scrolls the page to the top (if on home page) and directs to the home page (if on other page). There are many active elements on the website to keep the user engaged.

Individual login pages for Host and Player has been implemented since the only fixed login property for player is the password while the Host has fixed username and password. The Host a Game navigation button directs the user to Sign Up page which also consists of a navigation link to the 'Host' Sign In page (Already have an account?) on the Sign Up box. Finally, we have also implemented a Footer on the bottom of the landing page with sample links since we don't have enough pages implemented.

## Sprint 3
- Frontend
	- Created Game Settings page, where instructor can change the settings of the game
	- Created Costumizing Game page, where user can read about the changes they can do
	- Created Learn More page, where user can read how the game is played
	- Created Game page, where user can play the game
	- Improved Sign In page 
	- Fixed testing from the previous sprints for the following pages (since they were failing before): 
		- configuration 
		-  Hero Section 
	- Implemented testing for the following pages:
		- GameSettings
		- CostumizingGames
		- LearnMore
	- Fixed Sign Up page

