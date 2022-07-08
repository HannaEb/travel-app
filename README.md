# Travel Planner

## About

A travel planner that obtains a destination and travel dates from the user, and displays weather and an image of the location using information obtained from external APIs.

![](src/client/media/screenshot.png)

## APIs

- [Geonames](http://www.geonames.org/export/web-services.html)
- [Weatherbit](https://www.weatherbit.io/account/create)
- [Pixabay](https://pixabay.com/api/docs/)
- [Countries](https://restcountries.com/)

## Motivation

This project is part of [Udacity's Front End Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011).

## Installation Instructions

```
$ git clone https://github.com/HannaEb/travel-app.git
$ cd travel-app
$ npm install
$ npm run dev
$ npm run build
$ npm start
```

In the project's root folder, create a .env file with your personal API keys and the API URLs in the following format:

```
GEONAMES_KEY=YOUR_USERNAME
WEATHERBIT_KEY=YOUR_API_KEY
PIXABAY_KEY=YOUR_API_KEY
GEONAMES_URL=http://api.geonames.org/searchJSON?q=
WEATHERBIT_URL=http://api.weatherbit.io/v2.0/current?
PIXABAY_URL=https://pixabay.com/api/?
COUNTRIES_URL=https://restcountries.com/v3.1/alpha/
```

## Testing

Jest.

```
$ npm run test
```

## Author

HannaEb
