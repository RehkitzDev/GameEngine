import{ Packet } from "nethandler";

export interface IWebSocket{

    Connect(): void;
    Send(packet: Packet): void;
    GetId(): number;

    //addOnConnectEvent(func: Function): void;
    /*
    OnConnect(event: any): void;
    OnMessage(data: ArrayBuffer): void;
    OnDisconnect(event: any): void;
    */
}