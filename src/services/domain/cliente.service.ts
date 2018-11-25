import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { ClienteDTO } from "../../models/clientes.dto";
import { API_config } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ClienteCadastro } from "../../models/clientesCadastro.dto.";

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient, public storage: StorageService){

    }

    retornaCliente(): Observable<ClienteDTO[]>{
        let token = this.storage.getLocalUser();
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.get<ClienteDTO[]>(`${API_config.baseUrl}/clientes/email?email=${localStorage.getItem("emailLogado")}`,
        {'headers': authHeader});
    }

    cadastraCliente(cliente: ClienteCadastro){
        let token = this.storage.getLocalUser();
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.post(`${API_config.baseUrl}/clientes`, cliente, {observe: 'response',  responseType: 'text', 'headers': authHeader});
    }
}