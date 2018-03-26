package main

import (
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"

)

func main() {
	//load files into memory
	loadWwwContent()
	//register router and routes
	r := httprouter.New()
	r.GET("/favicon.ico", faviconHandler)
	r.GET("/", serveIndex)
	r.GET("/index.html", serveIndex)
	r.GET("/scripts.js", serveScripts)
	r.GET("/styles.css", serveStyles)

	//register websocket route
	r.GET("/echo", echo)
	log.Fatal(http.ListenAndServe(":8080",r))
}

