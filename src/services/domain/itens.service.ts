import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "../../../node_modules/@angular/common/http";
import { API_config } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { ItensDTO } from "../../models/intens.rest";
import { StorageService } from "../storage.service";
import { PedidosDTO } from "../../models/pedidos";
import { RestauranteDTO } from "../../models/restaurantes.dto";

@Injectable()
export class ItensService{
    constructor(
        public http: HttpClient, public storage: StorageService){

    }

    findAll(idRest:string) : Observable<ItensDTO[]> {
        let token = this.storage.getLocalUser();
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.get<ItensDTO[]>(`${API_config.baseUrl}/itens-restaurante/${idRest}`,
        {'headers': authHeader});
    }

    criaPedido(idCliente:string, idRestaurante:string){
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let params = new HttpParams()
            .set('idCliente', idCliente)
            .set('idRestaurante', idRestaurante);
        return this.http.post<PedidosDTO>(`${API_config.baseUrl}/pedidos`, null, {'params': params, 'headers': authHeader2});
    }

    retornaPedido() : Observable<PedidosDTO>{
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.get<PedidosDTO>(`${API_config.baseUrl}/pedidos/${localStorage.getItem("numeroPedido")}`,
        {'headers': authHeader2});
    }

    limpaPedido(){
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        console.log(`${API_config.baseUrl}/pedidos/${localStorage.getItem("numeroPedido")}/zerapedido`);
        return this.http.delete(`${API_config.baseUrl}/pedidos/${localStorage.getItem("numeroPedido")}/zerapedido`,{'headers': authHeader2});
    }

    addItem(idItem: string, qnt:string){
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        let params = new HttpParams()
            .set('idItem', idItem)
            .set('qnt', qnt);
            console.log("ta no add item");
        return this.http.post(`${API_config.baseUrl}/pedidos/${localStorage.getItem("numeroPedido")}`, null, {'params': params, 'headers': authHeader2, observe: 'response'});
    }

    finalizaPgto(){
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.put(`${API_config.baseUrl}/pedidos/${localStorage.getItem("numeroPedido")}/pago`, null, {'headers': authHeader2, observe: 'response'});
    }

    retornaTodosPedidos() : Observable<PedidosDTO[]>{
        let token = this.storage.getLocalUser();
        let authHeader2 = new HttpHeaders({'Authorization': 'Bearer ' + token});
        return this.http.get<PedidosDTO[]>(`${API_config.baseUrl}/pedidos/${localStorage.getItem("idUserName")}/pedidos`,
        {'headers': authHeader2});
    }

    retornaRestaurante(id:string){
        return this.http.get(`${API_config.baseUrl}/restaurantes/`+id, {
            observe: 'response'
        });
    }

    cadastraRest(bodi:RestauranteDTO){
        console.log(bodi);
        return this.http.post(`${API_config.baseUrl}/restaurantes`, bodi, {
            observe: 'response'
        });
    }

    cadastraItem(bodi:ItensDTO){
        console.log(bodi);
        return this.http.post(`${API_config.baseUrl}/itens-restaurante`, bodi, {
            observe: 'response'
        });
    }

}