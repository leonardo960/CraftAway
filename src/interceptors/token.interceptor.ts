import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { UtenteService } from '../services/utente.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public events: Events, private utenteService: UtenteService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        const authToken = this.utenteService.getActiveToken();
        if (authToken != undefined && authToken != "" && authToken != null) {
            console.log("adding token into header");
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({
                headers: req.headers.set("token", authToken)
            });

            // send cloned request with header to the next handler.
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }

}