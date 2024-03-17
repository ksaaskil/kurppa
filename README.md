# Havis

Havis on puheohjattu järjestelmä lintuhavaintojen kirjaamiseen. Havainnon voi kirjata äänisyötteellä kuten "kolme varista". Järjestelmä kirjaa havainnon lajin ("varis"), määrän (3), sijainnin ja kellonajan automaattisesti. Havainnot voi viedä ulkoisiin järjestelmiin kuten [Tiiraan](https://www.tiira.fi/) lataamalla havainnot tiedostona.

Havis is a system for collecting bird observations using natural language.

## Ominaisuudet

- Kirjaa havainto
- Katsele omia havaintoja
- Lataa havainnot tiedostona

## Usein kysytyt kysymykset

### Miksi ei Muuttolintujen kevät?

Muuttolintujen kevät on sovellus lintuäänien nauhoittamiseen ja tunnistamiseen. Havis käyttää äänitunnistusta käyttäjän puhesyötteen tunnistamiseen.

### Miksi ei Tiira tai Tiira Mobile?

Havaintojen syöttäminen Tiiraan on työlästä erityisesti linturetken aikana. Haviksen avulla havainnot voi kerätä talteen jo retkellä ja siirtää myöhemmin Tiiraan.

## To do

- [x] Record speech
- [x] Transcribe speech (Whisper)
  - [x] Validate input
- [x] Understand intent (ChatGPT)
  - [] Validate species
- [ ] UI layout
  - [x] Theme
- [ ] Deploy to cloud (Google Cloud Run + Pulumi)
- [ ] Authentication (Auth0)
- [ ] List of observations
- [ ] Use location

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Stack also includes:

- [Daisy UI](https://daisyui.com/)
- [OpenAI speech-to-text](https://platform.openai.com/docs/guides/speech-to-text)
- [OpenAI text generation](https://platform.openai.com/docs/guides/text-generation) to parse user input from natural language to structured format

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
docker run -p 3000:3000 --env-file .env havis
```

## Cloud deployment

### Pulumi

The folder [`pulumi`](./pulumi) contains an example deployment to Google Cloud managed with [Pulumi](https://www.pulumi.com/).

To deploy:

```sh
cd pulumi
pulumi preview
pulumi up
pulumi destroy
```

> Pulumi deployment currently cannot be updated after creation due to
> "unmarshaling" error.

### Manual deployment

Setup continuous deployment in Google Cloud run following the [documentation](https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build).

Configure the environment variable `OPENAI_API_KEY` secret as described in the [documentation](https://cloud.google.com/run/docs/configuring/services/secrets).

## Acknowledgements

- [Tiira](https://www.tiira.fi/)
- [Tiira foorumi](https://www.tiirafoorumi.info/keskustelu/phpBB3/index.php)
- [Muuttolintujen kevät](https://www.jyu.fi/fi/tutkimus/muuttolintujen-kevat)
- [`openai-speech-to-text`](https://github.com/ZaharBerku/openai-speech-to-text)
