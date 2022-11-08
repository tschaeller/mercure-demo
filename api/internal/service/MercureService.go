package service

import (
    "strings"
    "net/http"
    "net/url"
    "crypto/tls"
)


func SendMercureEvent(topic string, token string, data string) (*http.Response, error) {
    tr := &http.Transport{
        TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
    }
    client := &http.Client{Transport: tr}

    reqData := url.Values{}
    reqData.Set("type", "message")
    reqData.Set("topic", topic)
    reqData.Set("data", data)
    encodedData := reqData.Encode()

    req, _ := http.NewRequest("POST", "http://mercure/.well-known/mercure", strings.NewReader(encodedData))

    req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
    req.Header.Add("Authorization", "Bearer "+token)

    return client.Do(req)
}