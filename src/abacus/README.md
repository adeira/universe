# 🧮 ABACUS - Rust Backend

This server is written in Rust (using [Axum](https://github.com/tokio-rs/axum)), exposes GraphQL API (via [Juniper](https://github.com/graphql-rust/juniper)) and works with [ArangoDB](https://github.com/arangodb/arangodb) database behind the scenes.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=2c8353da1463&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

## Install and run

To develop this server locally, it is necessary to use `mirrord` (https://mirrord.dev/). It allows running local code in the context of an existing Kubernetes cluster, with access to all other microservices and databases.

> `mirrord` runs in two places—in the memory of your local process, and as a pod in your cloud environment. The two components work together to fuse your local process with its remote counterpart so that inputs to the remote pod are mirrored to the local process, and outputs from the local process are tunneled to the remote pod. This includes network traffic, file access, and environment variable—everything needed to make your local process “think” it's running in the cloud.

First, install `mirrord`:

```bash
brew install metalbear-co/mirrord/mirrord
```

Compile and run the application using in K8s context using `mirrord`:

```bash
cargo build && mirrord exec --config-file=./mirrord.json ./target/debug/server
```

The server is accessible on this URL: https://abacus.adeira.io/status/ping (**not** localhost!)

The default configuration uses [Traffic Stealing](https://mirrord.dev/docs/using-mirrord/steal/) and it is therefore necessary to send all requests (including the ones from your browser) with the correct `X-Adeira-Mirrord-Steal-UUID` header. Without this header, `mirrord` won't steal the request and send it to production Kubernetes pod as usual.

**Note: there is currently no K8S cluster for development. Production only so—be careful. 💸**

## ArangoDB

To access ArangoDB from localhost, use `port-forward`, for example (change to the actual pod name):

```bash
kubectl port-forward pod/arangodb-single-server-sngl-spbqcrlf-3b4432 8529:8529
```

In case port-forward command does not work, make sure that the service name is correct:

```bash
kubectl -n default get svc
```

And open: http://127.0.0.1:8529/

## Testing

```bash
(cd src/abacus && cargo clippy)
(cd src/abacus && cargo test)
```

There are some extra tests which are slow or require extra infrastructure (network access, ArangoDB). There tests are ignored by default but can be executed manually:

```text
(cd src/abacus && cargo test -- --ignored)
```

Note: ignored tests are not being run on CI (at least not yet)!

## Stripe

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

This is how you can test Stripe webhooks:

```bash
stripe listen --forward-to localhost:5000/webhooks/stripe
```

And now (`stripe trigger --help`):

```bash
stripe trigger checkout.session.completed
```

The events must be sent via Stripe CLI because we are verifying the signatures.
