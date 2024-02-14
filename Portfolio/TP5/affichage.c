#include <stdio.h>
#include <stdlib.h>
#include "affichage.h"


int afficheLabyrinthe( int laby[TAILLE_X][TAILLE_Y], int depart[2], int arrivee[2], int tempo){
    for(int i = 0; i < TAILLE_Y; i++){
        printf("\n");
        for(int j = 0; j < TAILLE_X; j++){
            if(laby[j][i] == -1){
                printf("█");
            }else if(i==depart[1] && j==depart[0]){
                printf("▒");
            }else if(i==arrivee[1] && j==arrivee[0]){
                printf("⚑");
            }else if(laby[j][i] == 0){
                printf(" ");
            }else if(laby[j][i]>0){//Pour l'affichage console, on affiche en différente couleur les unités dépassants 10.
                int dizaine = (laby[j][i] - laby[j][i]%10)/10;
                if (dizaine >= 0 && dizaine <= 6) {
                    const char *color;
                    switch (dizaine % 7) {
                        case 0: color = "color: red"; break;
                        case 1: color = "color: green"; break;
                        case 2: color = "color: yellow"; break;
                        case 3: color = "color: blue"; break;
                        case 4: color = "color: magenta"; break;
                        case 5: color = "color: cyan"; break;
                        case 6: color = "color: orange"; break;
                    }
                    printf("<span style=\"%s\">%d</span>", color, dizaine % 10);
                } else {
                    printf("<span style=\"color: red\">▒</span>");
                }
            }
//


                /*
                //Ecrit pour terminal Linux 
                if(dizaine%7 == 1){ 
                    printf("\033[0;31m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else if(dizaine%7 == 2){ 
                    printf("\033[0;32m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else if(dizaine%7 == 3){
                    printf("\033[0;33m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else if(dizaine%7 == 4){ 
                    printf("\033[0;34m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else if(dizaine%7 == 5){ 
                    printf("\033[0;35m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else if(dizaine%7 == 6){ 
                    printf("\033[0;36m");
                    printf("%d",(laby[j][i])%10);
                    printf("\033[0m");
                }else{
                    printf("%d",(laby[j][i])%10);
                }
            }else{
                printf("\033[0;31m");
                printf("▒");
                printf("\033[0m");
            }
            */
        }
    }
    printf("\n");
    return 0;
}