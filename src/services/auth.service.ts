import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { API_config } from '../config/api.config';


@Injectable()
export class AuthService {

    constructor(public http: HttpClient){

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
}