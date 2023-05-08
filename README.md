# Weather-web-application
Application to show actual weather and forecast for specific city. To get access to the application the basic registration is needed.
After authentication user gets access to look for a specific city weather and creates own list of city he is interested in with actual weather and forecast for 3/7 days.<br/><br/>
Link to [https://weather-web-application-app.vercel.app/](https://weather-web-application-app.vercel.app/)

## Preview
![Gif of signing up to the application.]()

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
4. Create `.env` file.
