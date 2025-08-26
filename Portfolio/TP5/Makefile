# Makefile pour compiler un programme en C et en WebAssembly

# Commande pour compiler en C
CC = gcc
CCFLAGS = -Wall
#LIBS = -lX11
LIBSDIR = 
IDIR = 
#SRC = affichage.c lecture.c labyrinthe.c
OBJ = $(SRC:.c=.o)
EXEC = laby.out

# Commande pour compiler en WebAssembly
EMCC = emcc
PRELOAD = ./laby2.txt
EMCCFLAGS = -Wall -s NO_EXIT_RUNTIME=0 --preload-file ${PRELOAD} -sMODULARIZE -sEXPORT_ES6=1
EMCCLIBS =
EMCCIDIR = 
WEBSRC = $(SRC)
WEBOBJ = $(WEBSRC:.c=.o)
WEBEXEC = WASM/laby.html

CXX := emcc
CXX_SUFFIX := c

INCLUDE_DIR := ./
SRC_DIR := ./
BUILD_DIR := ./WASM/

SRC := $(wildcard $(SRC_DIR)/*.$(CXX_SUFFIX))


# Cible par défaut
all: cli wasm

#all: html js

html:
	mkdir -p $(BUILD_DIR)/html
	$(CXX) ${SRC} -o $(BUILD_DIR)/html/template.html

js:
	mkdir -p $(BUILD_DIR)/js
	$(CXX) ${SRC} -o $(BUILD_DIR)/js/template.js

cli: $(EXEC)

wasm: $(WEBEXEC)

# Règles de compilation pour C
affichage.o: affichage.h
%.o: %.c
	$(CC) $(CCFLAGS) -o $@ -c $< $(IDIR)

# Règles d'édition de liens pour C
$(EXEC): $(OBJ)
	$(CC) -o $@ $^ $(LIBS) $(LIBSDIR)

# Règles de compilation pour WebAssembly
$(WEBEXEC): $(WEBSRC)
	$(EMCC) $(EMCCFLAGS) $^ -o $@ $(EMCCLIBS) $(EMCCIDIR)

# Règles de nettoyage
clean:
	rm -rf $(BUILD_DIR)/*

.PHONY: all cli wasm clean

