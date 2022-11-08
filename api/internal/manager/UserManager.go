package manager

import (
    "github.com/gin-gonic/gin"
	"contentside.com/demo/api/internal/model"
)

var users []model.User = make([]model.User, 0)

func GetUsers(c *gin.Context) ([]model.User) {
    return users
}

func EmptyUsers(c *gin.Context) ([]model.User) {
    users = make([]model.User, 0)
    return users
}

// func AddUser(c *gin.Context, newUser model.User) ([]model.User) {
//     t := make([]model.User, len(users), (cap(users)+1))
//     copy(t, users)
//     users = t
//
//     return users
// }

func AddUser(c *gin.Context, newUsers ...model.User) []model.User {
    m := len(users)
    n := m + len(newUsers)
    if n > cap(users) { // if necessary, reallocate
        // allocate double what's needed, for future growth.
        newSlice := make([]model.User, (n+1)*2)
        copy(newSlice, users)
        users = newSlice
    }
    users = users[0:n]
    copy(users[m:n], newUsers)

    return users
}
