import re
import time
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
    text = response.text
    pattern = """{"article":"(.+?)\"[,}]"""

    matches = re.findall(pattern, text)
    if len(matches) != 2:
        logging.error(f"Wrong number of string matches found for URL: {url}, got {len(matches)}")
        logging.error(f"Text: {text}")
        return ""
    
    # finnish = matches[1]
    normalized = matches[0] + matches[1]
    try:
        return normalized.encode().decode('unicode-escape').encode('latin-1').decode('utf-8')
    except Exception as ex:
        logging.error(f"Error: {ex}")
        logging.error(f"Text: {normalized}")
        return ""


def scrape(bird: dict[str, str], skip_existing=False) -> None:
    link = bird['link']
    output_file = DEFAULT_OUTPUT / f"""{bird["finnishName"]}.txt"""
    if output_file.exists() and skip_existing:
        logging.info(f"Skipping existing file: {output_file}")
        return
    logging.info(f"Reading URL: {link}")
    text = read_text(url=link)
    if not text:
        logging.error(f"Got empty text from '{link}'")
        return
    logging.info(f"Got {len(text)} characters from '{link}'")
    logging.info(f"Writing to file: {output_file}")
    Path(output_file).write_text(text)

SKIP_EXISTING=True

def main():
    birds = read_input()

    for i, bird in enumerate(birds):
        logging.info(f"Starting to scrape for bird {i+1}/{len(birds)}: {bird['finnishName']}")
        scrape(bird, skip_existing=SKIP_EXISTING)
        if not SKIP_EXISTING:
            time.sleep(1)

if __name__ == "__main__":
    main()
