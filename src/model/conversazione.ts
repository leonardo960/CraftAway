import { Utente } from "./utente";
import { Messaggio } from "./messaggio";

export class Conversazione{
  id: string;
  utenteLoggato: Utente;
  altroUtente: Utente;
  messaggi: Messaggio[];

  constructor(id: string, utenteLoggato: Utente, altroUtente: Utente, messaggi: Messaggio[]){
    this.id = id;
    this.utenteLoggato = utenteLoggato;
    this.altroUtente = altroUtente;
    this.messaggi = messaggi;
  }
}
