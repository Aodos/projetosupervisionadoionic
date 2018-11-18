import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_config } from "../../config/api.config";
import { RestauranteDTO } from "../../models/restaurantes.dto";
import { Observable } from "../../../node_modules/rxjs/Rx";

@Injectable()
export class RestaranteService{
    constructor(public http: HttpClient){

    }

    findAll() : Observable<RestauranteDTO[]> {
        return this.http.get<RestauranteDTO[]>(`${API_config.baseUrl}/restaurantes`);
    }
}