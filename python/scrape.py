import bs4
import logging
import json
from pathlib import Path
import requests

DEFAULT_INPUT = Path(__file__).parent.parent / "scripts" / "linnut.json"
DEFAULT_OUTPUT = Path(__file__).parent / "scraped"

logging.basicConfig(level=logging.INFO)

def read_input(file: Path = DEFAULT_INPUT):
    return json.loads(file.read_text())['species']

def read_text(url: str) -> str:
    """https://stackoverflow.com/a/69594284"""
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = bs4.BeautifulSoup(response.text,'lxml')
    return soup.body.get_text(' ', strip=True)

def scrape(bird: dict[str, str]) -> None:
    link = bird['link']
    logging.info(f"Reading URL: {link}")
    text = read_text(url=link)
    logging.info(f"Got {len(text)} characters from '{link}'")
    output_file = DEFAULT_OUTPUT / f"""{bird["finnishName"]}.txt"""
    logging.info(f"Writing to file: {output_file}")
    Path(output_file).write_text(text)

def main():
    birds = read_input()

    for i, bird in enumerate(birds):
        logging.info(f"Starting to scrape for bird {i+1}/{len(birds)}: {bird['finnishName']}")
        scrape(bird)
