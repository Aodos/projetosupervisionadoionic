import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "../../../node_modules/@angular/common/http";
import { API_config } from "../../config/api.config";
import { RestauranteDTO } from "../../models/restaurantes.dto";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { StorageService } from "../storage.service";

@Injectable()
export class RestaranteService{
    constructor(public http: HttpClient, public storage: StorageService){

    }

    findAll() : Observable<RestauranteDTO[]> {
        let token = this.storage.getLocalUser();
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.get<RestauranteDTO[]>(`${API_config.baseUrl}/restaurantes`,
        {'headers': authHeader});
    }

    findNear(lat:any, lng:any) : Observable<RestauranteDTO[]> {
        let token = this.storage.getLocalUser();
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let params = new HttpParams()
            .set('lat', lat)
            .set('lng', lng);
        return this.http.get<RestauranteDTO[]>(`${API_config.baseUrl}/restaurantes/proximos`,
        {'params': params, 'headers': authHeader});
    }
}