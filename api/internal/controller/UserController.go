package controller

import (
	"github.com/gin-gonic/gin"
	"contentside.com/demo/api/internal/manager"
	"contentside.com/demo/api/internal/model"
	"contentside.com/demo/api/internal/service"
    "encoding/json"
)

func GetUsersList(c *gin.Context) {
    c.JSON(200, gin.H{
        "users": manager.GetUsers(c),
    })
}

func EmptyUsersList(c *gin.Context) {
    c.JSON(200, gin.H{
        "users": manager.EmptyUsers(c),
    })
}

func AddUser(c *gin.Context) {
    var newUser model.User

    if (c.BindJSON(&newUser) != nil || manager.HasUser(c, newUser)) {
        c.JSON(400, gin.H{
                "message": "The username is already in use.",
            })

        return
    }

    manager.AddUser(c, newUser)

    ss := service.GetJwt(newUser)

    c.SetCookie("mercureAuthorization", ss, 60*60*24, "/.well-known/mercure", "localhost", false, false)

    newUserData := map[string]string{"username": newUser.Username, "topic": "newUser"}
    newUserMessage, _ := json.Marshal(newUserData)
    service.SendMercureEvent("newUser", ss, string(newUserMessage))

    c.JSON(200, gin.H{
        "users": manager.GetUsers(c),
    })
}