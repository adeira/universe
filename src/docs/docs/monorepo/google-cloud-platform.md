---
id: gcp
title: Google Cloud Platform
sidebar_label: Google Cloud Platform
---

> This page is still WIP. Please contact us directly if you need it.

All our projects should run in Google Cloud Platform (GCP). This document tries to describe how does it work in relation to Universe and what should you do when you need to deploy and run your service. Please note: you may still find some older services running in AWS with our [Crane](https://github.com/kiwicom/crane) - this guide is not for them.

There are two main technologies we use: [Terraform](https://www.terraform.io/) and [Kubernetes](https://kubernetes.io/). Terraform helps us to describe our infrastructure as a code (cluster level) while Kubernetes helps us to run our Docker containers (application level). Currently, our infrastructure is described in this monorepo for the whole Kiwi.com: https://gitlab.skypicker.com/infra. Kubernetes files (essentially your application description) is here in Universe next to each project (usually in `k8s` folder).

- Kubernetes engine (GKE): https://console.cloud.google.com/kubernetes/list?project=incubator-sandbox-32a2fbba
- infra definitions: https://gitlab.skypicker.com/infra/incubator

## Setting up kubectl for your cluster

Open GKE dashboard and click on "connect" button. You'll get `gcloud` command which will help you to setup `kubectl` for your cluster. You might need to login first via `gcloud auth login` command.

![GKE connect](assets/gke-connect.png)

Then, you can work with your cluster as needed.

```text
kubectl get namespace
kubectl --namespace obs-cache get pods
```

## Setting up database and credentials for Kubernetes

Before doing anything, you have to request your database in [#plz-platform-data](https://slack.com/app_redirect?channel=plz-platform-data) Slack channel. After it's on you:

1. Create Vault path in the following format (example from GraphQL): `secret/gcp-project/incubator-sandbox-32a2fbba/ns-graphql-private-secrets`
2. Set this Vault path in infrastructure monorepo: https://gitlab.skypicker.com/infra/incubator/sandbox/blob/2fa1e9252c2889613efc72ccf08ad83937aa1bc6/ns-graphql-private.tf#L8 (+terraform apply)
3. Change your Terraform configuration in your application deployment definition (k8s `kind: Deployment` config):

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        # ...
        envFrom:
          - secretRef:
              name: graphql-private-secrets
```

We should eventually get rid of every single step in this process and have it completely automated (that's the vision) so developers will only take care about the actual ENV variables.

Tip: use can use https://vault-ui.skypicker.com/ (with Okta login and VPN) to set these environment variables.

## Additional resources

Please be careful: the following resources can be outdated or not work well with Universe.

- [How to GCP project and GKE Cluster](https://kiwi.wiki/platform/wiki/#/how_to_guides/how_to_gcp_project_and_gke_cluster)
- [How to Deploy your Application to Kubernetes](https://kiwi.wiki/platform/wiki/#/how_to_guides/how_to_deploy_your_app_to_k8s)
