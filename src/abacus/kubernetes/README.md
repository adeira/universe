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

(cd src/abacus/kubernetes && kubectl diff -f abacus.yaml)
(cd src/abacus/kubernetes && kubectl apply -f abacus.yaml)
```

# Kubernetes validations (TODO)

- https://learnk8s.io/validating-kubernetes-yaml
- https://github.com/zegl/kube-score

```bash
docker run -v $(pwd):/project zegl/kube-score:v1.11.0 score src/abacus/kubernetes/abacus.yaml
```

# Kubernetes dashboard (development only)

- https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

```bash
kubectl proxy
```

Dashboard: [http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

Creating a user: [https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)

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
