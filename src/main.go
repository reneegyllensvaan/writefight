package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/favicon.ico", faviconHandler)
	http.HandleFunc("/", rootHandler)
log.Fatal(http.ListenAndServe(":8080",nil))
}

func faviconHandler(w http.ResponseWriter, r *http.Request) {}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	response := "hello"
	fmt.Fprintf(w, response)
	fmt.Println("responded", response)
}
