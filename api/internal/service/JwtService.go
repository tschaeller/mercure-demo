package service

import (
    "time"
    "os"
    "contentside.com/demo/api/internal/model"
    "github.com/golang-jwt/jwt/v4"
)

func GetJwt(user model.User) (string) {
    payload := make(map[string]string)
    payload["user"] = user.Username

    jwtSigningKey := []byte(os.Getenv("MERCURE_PUBLISHER_JWT_KEY"))
    claims := model.JWTCustomClaims{
        model.JWTMercureClaims{
            Publish: []string{"*"},
            Subscribe: []string{"/users/"+user.Username, "general"},
            Payload: payload,
        },
        jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().AddDate(0, 0, 1)),
            Issuer:    "api",
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    ss, _ := token.SignedString(jwtSigningKey)

    return ss
}