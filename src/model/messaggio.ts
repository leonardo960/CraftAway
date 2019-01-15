import { Utente } from "./utente";


export class Messaggio{
  idConversazione: string;
  mittente: Utente;
  destinatario: Utente;
  timestamp: Date;
  testo: string;

  constructor(idConversazione: string, mittente: Utente, destinatario: Utente, timestamp: Date, testo: string){
    this.idConversazione = idConversazione;
    this.mittente = mittente;
    this.destinatario = destinatario;
    this.timestamp = timestamp;
    this.testo = testo;
  }
}
