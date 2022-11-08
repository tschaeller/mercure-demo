package model

type User struct {
	Username 	string `json:"username" binding:"required"`
}