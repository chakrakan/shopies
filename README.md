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
  - [The Ingredients](#the-ingredients)
- [Running Locally](#running-locally)
  - [Option 1: Using Docker](#option-1-using-docker)
  - [Option 2: Clone + Setup + Run](#option-2-clone--setup--run)
- [Features](#features)
- [Contact](#contact)
- [Resources and acknowledgements](#resources-and-acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)




### The Ingredients

Coming from a background of primarily working with statically typed, compiled langauges like Java, C++ etc. I felt it was imperative to dive straight into what is to be expected of me at work if I were to join Shopify as an intern. Upon reading various blogs by the dev team at Shopify, and as clearly stated on the [job posting ](https://www.shopify.com/careers/developer-internships-data-science-internships-winter-2021-826aeb)

> Our Web Developers use modern technologies and frameworks like Typescript, React, GraphQL and Apollo to develop large front-end web applications that scale and perform well on all devices.

Hence, this application uses:

* [Create React App](https://create-react-app.dev/) to bootstrap a [React](https://reactjs.org/) app with the [TypeScript](https://www.typescriptlang.org/) template
* [Apollo Client](https://github.com/apollographql/apollo-client) with [GraphQL](https://graphql.org/) for making queries and API requests to OMDB.
  
Further, I initially thought of resorting to bootstrap or material UI for the design aspect, but 



<!-- GETTING STARTED -->
## Running Locally

Before getting started, ensure you have one of the following installed on your system:

* [Docker](https://www.docker.com/)  
or
* [NodeJS & npm](https://nodejs.org/en/)

### Option 1: Using Docker

If you have Docker installed, you can simply pull the no hassle [production image](https://hub.docker.com/repository/docker/chakrakan/shopies/general) directly from Docker Hub:

1. Pull the image
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


<!-- Features -->
## Features

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

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