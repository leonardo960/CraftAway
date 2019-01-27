import { Paese } from "../model/paese";
import { Categoria } from "../model/categoria";
import { Materiale } from "../model/materiale";
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from "../constants";

@Injectable()
export class FiltriService {
    paesi : Paese[];
    categorie : Categoria[];
    materiali : Materiale[];

    constructor(public http: HttpClient) {
        
    }

    ngOnInit(){
        this.http.get<Paese[]>(URL.FILTRI_PAESI).subscribe(
            (paesi : Paese[]) => {
                this.paesi = paesi;
            },
            (err : HttpErrorResponse) => {
                console.log(JSON.stringify(err));
            }
        );
        this.http.get<Categoria[]>(URL.FILTRI_CATEGORIE).subscribe(
            (categorie : Categoria[]) => {
                this.categorie = categorie;
            },
            (err : HttpErrorResponse) => {
                console.log(JSON.stringify(err));
            }
        );
        this.http.get<Materiale[]>(URL.FILTRI_MATERIALI).subscribe(
            (materiali : Materiale[]) => {
                this.materiali = materiali;
            },
            (err : HttpErrorResponse) => {
                console.log(JSON.stringify(err));
            }
        );
    }


}
