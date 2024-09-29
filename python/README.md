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
