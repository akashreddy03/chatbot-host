# ChatBot Host - Red Sky

A web app that provides an interface for users to interact with and test NLP ChatBots.

## Get Started

- Clone this repo

- Run the following command to install all the packages required

  ```bash
  npm i
  ```

- Provide the following required values in env.example file

  - MongoDB URI
  - Openai api key(which could be obtained from openai website by just signing up)
  - Nextauth secret(its a random value that could be generated using openssl)
  - Nextauth url(URL of the webite, if it is being run locally then use `localhost:3000`)

- Rename env.example as .env

- For a development server run
  ```bash
  npm run dev
  ```
- For production build run
  ```bash
  npm run build
  ```
  and then
  ```bash
  npm run start
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Frameworks/Libraries Used

- [Next.js](https://nextjs.org)
- [NextAuth](https://next-auth.js.org)
- [MongoDB](https://www.mongodb.com)
- [TailwindCSS](https://tailwindcss.com)
- [Socket.io](https://socket.io)
- [React Hook Form](https://react-hook-form.com)

## General Functionality

- Authenticate Users via JWT
- Register new users and authenticate existing users using NextAuth and MongoDB
- Connect with server via websockets using socket.io to communicate with a bot through API calls from the server(GPT-3 davinci model as in this case)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
