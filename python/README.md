# Python helpers

Initialize environment:

```sh
brew install miniforge
conda env create -f condaenv.yaml
```

Activate environment:

```sh
conda activate kurppa
```

Alternatively:

```sh
pyenv virtualenv 3.11.1 kurppa-3.11.1
pyenv activate kurppa-3.11.1
```

## Scrape from Luontoportti

Scrape using file `../scripts/linnut.json`:

```sh
python scrape.py
```

## Create embeddings for scraped files

Write embeddings to file `embeddings.csv`:

```sh
export OPENAI_KEY=...
python embed.py
```

## Start chat app

```sh
export OPENAI_API_KEY=...
python chat.py
```
