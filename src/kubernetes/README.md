- https://github.com/arangodb/kube-arangodb
- https://github.com/arangodb/kube-arangodb/issues/671#issuecomment-736485498
- https://hub.docker.com/_/arangodb
- https://learnk8s.io/blog
- https://www.arangodb.com/docs/stable/deployment-kubernetes.html
- https://www.arangodb.com/docs/stable/tutorials-kubernetes.html

The main Kubernetes cluster runs on DigitalOcean, see: https://cloud.digitalocean.com/kubernetes/clusters

## Deploying

First, make sure you are in the correct DigitalOcean/local context (`kubectl config get-contexts`).

```bash
(cd src/kubernetes && kubectl apply -f third_party/arangodb/)
(cd src/kubernetes && kubectl apply -f third_party/cert-manager.yaml)
(cd src/kubernetes && kubectl apply -f third_party/ingress-nginx.yaml)

(cd src/kubernetes && kubectl diff -f abacus/)
(cd src/kubernetes && kubectl apply -f abacus/ --record)
```

Note: you might get something like _"error when patching ingress-nginx.yaml: Job.batch "ingress-nginx-admission-patch" is invalid"_ and _"field is immutable"_. Solution is simple, delete the job first ([source](https://github.com/kubernetes/ingress-nginx/issues/5884)) and run the apply again:

```
kubectl delete job ingress-nginx-admission-create -n ingress-nginx
kubectl delete job ingress-nginx-admission-patch -n ingress-nginx
```

Rollout new versions:

```bash
kubectl rollout restart deployment/abacus-deployment

kubectl rollout status deployment/abacus-deployment

kubectl rollout undo deployment/abacus-deployment
```

## Kubernetes Dashboard

To access Dashboard run:

```bash
kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443
```

In case port-forward command does not work, make sure that kong service name is correct. Check the services in Kubernetes Dashboard namespace using:

```bash
kubectl -n kubernetes-dashboard get svc
```

Dashboard will be available at: https://127.0.0.1:8443

Get API token to be able to login:

```bash
kubectl -n kubernetes-dashboard create token admin-user
```

## Upgrading ArangoDB

Current server URL: http://arangodb-single-server.default.svc.cluster.local:8529/

First and foremost: upgrade to the latest patch version (for example 3.7.13 before 3.8.0)!

- https://hub.docker.com/_/arangodb
- https://www.arangodb.com/docs/3.8/upgrading-general-info.html
- https://www.arangodb.com/docs/3.8/deployment-kubernetes-upgrading.html
- https://www.arangodb.com/docs/3.8/deployment-kubernetes-drain.html

To rotate ArangoDB pods:

```text
kubectl annotate pod arangodb-single-server-sngl-XXX-YYY deployment.arangodb.com/rotate=true
```

## Creating secrets

- https://kubernetes.io/docs/concepts/configuration/secret/
- https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/

```bash
kubectl create secret generic abacus-aws-secret
```

```bash
echo -n 'supersecret' | base64
```

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: abacus-aws-secret
data:
  AWS_ACCESS_KEY_ID: supersecretbase64
  AWS_SECRET_ACCESS_KEY: supersecretbase64
EOF
```

## Database backups

Automatic database backups are performed periodically **every day** and stored into standard S3 bucket. Format of the backups in S3 is `YYYY-MM-DDTHH:MM:SS` (for example `2021-06-06T20:37:42`) and the following S3 lifecycle rules are applied:

- Old backups are automatically removed after 30 days
- Incomplete multipart uploads are deleted after 1 day

### Restoring database backups

**PLEASE NOTE**: this is a database backup restore. It should be used only when something horrible happens. It also doesn't restore the whole system back to its original state (for example, items deleted from S3 won't be recovered).

1. visit `manual-arangodb-restore.yaml` and change the backup name to be restored:

```bash
aws s3 sync s3://abacus-arangodb-backup-38c739d1-9e39-4052-8746-b2f21523f6c0/__CHANGE_ME__ /tmp/dump
```

2. delete previous DB backup job:

```bash
kubectl delete job arangodb-single-server-restore
```

3. run the DB backup restore job:

```bash
(cd src/kubernetes && kubectl apply -f manual-arangodb-restore.yaml)
```

🤞
