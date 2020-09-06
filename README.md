<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Netlify Status](https://api.netlify.com/api/v1/badges/ddeaf393-3831-4e27-a43f-bbd30bed518b/deploy-status)](https://app.netlify.com/sites/shopies-kanisk/deploys)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chakrakan/shopies/blob/react-ts/src/assets/shopies-logo-v5.png">
    <img src="images/logo.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">The Shopies</h3>

  <p align="center">
    Movie awards for entrepreneurs 
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Use Case scenario](#use-case-scenario)
  - [Foreward & tools utilized](#foreward--tools-utilized)
  - [Features](#features)
- [Running Locally](#running-locally)
  - [Option 1: Using Docker](#option-1-using-docker)
  - [Option 2: Clone + Setup + Run](#option-2-clone--setup--run)
- [Contact](#contact)
- [Resources and acknowledgements](#resources-and-acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project

Shopies is a project realized for Shopify's UI & Web Development Intern Challenge. 

> We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

> We'd like a simple to use interface that makes it easy to:
>  - Search OMDB and display the results (movies only)
>  - Add a movie from the search results to our nomination list
>  - View the list of films already nominated 
>  - Remove a nominee from the nomination list

The technical requirements for the above implementation were as follows:

- Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
- Each search result should list at least its title, year of release and a button to nominate that film.
- Updates to the search terms should update the result list
- Movies in search results can be added and removed from the nomination list.
- If a search result has already been nominated, disable its nominate button.
- Display a banner when the user has 5 nominations.

I treated the whole process of building the application from a usability perspective instead of just trying to cater to core functionality. You can find the Kan-ban board for the project [here]((https://github.com/chakrakan/shopies/projects).

### Use Case scenario

I envisioned a scenario where avid movie buffs at Shopify would use this app internally to nominate their picks for [Oscar season](https://en.wikipedia.org/wiki/Oscar_season), make predictions, and have an internal draw of the most popular/nominated movie title. Additionally, the more I read through documentation and blogs, it became clear to me that 

### Foreward & tools utilized

Coming from a background of primarily working with statically typed, compiled languages, I felt it was imperative to dive straight into what was to be expected of me at work if I were to join Shopify as an intern.


Upon reading various blogs by the web dev teams at Shopify, and as clearly stated on the [job posting](https://www.shopify.com/careers/developer-internships-data-science-internships-winter-2021-826aeb)

> Our Web Developers use modern technologies and frameworks like Typescript, React, GraphQL and Apollo to develop large front-end web applications that scale and perform well on all devices.

I decided to try and encompass as much of the aforementioned technologies as possible. Therefore this app uses:

* [Create React App](https://create-react-app.dev/) to bootstrap a [React](https://reactjs.org/) app with the [TypeScript](https://www.typescriptlang.org/) template
* [Apollo Client](https://github.com/apollographql/apollo-client) with [GraphQL](https://graphql.org/) for making queries and API requests to OMDB.
* [Husky, Prettier, Pretty-fast](https://prettier.io/docs/en/precommit.html) as a precommit hook to "prettify" staged files before commit to maintain code format consistency
  
For the UI, I initially thought of resorting to [Semantic UI](https://semantic-ui.com/) or [Ant Design](). But upon further reading, I found Shopify has their own design system - therefore, without hesitation, I utilized  [Polaris](https://polaris.shopify.com/) for the components and design for the application.

Every tool mentioned above was completely new for me - a lot hours spent sifting through documentation for this project and I must say, I thoroughly enjoyed the outcome, and came out of it learning A LOT in a short span of time!

<!-- Features -->
### Features

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<!-- GETTING STARTED -->
## Running Locally

Before getting started, ensure you have one of the following installed on your system:

* [Docker](https://www.docker.com/)  
or
* [NodeJS & npm](https://nodejs.org/en/)

### Option 1: Using Docker

If you have Docker and the cli tools installed, you can simply use the no hassle deployed [production image](https://hub.docker.com/repository/docker/chakrakan/shopies/general), produced using using the config files present within the repo:

1. Open up your terminal and type the following to pull the image
```sh
docker pull chakrakan/shopies:prod
```
2. Expose port 1337 to run the app on it using this command (`-it` interactive mode, `-rm` remove container once you're done running, `-p` flag for host:container ports)
```sh
docker run -it --rm -p 1337:80 chakrakan/shopies:prod
```
3. Visit `localhost:1337` to see the app served by NGINX web server

### Option 2: Clone + Setup + Run

1. Clone the repo and ensure you're in the default branch
```sh
git clone https://github.com/chakrakan/shopies.git
```
2. Install NPM packages
```sh
npm install
```
3. Create a `.env` file at the root of the project based on the `env.example` file provided in the repo and provide your OMDB API key
```
# Sign up and request a key at https://www.omdbapi.com/
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_BASE_API=https://www.omdbapi.com/
```
4. Start the development server using `npm start` and visit `localhost:3000` to see it running.



<!-- CONTACT -->
## Contact

Kanisk Chakraborty - [Linked-In](https://linkedin.com/in/kaniskc) - dev.kanisk@gmail.com

Project Link: [https://github.com/chakrakan/shopies](https://github.com/chakrakan/shopies) || Deployed Instance: [shopies-kanisk.netlify.app/](https://shopies-kanisk.netlify.app/)



<!-- ACKNOWLEDGEMENTS -->
## Resources and acknowledgements

In an attempt to not clutter the README, the full exhaustive list of resources used to build this app is avaiable in the project wiki.

* [Project Wiki](https://github.com/chakrakan/shopies/wiki)
* [@jharrilim](https://github.com/jharrilim) - for helping clarify my questions and concerns as I traversed new technology





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/chakrakan/shopies.svg?style=flat-square
[contributors-url]: https://github.com/chakrakan/shopies/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chakrakan/shopies.svg?style=flat-square
[forks-url]: https://github.com/chakrakan/shopies/network/members
[stars-shield]: https://img.shields.io/github/stars/chakrakan/shopies.svg?style=flat-square
[stars-url]: https://github.com/chakrakan/shopies/stargazers
[issues-shield]: https://img.shields.io/github/issues/chakrakan/shopies.svg?style=flat-square
[issues-url]: https://github.com/chakrakan/shopies/issues
[license-shield]: https://img.shields.io/github/license/chakrakan/shopies.svg?style=flat-square
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/kaniskc
[product-screenshot]: images/screenshot.png