package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"io/ioutil"
	"os"
	"path/filepath"

)

//permanently cache page files to memory
var indexData []byte
var styleData []byte
var scriptData []byte

//type session struct {
//	player int
//}

//var sessions map[int]session



func main() {
	//load files into memory
	load()
	//register router and routes
	r := httprouter.New()
	r.GET("/favicon.ico", faviconHandler)
	r.GET("/", serveIndex)
	r.GET("/index.html", serveIndex)
	r.GET("/scripts.js", serveScripts)
	r.GET("/styles.css", serveStyles)
	log.Fatal(http.ListenAndServe(":8080",r))
}

func load() {
	indexData, _ = ioutil.ReadFile("www/index.html")
	fmt.Printf("loaded index, length %d bytes\n", len(indexData))
	styleData, _ = ioutil.ReadFile("www/css/styles.css")
	fmt.Printf("loaded styles, length %d bytes\n", len(styleData))
	filepath.Walk("www", func(path string, info os.FileInfo, err error) error {
		fmt.Println(path)
		return nil
	})

}

func faviconHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
}

func serveStyles(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Write(styleData)
}

func serveScripts(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Write(scriptData)
}

func serveIndex(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Write(indexData)
}

func rootHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	//response := "hello"
	//fmt.Fprintf(w,response+"\n")
	//fmt.Println("responded", response)
	//fmt.Fprintf(w,r.RequestURI)
	w.Write(indexData)
}


