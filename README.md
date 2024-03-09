# Havis

Havis is an easy-to-use system for collecting bird observations

## Features

- Input bird observations using natural language (powered by OpenAI)

## To do

- Record speech
- Transcribe speech (Whisper)
- Understand intent (ChatGPT)
- Deploy to cloud (Google Cloud Run + Pulumi)
- Authentication (Auth0)
- List of observations
- Use location

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install Node.js >= 20.

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Docker

See [`Dockerfile`](./Dockerfile).

```sh
docker build -t havis .
docker run -p 3000:3000 havis
```
