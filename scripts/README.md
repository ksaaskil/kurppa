# Scripts

## Build list of species

Go to [https://luontoportti.com/c/3/linnut?sid=3](https://luontoportti.com/c/3/linnut?sid=3) and scroll down to the bottom of the page. Open JavaScript console and copy the root `<html>` element by choosing "Copy outer HTML". Save to `linnut.html`.

Run the script to create `linnut.json` file:

```sh
./linnut.mts
# OR
node --loader ts-node/esm linnut.mts
```
