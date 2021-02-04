- https://github.com/arangodb/kube-arangodb
- https://github.com/arangodb/kube-arangodb/issues/671#issuecomment-736485498
- https://hub.docker.com/_/arangodb
- https://learnk8s.io/blog
- https://www.arangodb.com/docs/stable/deployment-kubernetes.html
- https://www.arangodb.com/docs/stable/tutorials-kubernetes.html

# Deploying

```bash
(cd src/abacus/kubernetes && kubectl apply -f third_party/arangodb/)

(cd src/abacus/kubernetes && kubectl diff -f abacus.yaml)
(cd src/abacus/kubernetes && kubectl apply -f abacus.yaml)
```

# Kubernetes validations (TODO)

- https://learnk8s.io/validating-kubernetes-yaml
- https://github.com/zegl/kube-score

```bash
docker run -v $(pwd):/project zegl/kube-score:v1.10.0 score src/abacus/kubernetes/abacus.yaml
```

# Kubernetes dashboard (development only)

- https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

```bash
kubectl proxy
```

Dashboard: [http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

Creating a user: [https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)

# Abacus Docker image

Executed from `src/abacus` context:

```bash
# docker build --tag mrtnzlml/abacus --file Dockerfile .
# docker push

(cd src/abacus && docker build --tag mrtnzlml/abacus --file Dockerfile .)
```

Running the image directly:

```bash
docker run \
  --memory=64m \
  --cpus=0.1 \
  -p 5000:5000 \
  -d \
  --name=abacus \
  abacus
```

Publishing the image:

```bash
docker image ls
docker image push mrtnzlml/abacus:latest
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
