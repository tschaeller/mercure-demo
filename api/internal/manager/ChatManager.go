package manager

import (
    "github.com/gin-gonic/gin"
	"contentside.com/demo/api/internal/model"
)

var messages map[string][]model.NewMessageReq = make(map[string][]model.NewMessageReq)

func GetMessagesForRoom(room string) ([]model.NewMessageReq) {
    return messages[room]
}

func AddMessageToRoom(c *gin.Context, room string, newMessages ...model.NewMessageReq) []model.NewMessageReq {
    roomMessages, _ := messages[room]

    m := len(roomMessages)
    n := m + len(newMessages)
    if n > cap(roomMessages) { // if necessary, reallocate
        // allocate double what's needed, for future growth.
        newSlice := make([]model.NewMessageReq, (n+1)*2)
        copy(newSlice, roomMessages)
        roomMessages = newSlice
    }
    roomMessages = roomMessages[0:n]
    copy(roomMessages[m:n], newMessages)

    messages[room] = roomMessages

    return roomMessages
}
