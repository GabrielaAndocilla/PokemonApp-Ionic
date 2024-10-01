
  # Pokedex App 📝
This app allows users to create their own Pokémon inspired by existing ones. Users can view existing Pokémon in a paginated table. To check the details, simply click "Read More" for each item, providing inspiration for your custom Pokémon creations. Users can create, edit, list, select favorites, search by name, and delete their custom Pokémon.

You could check the deployed app : https://pokedex-app.hakensoft.com

  ## Tech Stack 🚀
The project consists of two main parts: the backend and the frontend.

```css
├── api
│
└── ui
```
### Backend
The backend is built with `NodeJs` and `Express` to set up the server. It is configured to use `TypeScript` for type management throughout the application. Additionally, nodemon is utilized for development, allowing the server to restart automatically upon code changes.

For testing, `Jest` is configured to perform unit tests. Some folders will contain a __tests__ directory, where the tests are located. A few example tests have been included, but complete coverage has not yet been achieved.

#### Folder structure
The project architecture follows Domain-Driven Design (DDD):

```css
└── api
   ├───application
   │       └|── pokemon
   │        └── user
   ├─--domain
   │       └|── entities
   │        └── repositories
   └── infrastructure
       ├── controllers
       ├── db
       ├── middleware
       └── repositories
```

First lets talk about the domain:

In the `entities`, we have defined:

- Pokemons: The foundation of the app.
- Users: Individuals who will interact with Pokémon creation.
- Token: This entity manages authentication, tracking whether a token is active or inactive.

In the `repositories`, interfaces are defined to outline how the repository implementations will interact with the entities.

In the application folder, use cases define the actions the app can perform. Use cases call the repository implementations to execute the defined actions.

The infrastructure section contains the technical implementations necessary for the application, including repository implementations for persisting entities, controllers for managing HTTP requests, middleware for authentication validation, and database configurations. It helps maintain a separation of concerns between business logic and technical details.

### Front
For the frontend, it is developed using `Ionic` with `React`, and it is also configured with `TypeScript` for type management. Testing is conducted using `Vitest` and `react-testing-library`. Similar to the backend, example tests are provided to demonstrate how to test components, hooks, and pages, found in the `__tests__` folder. For styling, PandaCSS is used, and caching of requests in the app is handled with `React Query`.

Some features implemented without additional libraries include:

- **Pagination:**
The Pagination is set on the list of the PokeApi Page, in the route `/pokemons`
We take benefit of the api that comes with a totalItems, next , and previous page. With this we calculate the number of page based on a offset set when we call to this API.

- **Virtual List:**
The easy way for this will be to call a library to help us to manage virtual list, however a custom virtual list component has been implemented.
This component is responsible for rendering items based on scroll position, dynamically adjusting the rendered items to avoid rendering all at once. While libraries typically have optimized performance algorithms, creating a Virtual List from scratch involves significant work and understanding of how React manages rendering.

    This has been implemented in two sections:

      - In the Moves section of the Pokémon detail card from the PokeAPI.
      - In the list on the custom Pokémon page `/pokemon/all`.


Note:
The React Query implementation is separated into the hooks folder, where a hook is created for each action that requires interaction with data fetching. Example tests for these hooks are also provided.

#### Folder structure
For the projet architecture we mantain a classic react project structure
```css
└── ui
   ├── components
   ├─- context
   ├─- hooks
   ├─- models
   └── types
```
- **Components:** here will be the components, it must be as abstract as we can, to be able to modify them where they have been implemented. If we will increase in the components size it will be the best to follow and atomic design architecture. To see an example you can check one of my projects: [Atomic Design example](https://github.com/GabrielaAndocilla/sis_vacunacion/tree/master)
- **Context:** We create a context for the authentication, to manage this state in the app, without making a drop drilling.
- **Context:** Here you will find some reusable logic as :

  - hooks for the virtual list
  - hooks to fetch and cache data - react query
  - hook to persist data in local storage
- **Types:** you will find some types created for the app


## How to run the App's🔥
1. First let clone de code with `git clone git@github.com:GabrielaAndocilla/PokemonApp-Ionic.git`

###### Backend

2. Let's go to the folder api `cd api`
3. Create a `.env` on the root directory with this keys (Exmaple keys)
```
PORT=8081
SECRET_KEY=secret_key

USER_DB=root // User of the DB to access
PASSWORD_DB=password // passwordof your user
DATABASE_NAME=db_pokedex // name of th DB
HOST_DB=127.0.0.1
```
4. Run `npm install`
4. To run in dev mode `npm run dev`

To run test please execute `npm run test`

This is the script to create de DB
```
CREATE TABLE IF NOT EXISTS `pokemons` (
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  height VARCHAR(255) NOT NULL,
  user_id INT(11),
  is_favorite BOOL DEFAULT false,
  CONSTRAINT fk_user_pokemon FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `abilities` (
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ability_name VARCHAR(255) NOT NULL,
  pokemon_id INT(11),
  CONSTRAINT fk_pokemon_ability FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `moves` (
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  move_name VARCHAR(255) NOT NULL,
  pokemon_id INT(11),
  CONSTRAINT fk_pokemon_move FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `users` (
  id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE invalidated_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    invalidated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

###### Front

2. Let's go to the correct folder `cd ui/my-pokedex-app`
3. Create a `.env` on the root directory with this keys (Exmaple keys)
```
VITE_BACKEND_HOST=http://localhost:8081/api
VITE_POKE_API=https://pokeapi.co/api/v2/pokemon

```
4. Run `npm install`
5. To run in dev mode `npm run dev`

To run test please execute `npm run test.unit`


  ## What we could improve  ✨
- Increase test coverage to ensure all files are tested and edge cases are addressed.
- Implement Cypress tests for the frontend to validate the application comprehensively.
- Establish a CI/CD pipeline for deployments, facilitating automatic deployments whenever changes are made.
- Add Not Found Pages
- Add internationalization por the ui
- Create a logger to log, to understand if something doesn't work
- Moves some hard coded texts to a const files
