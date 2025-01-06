FROM node:22 As build

WORKDIR /usr/src/app

# RUN corepack enable pnpm

COPY . .

RUN npm config set registry https://registry.npmjs.org/ && npm install
# RUN npm install

RUN npm run build

FROM node:22 As prod

ENV \
    # Configure default locale (important for chrome-headless-shell).
    LANG=en_US.UTF-8 \
    # UID of the non-root user 'pptruser'
    PPTRUSER_UID=10042

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y --no-install-recommends fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros \
    fonts-kacst fonts-freefont-ttf dbus dbus-x11

# Add pptruser.
RUN groupadd -r pptruser && useradd -u $PPTRUSER_UID -rm -g pptruser -G audio,video pptruser

USER $PPTRUSER_UID

WORKDIR /home/pptruser

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

ENV DBUS_SESSION_BUS_ADDRESS autolaunch:

# Install system dependencies as root.
USER root

# Overriding the cache directory to install the deps for the Chrome
# version installed for pptruser. 
RUN PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
  npx puppeteer browsers install chrome --install-deps

# USER $PPTRUSER_UID
# # Generate THIRD_PARTY_NOTICES using chrome --credits.
# RUN node -e "require('child_process').execSync(require('puppeteer').executablePath() + ' --credits', {stdio: 'inherit'})" > THIRD_PARTY_NOTICES

CMD [ "node", "dist/server.js" ]