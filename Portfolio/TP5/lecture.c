#include <stdio.h>
#include "affichage.h"
#include "lecture.h"

int load(char* filePath,int tab[TAILLE_X][TAILLE_Y], int depart[2], int arrivee[2]){
    FILE* file = fopen(filePath, "r");
    fscanf(file, "%d %d \n%d %d", &depart[0],&depart[1],&arrivee[0],&arrivee[1]);
    //printf("%d %d \n%d %d \n", start_x,start_y,end_x,end_y);
    for(int i = 0; i < TAILLE_Y; i++){
        //printf("\n");
        for(int j = 0; j < TAILLE_X; j++){
            fscanf(file, "%d ", &tab[j][i]);
            //printf("%d ", tab[j][i]);
        }
    }
    //printf("%s",tab);
    if(!fclose(file)){
        return 1;
    }else{
        return 0;
    }
}
