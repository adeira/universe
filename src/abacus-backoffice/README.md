# 🧮 ABACUS - React Frontend

[![Crowdin](https://badges.crowdin.net/yc-backoffice/localized.svg)](https://crowdin.com/project/yc-backoffice)

First, run the development server:

```bash
yarn workspace @adeira/abacus-backoffice dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Running in Docker

It's certainly possible (and recommended) to run the Next.js application directly. However, in production, it runs in Docker. You can do the same if you want:

```bash
(cd src/abacus-backoffice && docker build --progress=plain . --tag abacus-backoffice)
docker run -p 5001:5001 abacus-backoffice
```
