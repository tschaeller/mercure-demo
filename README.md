# mercure-demo
All the files needed to demonstrate [Mercure.rocks](https://mercure.rocks/) with a small React based app

## Get started

```bash
k3d cluster create demo-mercure

helm repo add mercure https://charts.mercure.rocks
helm install my-release mercure/mercure
```

## To visit Mercure Hub

```bash
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mercure,app.kubernetes.io/instance=demo-mercure" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```