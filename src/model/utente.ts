import { Inserzione } from "./inserzione";


export class Utente{
  nome: string;
  email: string;
  password: string;
  dataIscrizione: Date;
  inserzioniPubblicate: number;
  inserzioniOnline: number;
  inserzioniPerCategoria: any; //è solo un oggetto javascript le cui proprietà (stringhe) saranno
                               //i nomi delle categorie e i valori il numero di inserzioni per quella categoria
  inserzioni: Inserzione[];

  constructor(
    nome: string, email: string, password: string, dataIscrizione: Date, inserzioniPubblicate: number,
    inserzioniOnline: number, inserzioniPerCategoria: any, inserzioni: Inserzione[]){
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.dataIscrizione = dataIscrizione;
      this.inserzioniPubblicate = inserzioniPubblicate;
      this.inserzioniOnline = inserzioniOnline;
      this.inserzioniPerCategoria = inserzioniPerCategoria;
      //^ teoricamente il dizionario JSON dovrebbe essere convertito in un oggetto javascript
      //direttamente assegnabile alla variabile; in caso contrario scriverò dei metodi di utility
      //per popolare la variabile a partire dal dizionario JSON
      this.inserzioni = inserzioni;
    }


}
