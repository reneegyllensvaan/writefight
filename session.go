package main

import (
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/gorilla/websocket"
)

type session struct {
	player int
}

type client struct {
	id int
	name string
	conn websocket.Conn
}

//var sessions map[int]session

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool{
	    return true
    },
}

func echo(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

