<p align="center">A Full stack Project by Dean Ukanah</p>
<p align="center">
<a href="https://vitejs.dev" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff" alt="NPM Version" /></a>
<a href="https://react.dev" target="_blank"><img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" alt="NPM Version" /></a>
<a href="https://tailwindcss.com" target="_blank"><img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" alt="NPM Version" /></a>
<a href="https://reactrouter.com" target="_blank"><img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white" alt="NPM Version" /></a>
<a href="https://tanstack.com/query/latest/docs/framework/react/overview" target="_blank"><img src="https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff" alt="NPM Version" /></a>
<a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/Nest.js-%23E0234E.svg?logo=nestjs&logoColor=white" alt="NPM Version" /></a>
<a href="https://nodejs.org/en" target="_blank"><img src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" alt="NPM Version" /></a>
</p>

## Client package.

### Description
Client Package is a React Vite Project. It makes use of tools like Tailwind CSS, React-query, React useContext and others

### Installation

```bash
$ cd client
$ npm install
```

### Running the app

```bash
# development
$ npm run dev

# buid mode
$ npm run build
```

### Linting and Formatting
```bash
# lint
$ npm run lint

# prettier format
$ npm run format
```

#### Note: To run the application you are to copy the variables in .env.example to a new .env file in the client folder.

## Server package

### Description
Server Package is a NestJS Project. NestJS is a progressive framework for building efficient and scalable server-side applications.

### Installation
```bash
$ cd server
$ npm install
```

### Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### To run the server in development mode the environment variables in .env.example should be put in a new .env file and assign the respective values.

#### Note: To deploy the server on production you are to set update the domain attribute on the environment to the necessary domain name.