package model

type NewMessageReq struct {
   Topic string `json:"topic"`
   From string `json:"from"`
   Message string `json:"message"`
}