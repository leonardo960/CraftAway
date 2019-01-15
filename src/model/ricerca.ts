import { Categoria } from "./categoria";
import { Paese } from "./paese";
import { Materiale } from "./materiale";


export class Ricerca{
  query: string;
  categoria: Categoria;
  paese: Paese;
  materiali: Materiale[];
  prezzoMin: number;
  prezzoMax: number;

  constructor(query: string, categoria: Categoria, paese: Paese, materiali: Materiale[], prezzoMin: number,
  prezzoMax: number){
    this.query = query;
    this.categoria = categoria;
    this.paese = paese;
    this.materiali = materiali;
    this.prezzoMin = prezzoMin;
    this.prezzoMax = prezzoMax;
  }
}
