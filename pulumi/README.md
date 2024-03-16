# Pulumi deployment on Google Cloud

This folder contains an example deployment to Google Cloud managed with [Pulumi](https://www.pulumi.com/).

## Setup

```sh
pulumi stack select dev
export OPENAI_API_KEY=  # Fill
pulumi config set --secret havis:openAIApiKey $OPENAI_API_KEY
```

## Deployment

```sh
# pulumi/
pulumi preview
pulumi up
pulumi destroy
```
