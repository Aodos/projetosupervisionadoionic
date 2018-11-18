import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_config } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { ItensDTO } from "../../models/intens.rest";

@Injectable()
export class ItensService{
    constructor(
        public http: HttpClient){

    }

    findAll(idRest:string) : Observable<ItensDTO[]> {
        return this.http.get<ItensDTO[]>(`${API_config.baseUrl}/itens-restaurante/${idRest}`);
    }
}