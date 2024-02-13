#include <stdio.h>

#include "affichage.h"
#include "lecture.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
EMSCRIPTEN_KEEPALIVE
#endif

#ifdef __cplusplus
extern "C" {
#endif


int * direction(int d, int coord[2]){
    if(d==0){
        //printf("La case nord la plus proche est : (%d, %d) \n",coord[0],coord[1]-1);
        coord[1]=coord[1]-1;
    }else if(d==1){
        //printf("La case est la plus proche est : (%d, %d) \n",coord[0]+1,coord[1]);
        coord[0]=coord[0]+1;
    }else if(d==2){
        //printf("La case sud la plus proche est : (%d, %d) \n",coord[0],coord[1]+1);
        coord[1]=coord[1]+1;
    }else{
        //printf("La case ouest la plus proche est : (%d, %d) \n",coord[0]-1,coord[1]);
        coord[0]=coord[0]-1;
    }
    return coord;
}
//Si on dépasse les bordures on aura x négatif ou bien x>102 etc...


int expension(int tab[TAILLE_X][TAILLE_Y],int depart[2],int arrivee[2]){
    int coord[2]={depart[0],depart[1]};
    int r = 0;
    int Test_impossibilite = 0;
    tab[depart[0]][depart[1]]=1;
    while(tab[arrivee[0]][arrivee[1]]==0){
        r++;
        Test_impossibilite = 0;
        for(int i = 0; i < TAILLE_Y; i++){
            for(int j = 0; j < TAILLE_X; j++){  //On parcourt tout le tableau
                if(tab[j][i]==r){   //Si une case possède la distance max.
                    //printf("r = %d : Case r détéctée en (%d,%d)  \n",r,j,i);
                    Test_impossibilite++;
                    coord[0] = j; //On se place sur cette case.
                    coord[1] = i;
                    for(int d = 0; d < 4; d++){ 
                        direction(d,coord);      //On se place sur chaque case voisine
                        if(tab[coord[0]][coord[1]]==0){ //Si une case voisine n'a pas été traversée :
                            //printf("r = %d : Case voisine détéctée en (%d,%d)  \n",r,coord[0],coord[1]);
                            tab[coord[0]][coord[1]]=r+1; //On lui donne la distance r+1
                        }
                        coord[0] = j; //On retourne sur la case parcourue
                        coord[1] = i;
                    }
                }
            }
        }
        if(Test_impossibilite == 0){
            return 0;
        }
    }
    printf("\n Le chemin mesure %d cases ! \n",tab[arrivee[0]][arrivee[1]]);
    return 1;
}

int remontee(int tab[TAILLE_X][TAILLE_Y],int depart[2],int arrivee[2]){
    int coord[2] = {arrivee[0],arrivee[1]};
    int coord2[2] = {coord[0],coord[1]};
    int r = tab[arrivee[0]][arrivee[1]];
    tab[arrivee[0]][arrivee[1]] = -2;
    while(tab[depart[0]][depart[1]] == 1){
        for(int d = 0; d < 4; d++){ 
            direction(d,coord);      //On se place sur chaque case voisine
            if(tab[coord[0]][coord[1]]==r-1){ //Si une case voisine n'a pas été traversée :
                tab[coord[0]][coord[1]]=-2; //On lui donne la distance r-1
                coord2[0] = coord[0]; //On marque quelle case appartient au chemin
                coord2[1] = coord[1];
            }
            coord[0] = coord2[0]; //On se replace sur la dernière case du chemin.
            coord[1] = coord2[1];
        }
        r--;

    }
    return 1;
}

int nettoyage(int tab[TAILLE_X][TAILLE_Y]){
    for(int i = 0; i < TAILLE_Y; i++){
        for(int j = 0; j < TAILLE_X; j++){  //On parcourt tout le tableau
            if(tab[j][i]>0){
                tab[j][i]=0;
            }
        }
    }
    return 1;
}

int main(){
    int depart[2];
    int arrivee[2];
    int tab[TAILLE_X][TAILLE_Y]; 
    printf("\n");
    load("./laby2.txt",tab,depart,arrivee);
    int coord[2] = {0,0};
    afficheLabyrinthe(tab,depart,arrivee,0);
    direction(0,coord);
    expension(tab,depart,arrivee);
    afficheLabyrinthe(tab,depart,arrivee,0);
    remontee(tab,depart,arrivee);
    nettoyage(tab);
    printf("Remontée : \n");
    afficheLabyrinthe(tab,depart,arrivee,0);
    return 0;
}



/*
            //printf("r = %d : Case r détéctée en (%d,%d)  \n",r,j,i);
            coord[0] = j; //On se place sur cette case.
            coord[1] = i;
            for(int d = 0; d < 4; d++){ 
                direction(d,coord);      //On se place sur chaque case voisine
                if(tab[coord[0]][coord[1]]==r-1){ //Si une case voisine n'a pas été traversée :
                    //printf("r = %d : Case voisine détéctée en (%d,%d)  \n",r,coord[0],coord[1]);
                    tab[coord[0]][coord[1]]=r-1; //On lui donne la distance r+1
                }
            coord[0] = j; //On retourne sur la case parcourue
            coord[1] = i;

*/

#ifdef __cplusplus
}
#endif
