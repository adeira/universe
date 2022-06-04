- https://github.com/arangodb/kube-arangodb
- https://github.com/arangodb/kube-arangodb/issues/671#issuecomment-736485498
- https://hub.docker.com/_/arangodb
- https://learnk8s.io/blog
- https://www.arangodb.com/docs/stable/deployment-kubernetes.html
- https://www.arangodb.com/docs/stable/tutorials-kubernetes.html

The main Kubernetes cluster runs on DigitalOcean, see: https://cloud.digitalocean.com/kubernetes/clusters

# Deploying

First, make sure you are in the correct DigitalOcean/local context (`kubectl config get-contexts`).

```bash
(cd src/abacus/kubernetes && kubectl apply -f third_party/arangodb/)
(cd src/abacus/kubernetes && kubectl apply -f third_party/cert-manager.yaml)
(cd src/abacus/kubernetes && kubectl apply -f third_party/ingress-nginx.yaml)

(cd src/abacus/kubernetes && kubectl diff -f abacus/)
(cd src/abacus/kubernetes && kubectl apply -f abacus/ --record)
```

# Upgrading ArangoDB

Current server URL: http://arangodb-single-server.default.svc.cluster.local:8529/

First and foremost: upgrade to the latest patch version (for example 3.7.13 before 3.8.0)!

- https://hub.docker.com/_/arangodb
- https://www.arangodb.com/docs/3.8/upgrading-general-info.html
- https://www.arangodb.com/docs/3.8/deployment-kubernetes-upgrading.html
- https://www.arangodb.com/docs/3.8/deployment-kubernetes-drain.html

# Kubernetes validations (TODO)

- https://learnk8s.io/validating-kubernetes-yaml
- https://github.com/zegl/kube-score

```bash
docker run -v $(pwd):/project zegl/kube-score:v1.11.0 score src/abacus/kubernetes/abacus.yaml
```

# Troubleshooting

Problem: `kubectl get pods` returns many `Evicted` pods and `kubectl describe pod <name>` returns message `The node had condition: [DiskPressure]`.

Explanation: there is not enough disk space on the node

Solution: free disk space (or add a new node) and investigate why is the disk space missing

Useful commands:

```bash
kubectl describe nodes
kubectl get pods
```

Useful links:

- https://docs.docker.com/config/pruning/

# Cleanup

Delete evicted/failed pods:

```bash
kubectl get pods --field-selector=status.phase=Failed
kubectl delete pods --field-selector=status.phase=Failed
```

# Creating necessary secrets

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

# Database backups

Automatic database backups are performed periodically **every two hours** and stored into standard S3 bucket. Format of the backups in S3 is `YYYY-MM-DDTHH:MM:SS` (for example `2021-06-06T20:37:42`) and the following S3 lifecycle rules are applied:

- Old backups are automatically removed after 30 days
- Incomplete multipart uploads are deleted after 1 day

## Restoring backups

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
(cd src/abacus/kubernetes && kubectl apply -f manual-arangodb-restore.yaml)
```

🤞
