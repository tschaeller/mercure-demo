package controller

import (
    "io/ioutil"
    "fmt"
	"github.com/gin-gonic/gin"
	"contentside.com/demo/api/internal/model"
	"contentside.com/demo/api/internal/service"
)

func SendNewMessage(c *gin.Context) {
    var reqPostData model.NewMessageReq

    if c.BindJSON(&reqPostData) != nil {
         c.JSON(400, gin.H{
                "status": "error",
            })
    }

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