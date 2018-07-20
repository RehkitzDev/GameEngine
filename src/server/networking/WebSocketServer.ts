import { IWebSocket } from "../../core/networking/IWebSocketClient";
import{ Packet, NetHandler } from "nethandler";
import * as WebSocket from "ws";
import { Server } from "http";

export class WebSocketServer extends NetHandler implements IWebSocket{

    private wsServer: WebSocket.Server | null;
    private port: number;

    constructor(port: number){
        super();
        this.wsServer = null;
        this.port = port;
    }

    Connect(): void {
        this.wsServer = new WebSocket.Server({port: this.port});
        this.wsServer.on("connection",(ws) => {
            
        })

    }

    Send(packet: Packet){

    }
}