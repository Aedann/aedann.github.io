export type Categories = "elec" | "info" | "enr" | "web" | "autres";

export interface Parcours {
  type: "formation" | "travail" | "benevolat";
  titre: string;
  etablissement: string;
  logoName: string;
  lieu: string;
  date_debut: string; // YYYY-MM
  date_fin: string;
  description: string;
  descriptionEN: string;
  durationInMonths?: number;
  side?: "left" | "right";
}

export interface Projet {
  titre: string;
  topics: string[];
  description: string;
  descriptionEN?: string;
  readme: string;
  categorie: Categories;
  wasm?: boolean;
  lien?: string;
  github?: string;
}
