<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chakrakan/shopies/">
    <img src="https://github.com/chakrakan/shopies/blob/react-ts/src/assets/shopies-logo-v5.png" alt="Logo" width="453" height="235">
  </a>


  <p align="center">
    <img alt="Netlify Deploy Status" src="https://api.netlify.com/api/v1/badges/ddeaf393-3831-4e27-a43f-bbd30bed518b/deploy-status">
    <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed-raw/chakrakan/shopies?style=flat-square">
    <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed-raw/chakrakan/shopies?style=flat-square">
    <a href="https://github.com/chakrakan/shopies/wiki">
    <img alt="Project Wiki" src="https://img.shields.io/badge/-project%20wiki-blue"></a>
    <a href="https://github.com/chakrakan/shopies/projects">
    <img alt="Kanban Board" src="https://img.shields.io/badge/-kanban%20board-orange"></a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [My Approach](#my-approach)
  - [Tools](#tools)
  - [Use Case Scenario & Features](#use-case-scenario--features)
  - [Core Functionality Implementation](#core-functionality-implementation)
  - [Extra Features Implementation](#extra-features-implementation)
- [Running Locally](#running-locally)
  - [Option 1: Using Docker](#option-1-using-docker)
  - [Option 2: Clone + Setup + Run](#option-2-clone--setup--run)
- [Contact](#contact)
- [Resources](#resources)


<!-- ABOUT THE PROJECT -->
## About The Project

Shopies is a project realized for Shopify's UI & Web Development Intern Challenge. 

**Challenge statement**

> We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

> We'd like a simple to use interface that makes it easy to:
>  - Search OMDB and display the results (movies only)
>  - Add a movie from the search results to our nomination list
>  - View the list of films already nominated 
>  - Remove a nominee from the nomination list

**Technical requirements**

> - Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).
> - Each search result should list at least its title, year of release and a button to nominate that film.
> - Updates to the search terms should update the result list
> - Movies in search results can be added and removed from the nomination list.
> - If a search result has already been nominated, disable its nominate button.
> - Display a banner when the user has 5 nominations.


## My Approach

The app, per se, is fairly simple with no complex moving parts which is why I treated the whole process of building it from a real-world usability perspective - thinking of why anyone would want such a tool and what use-cases/scenarios would such an app be beneficial in. 

Getting 5 nominations and having a banner display is cool - but **"what can we do further with this?"** was the question I seeked to answer with my process. 

With the direction in mind, I had to pick out my tools of the trade.

### Tools 

Coming from a background of primarily working with statically typed, compiled languages, I felt it was imperative to dive straight into what was to be expected of me at work if I were to join Shopify as an intern.

Upon reading various blogs by the web dev teams at Shopify, and as clearly stated on the job posting

> Our Web Developers use modern technologies and frameworks like Typescript, React, GraphQL and Apollo to develop large front-end web applications that scale and perform well on all devices.

I decided to try and encompass as much of the aforementioned technologies as possible. 

Therefore this app uses:

* [Create React App](https://create-react-app.dev/) to bootstrap a [React](https://reactjs.org/) app with the [TypeScript](https://www.typescriptlang.org/) template along with React Hooks and functional style of writing code
* [Apollo Client](https://github.com/apollographql/apollo-client) with [GraphQL](https://graphql.org/) for making queries and API requests to OMDB.
* [Husky, Prettier, Pretty-fast](https://prettier.io/docs/en/precommit.html) as a precommit hook to "prettify" staged files before commit to maintain code formatting and consistency
  
For the UI, I initially thought of resorting to [Semantic UI](https://semantic-ui.com/) or [Ant Design](https://ant.design/). But upon further reading, I found Shopify has their own design system called [Polaris](https://polaris.shopify.com/) and so, without hesitation, utilized it for the components and design for the application.

> Every tool mentioned above was completely new for me - a lot hours spent sifting through documentation for this project ([wiki](https://github.com/chakrakan/shopies/wiki)) and I must say, I thoroughly enjoyed the outcome, and came out of it learning A LOT in a short span of time!

With the tools at hand, I began refining the Use case scenario.

### Use Case Scenario & Features

As a movie buff myself, I envisioned a scenario where fellow movie buffs at Shopify would use this app as a "just for fun" tool internally to nominate their picks for [Oscar season](https://en.wikipedia.org/wiki/Oscar_season), and have a draw of the most popular/nominated movie title by the employees. 

This can be further used to dictate which movie gets played during movie-nights/social events (okay, it's a bit farfetched but bare with me 😅).

If not at Shopify, I also figured this could be a tool that users can, in general, pick nominations on, and then tally up the information somehow to create a consensus of sorts. 

With that in mind, I [documented](https://github.com/chakrakan/shopies/issues/9#issuecomment-685427514) which features users would find most useful, and also fell under the **scope** for this project. 

Additionally, the more I read through Shopify docs and blogs, it became clear to me that the company is truly passionate about **collaboration**, **enablement**, **engagement**, and **empowerment** - all of which resonated with my values and the direction I wanted to take this application with its features. 

So without much ado, here are the features I implemented keeping the aforementioned in mind...

### Core Functionality Implementation

- **debounced** Search function to optimize number of API calls made to fetch data as user types
- Apollo InMemoryCache utility to cache request data and images being fetched
- Banner upon 5 nominations + disable search bar and nomination buttons to prevent users from adding/searching more movies
- Have design adhere to the one provided in the instructions with the addition of a logo, simple animations, and toasts for notifications.

> ToDO: add gif of basic usage

### Extra Features Implementation

In line with **enablement** and **empowerment**, I wanted to ensure all aditional featuers are not forced onto the user and remain opt-in. The user has the flexibility to incorporate them as they perform core functionalities.

**Personalization** 

Who, what, why? 

Let's add some flare to the nominations list that you've personally curated. This is akin to making a Spotify playlist. You can then choose a `title` for the list, and add your `name` as a curator!

> ToDO: Personalization demo

**Sharing** 

With **collaboration** & **engagement** in mind, I wanted to make building nominations exactly that - a collaborative and engaging experience. 

With `share`, a user can build upon a list, add details if they want, and simply click `Share` to receive a link which they can further send out to others to collaborate on, or to simply provide an overview of their nominations. If collaborating, this can be chained by multiple users up until 5 total nominations are reached, so choose wisely!

> ToDO: Sharing demo

**Pinning**

Okay so you start working on a list but have an urgent meeting to tend to - no worries, simply pin the current state of the building process you're at, and it'll be there for you when you come back to the app! 

Or maybe John collaborated with Lisa to make that really cool list of movies you've always wanted to watch and you wanted maintain access to it - no problem, "pin that for the weekend dawg!"

**Downloading**

You're planning the next movie-night at Shopify but those lame mixed answer surveys and confusing slack polls ain't cutting it. What you _actually_ want to do is write up a script to read in people's nominations that they've gathered using this app and tally up the most popular nomination.

Pro-tip: To make your life easier, you can tell all the users to download their nominations directly from the app and send in the JSON files to you. 

💍 _One nomination to rule them all, one nomination to find_ the best movie for movie-night! 

> ToDO: Download demo

<!-- GETTING STARTED -->
## Running Locally

In order to run this app locally, ensure you have one of the following installed on your system:

* [Docker](https://www.docker.com/)  
or
* [NodeJS & npm](https://nodejs.org/en/)

### Option 1: Using Docker

If you have Docker and the cli tools installed, you can simply use the no hassle [production image](https://hub.docker.com/repository/docker/chakrakan/shopies/general), produced using using the config files present within the repo:

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

If you have any questions or concerns, or just want to say hi, you can find me using:

- [Linked-In](https://linkedin.com/in/kaniskc) 
- Email `dev.kanisk@gmail.com`
 
Check out the deployed project at [shopies-kanisk.netlify.app/](https://shopies-kanisk.netlify.app/)

<!-- ACKNOWLEDGEMENTS -->
## Resources

In an attempt to not clutter the README, the full exhaustive list of resources used to build this app is avaiable in the [Project Wiki](https://github.com/chakrakan/shopies/wiki). Also, shoutout to [@jharrilim](https://github.com/jharrilim) for helping clarify my questions and concerns as I traversed new technology.


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