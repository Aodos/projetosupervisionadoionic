import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { API_config } from '../config/api.config';
import { LocalUser } from '../models/local.user';
import { StorageService } from './storage.service';


@Injectable()
export class AuthService {

    constructor(public http: HttpClient,
        public storage: StorageService){

    }

    autheticate(credencial: CredenciaisDTO){
        return this.http.post(
            `${API_config.baseUrl}/login`,
             credencial,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfulLogin(authorizationValue : string){
        
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}