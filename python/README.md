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

## Scrape from Luontoportti

Scrape using file `../scripts/linnut.json`:

```sh
python scrape.py
```
