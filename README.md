# Weather-web-application
Application to show actual weather and forecast for specific city. To get access to the application the basic registration is needed.
After authentication user gets access to look for a specific city weather and creates own list of city he is interested in with actual weather and forecast for 3 or 7 days.<br/><br/>
Link to [https://weather-web-application-app.vercel.app/](https://weather-web-application-app.vercel.app/)

## Preview
In application before looking for weather data user needs to sign up. After sign up user is relocates to the main page.
<br/>
<br/>

<p align="center">
<img src="/documents/preview/SIGNUP.gif" alt="Gif of signing up to the application." width=50% height=50%>
</p>
<br/>
Main page contains search bar for finding the city. User can types city manually or click the auto location button for finding city depending on the user's actual location. After finding the city user gets weather data, 7 days forecast, and air condition information. Also, a user from the Home page set the actual city to the list of user's cities or sets the city as the default city, which will be shown automatically after relocation to the Home page.
<br/>
<br/>

<p align="center">
<img src="/documents/preview/FIND.gif" alt="Gif of showing finding weather for specific city." width=50% height=50%>
</p>
<br/>
Cities page contains the user's city list, with actual weather data and short 3 days forecast.
<br/>
<br/>

<p align="center">
<img src="/documents/preview/CITIES.gif" alt="Gif of showing page with user's city list." width=50% height=50%>
</p>

## Project structure
Project application is splitted in to two sub-projects, frontend part (app) and backend part (api).

## Technologies
- Typescript
- Node.js
- Express
- Mongodb, Mongoose
- JWT for authentication, authorization
- React frontend library
- Unit & Integration testing with JEST testing framework and testing libraries
- testing e2e with Cypress
- Material UI
- Tanstack React Query library for optimized managing server state 
- Axios
- Vite
- Yarn package manager

## Instalation
After cloning the repository proceed in these steps:
1. Go to `app` directory, install and build all dependencies.
```cd app/
yarn install
yarn build
```
2. Create `.env` file. Copy and paste content from `.env.example`.
3. Chande direcotry to `api`, install and build all dependencies.
```cd api/
yarn install
yarn build
```
4. Create `.env` file. In this file define 4 variables, names can be taken from `.env.example` file. Those variables are:
- <b>PORT</b> = Port on which server is running.
- <b>MONGO_URI</b> = Connection string, URI for defining connections between applications and MongoDB instance.
- <b>WEATHER_API_KEY</b> = API key for accessing data from `weatherapi.com` API.
- <b>SECRET</b> = Secret key for JWT based authentication purposes.
