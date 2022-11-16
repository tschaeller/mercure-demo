package controller

import (
    "io/ioutil"
    "fmt"
	"github.com/gin-gonic/gin"
	"contentside.com/demo/api/internal/model"
	"contentside.com/demo/api/internal/service"
	"contentside.com/demo/api/internal/manager"
)

func SendNewMessage(c *gin.Context) {
    var reqPostData model.NewMessageReq

    if c.BindJSON(&reqPostData) != nil {
         c.JSON(400, gin.H{
                "status": "error",
            })
        return;
    }

    manager.AddMessageToRoom(c, reqPostData.Topic, reqPostData)

    fromUser := model.User{
        Username: reqPostData.From,
    }
    ss := service.GetJwt(fromUser)

    resp, err := service.SendMercureEvent(reqPostData.Topic, ss, reqPostData.Message)

    resBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("client: could not read response body: %s\n", err)
	}

    if (err == nil && resp.StatusCode == 200) {
        c.JSON(200, gin.H{
            "status": "sent",
            "response": string(resBody),
        })
    } else {
        c.JSON(resp.StatusCode, gin.H{
            "status": "error",
            "details": err,
            "response": string(resBody),
        })
    }
}

func GetMessages(c *gin.Context) {
    room, found := c.GetQuery("room")
    if (!found) {
        c.JSON(400, gin.H{
                    "status": "error",
                })
        return;
    }

    c.JSON(200, gin.H{
            "room": room,
            "messages": manager.GetMessagesForRoom(room),
        })
}