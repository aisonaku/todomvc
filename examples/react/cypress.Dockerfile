FROM cypress/included:12.3.0
WORKDIR . /app

COPY cypress.config.js package.json package-lock.json ./
COPY cypress ./cypress

RUN npm install --loglevel verbose
ENTRYPOINT ["npx", "cypress", "run", "-b", "chrome"]