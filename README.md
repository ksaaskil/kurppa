# Havis

Havis on puheohjattu järjestelmä lintuhavaintojen kirjaamiseen. Havainnon voi kirjata äänisyötteellä kuten "kolme varista". Järjestelmä kirjaa havainnon lajin ("varis"), määrän (3), sijainnin ja kellonajan automaattisesti. Havainnot voi viedä ulkoisiin järjestelmiin kuten [Tiiraan](https://www.tiira.fi/) lataamalla havainnot tiedostona.

Havis is a system for collecting bird observations using natural language.

## Ominaisuudet

- Kirjaa havainto
- Katsele omia havaintoja
- Lataa havainnot tiedostona

## To do

- [x] Record speech
- [x] Transcribe speech (Whisper)
- [ ] Understand intent (ChatGPT)
- [ ] UI layout
- [ ] Deploy to cloud (Google Cloud Run + Pulumi)
- [ ] Authentication (Auth0)
- [ ] List of observations
- [ ] Use location

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install Node.js >= 20.

Create `.env` file based on the example in [`.env.sample`](./.env.sample).

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

See [`Dockerfile`](./Dockerfile).

```sh
docker build -t havis .
docker run -p 3000:3000 havis
```

## Cloud deployment

The folder [`pulumi`](./pulumi) contains an example deployment to Google Cloud managed with [Pulumi](https://www.pulumi.com/).

To deploy:

```sh
cd pulumi
pulumi preview
pulumi up
pulumi destroy
```
