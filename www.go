package main

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"io/ioutil"
	"net/http"
)

//permanently cache page files to memory
var indexData []byte
var styleData []byte
var scriptData []byte

func loadWwwContent() {
	indexData, _ = ioutil.ReadFile("www/index.html")
	fmt.Printf("loaded index, length %d bytes\n", len(indexData))
	styleData, _ = ioutil.ReadFile("www/css/styles.css")
	fmt.Printf("loaded styles, length %d bytes\n", len(styleData))
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
