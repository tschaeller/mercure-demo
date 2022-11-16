# mercure-demo
All the files needed to demonstrate [Mercure.rocks](https://mercure.rocks/) with a small React based app

## Get started

```bash
docker-compose up -d
```

## To expose local compose to the network
In three different bash :
```bash
ssh -R 80:localhost:3000 nokey@localhost.run
ssh -R 80:localhost:5000 nokey@localhost.run
ssh -R 80:localhost:80 nokey@localhost.run
```
Then update the .env in the ./front with the URLs provided by the second and third command
```bash
docker-compose up -d
```

## K3S support
This section is a WIP
### Get started
```bash
k3d cluster create demo-mercure

helm repo add mercure https://charts.mercure.rocks
helm install my-release mercure/mercure
```

### To visit Mercure Hub

```bash
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mercure,app.kubernetes.io/instance=demo-mercure" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```
