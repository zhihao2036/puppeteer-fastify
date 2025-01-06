# Puppeteer

## Dev

```bash
pnpm install

pnpm dev
```

## Test

```js
fetch("http://localhost:3000/api/pu/screenshot", {
  headers: {
    accept: "application/json",
    "content-type": "application/json;charset=UTF-8",
  },
  body: '{"url": "https://news.ycombinator.com"}',
  method: "POST",
});
```

## Questions

### Could not find chrome

#### Error message

```bash
Could not find Chrome (ver. 131.0.6778.204). This can occur if either
 1. you did not perform an installation before running the script (e.g. `npx puppeteer browsers install chrome`) or
 2. your cache path is incorrectly configured (which is: $HOME/.cache/puppeteer).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
```

#### Solution

```bash
npx puppeteer browsers install chrome
```

## Deploy

### Building the image

```bash
docker build -t pupp-fast:v0.1 . -f Dockerfile

# arm platform(apple silicon)
docker build --platform linux/amd64 -t pupp-fast:v0.5 . -f Dockerfile
```

### Running the image

```bash
docker run -i --init --rm --cap-add=SYS_ADMIN -p 3000:3000 --name pupp-fast pupp-fast:v0.1

# arm platform(apple silicon)
docker run --platform linux/amd64  -i --init --rm --cap-add=SYS_ADMIN -p 3000:3000 --name pupp-fast pupp-fast:v0.5
```
