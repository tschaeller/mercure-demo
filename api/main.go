package main

import (
  "github.com/gin-contrib/cors"
  "github.com/gin-gonic/gin"
  "contentside.com/demo/api/internal/controller"
)

func main() {
    r := gin.New()

    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"PUT", "PATCH", "POST", "GET"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        ExposeHeaders:    []string{"Content-Length", "Content-Type", "Access-Control-Allow-Origin"},
        AllowCredentials: true,
    }))

    userGroup := r.Group("/users")
    {
        userGroup.GET("", controller.GetUsersList)
        userGroup.GET("/empty", controller.EmptyUsersList)
        userGroup.POST("", controller.AddUser)
    }

    chatGroup := r.Group("/chat")
    {
        chatGroup.POST("", controller.SendNewMessage)
    }

    r.Run() // listen and serve on 0.0.0.0:$PORT (default :5000)
}