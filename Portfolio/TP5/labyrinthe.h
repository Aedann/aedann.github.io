#ifndef LABYRINTHE_H
#define LABYRINTHE_H

#include "affichage.h"
#include "lecture.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif

int * direction(int d, int coord[2]);

int expension(int tab[TAILLE_X][TAILLE_Y],int depart[2],int arrivee[2]);

int remontee(int tab[TAILLE_X][TAILLE_Y],int depart[2],int arrivee[2]);

int nettoyage(int tab[TAILLE_X][TAILLE_Y]);

#ifdef __cplusplus
}
#endif

#endif
