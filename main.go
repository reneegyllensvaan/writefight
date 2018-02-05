package main

import (
	"fmt"
	"log"
	"net/http"
)


type session struct {
	player int
}

var sessions map[int]session



func main() {
  http.HandleFunc("/favicon.ico", nil)
  http.HandleFunc("/", rootHandler)
  log.Fatal(http.ListenAndServe(":8080",nil))
}

func faviconHandler(w http.ResponseWriter, r *http.Request) {}

func rootHandler(w http.ResponseWriter, r *http.Request) {
  response := "hello"
  fmt.Fprintf(w,response+"\n")
  fmt.Println("responded", response)
  fmt.Fprintf(w,r.RequestURI)
}


