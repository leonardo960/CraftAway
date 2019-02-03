import { Inserzione } from "./inserzione";


export class Utente{
  nome: string;
  email: string;
  password: string;
  dataIscrizione: Date;
  inserzioniPubblicate: number;
  inserzioniOnline: number;
  inserzioni: Inserzione[];

  constructor(
    nome: string, email: string, password: string, dataIscrizione: Date, inserzioniPubblicate: number,
    inserzioniOnline: number, inserzioni: Inserzione[]){
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.dataIscrizione = dataIscrizione;
      this.inserzioniPubblicate = inserzioniPubblicate;
      this.inserzioniOnline = inserzioniOnline;
      this.inserzioni = inserzioni;
    }


}
