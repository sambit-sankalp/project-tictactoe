
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br />
<p align="center">
  <a href="https://github.com/sambit-sankalp/project-tictactoe">
    <img src="https://papergames.io/en/assets/games/tictactoe/thumbnail.png" alt="Logo" width="130">
  </a>

  <h3 align="center">Tic Tac Toe</h3>

  <p align="center">
    The repository for the Asynchronous Tic Tac Toe Game
    <br />
    <a href="https://project-sam-tictactoe.vercel.app/">View Live</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      </ul>
        <li><a href="#built-with">Built With</a></li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
    <li><a href="#problems-faced">Problems Faced</a></li>
    <li><a href="#contributors-">Contributors</a></li>
  </ol>
</details>

## About The Project

An asynchronous version of the tic-tac-toe game would allow players to take their turns at different times, rather than having to be present and play the game in real-time. This can be useful if the players are not able to be present at the same time, or if they prefer to take their time making their moves.

To implement an asynchronous tic-tac-toe game, you would need a way for the players to take their turns and for the game state to be updated and stored after each move. This could be done using a server-client architecture, where the server stores the game state and communicates with the clients (the players' devices) to update the game state and send notifications when it is a player's turn. The clients could be web or mobile applications that allow the players to make their moves and view the current game state.

## Built With

Following technologies and libraries are used for the development of this website
  
### Frontend
- [React](https://reactjs.org/) : Used for building the interfaces for the project due to various features like reusable components etc.
- [Axios](https://axios-http.com/docs/intro) : Used on the client side so that data can be fetched using APIs.
- [Redux Toolkit](https://redux-toolkit.js.org/) : Used for managing the state of the game and players in the project.
- [TailwindCSS](https://tailwindcss.com/) : Used for adding CSS to the pages of the website.

### Backend
- [Node and Express](https://nodejs.org/en/) : Used to introduce APIs in the project so that clients can interact with the backend.
- [MongoDB](https://www.mongodb.com/home) : Used as a database to store data of player details and games in the project given or updated by the user.

## Getting Started

To setup the project locally the steps below.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)

  ```sh
  # Homebrew
  brew install nodejs

  # Sudo apt
  sudo apt install nodejs

  # Packman
  pacman -S nodejs

  # Module Install
  dnf module install nodejs:<stream> # stream is the version

  # Windows (chocolaty)
  cinst nodejs.install

  ```

- [Git](https://git-scm.com/downloads)

```sh
  # Homebrew
  brew install git

  # Sudo apt
  apt-get install git

  # Packman
  pacman -S git

  # Module Install (Fedora)
  dnf install git

```


### Running the project.

The project uses YARN. It is strictly advised to stick with NPM so as to avoid dependency conflicts down the line.

```
## Install Dependencies
yarn install

## Run the Project
yarn run start

```

Following are the commands to remove/add new dependencies using yarn

```
## Add a new Package
yarn add <package-name>

## Remove an existing Package
yarn remove <package-name>

## Save Package as a Dev Dependency
yarn add <package-name> -D
```

## Problems Faced

* Algorithms: To decide the correct algorithm to define the functionality of the Game.
* Debugging: To debug the code when the task is not performed correctly or a bug is encountered while the game is running.
* Managing States: Managing the states of the game at various point of the game using Redux.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/sambit-sankalp"><img src="https://avatars.githubusercontent.com/u/82284130?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sambit Sankalp</b></sub></a><br /><a href="https://github.com/sambit-sankalp/project-tictactoe/commits?author=sambit-sankalp" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
