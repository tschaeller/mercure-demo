package model

import (
    "github.com/golang-jwt/jwt/v4"
)

type JWTMercureClaims struct {
    Publish []string `json:"publish"`
    Subscribe []string `json:"subscribe"`
    Payload map[string]string `json:"payload"`
}

type JWTCustomClaims struct {
    Mercure JWTMercureClaims `json:"mercure"`
    jwt.RegisteredClaims
}