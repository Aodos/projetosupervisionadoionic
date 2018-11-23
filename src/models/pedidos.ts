import { ItensPedidosDTO } from "./itens.pedidos";

export interface PedidosDTO{
    idPedido:string,
    idCliente: string,
    idRestaurante: string,
    nomeCliente: string,
    nomeRestaurante: string,
    valorTotal: string,
    dataPedido: string,
    itensPedido: ItensPedidosDTO[]
}