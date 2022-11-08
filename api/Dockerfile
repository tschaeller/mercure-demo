FROM golang:1.19-alpine

# Required because go requires gcc to build
RUN apk add build-base

RUN apk add inotify-tools

COPY . /debug_env

WORKDIR /debug_env

RUN go mod download

RUN go install github.com/go-delve/delve/cmd/dlv@latest

EXPOSE 5000

CMD sh /debug_env/scripts/run.sh