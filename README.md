# InTech Backend

This repository contains the backend component of the InTech application.
__InTech__ is a search engine specifically designed for technology articles.
The platform indexes articles from trusted sources and directs users to the original content with a single click.
__InTech__ does not produce or host any articles; it serves solely as a gateway to high-quality technology journalism.

## Features

- **User accounts** — sign up, sign in, and account deletion
- **Bookmark eligibility checks** — token-based verification for bookmarking articles
- **Article indexing** — collects and serves technology articles from trusted sources

## Tech Stack

- [Express](https://expressjs.com/) / [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [Jest](https://jestjs.io/) / [Supertest](https://github.com/ladjs/supertest) for testing

## Related

If you want to check out the frontend repository and see the app in action, [click here](https://github.com/jmsanJS/InTech-frontend)
