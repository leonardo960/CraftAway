import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Inserzione } from '../../model/inserzione';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Paese } from '../../model/paese';
import { Categoria } from '../../model/categoria';
import { Materiale } from '../../model/materiale';
import { Utente } from '../../model/utente';

@IonicPage()
@Component({
  selector: 'page-dettaglio-inserzione',
  templateUrl: 'dettaglio-inserzione.html',
})
export class DettaglioInserzionePage {

  data: Observable<any>;
  inserzione: Inserzione;
  immagini: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    let insertionId = this.navParams.get("idInserzione");

    this.inserzione = new Inserzione([], "", 0, new Date(), new Paese("", ""), "", "", new Categoria("", ""), [], new Utente("", "", "", new Date, 0, 0, null, []));
    this.data = this.httpClient.get<Inserzione[]>("http://localhost:3000/inserzioni");
    this.data.subscribe(insertionData => {
        //this.inserzione = new Inserzione(insertionData[0].immagini, insertionData[0].titolo, insertionData[0].prezzo, insertionData[0].dataPubblicazione, insertionData[0].paese, insertionData[0].id, insertionData[0].descrizione, insertionData[0].categoria, insertionData[0].materiali, insertionData[0].inserzionista);
        this.inserzione.immagini = insertionData[0].immagini;
        this.inserzione.titolo = insertionData[0].titolo;
        this.inserzione.prezzo = insertionData[0].prezzo;
        this.inserzione.dataPubblicazione = insertionData[0].dataPubblicazione;
        this.inserzione.descrizione = insertionData[0].descrizione;
        this.inserzione.id = insertionData[0].id;
        this.inserzione.paese = new Paese(insertionData[0].paese.id, insertionData[0].paese.nome);
        this.inserzione.categoria = new Paese(insertionData[0].categoria.id, insertionData[0].categoria.nome);;
        this.inserzione.materiali = [];
        for(let materiale of insertionData[0].materiali){
          this.inserzione.materiali.unshift(new Materiale(materiale.id, materiale.nome));
        }
        this.inserzione.inserzionista = new Utente(insertionData[0].inserzionista.nome, insertionData[0].inserzionista.email, insertionData[0].inserzionista.password, insertionData[0].inserzionista.dataIscrizione, insertionData[0].inserzionista.inserzioniPubblicate, insertionData[0].inserzionista.inserzioniOnline, insertionData[0].inserzionista.inserzioniPerCategoria, insertionData[0].inserzionista.inserzioni);
        this.immagini = this.inserzione.immagini;
        console.log(this.inserzione.paese);
        console.log(this.inserzione);
      });

  }

  getMoreHumanDate(): string{
    let tempDate = new Date(this.inserzione.dataPubblicazione);
    return tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DettaglioInserzionePage');
  }

}
