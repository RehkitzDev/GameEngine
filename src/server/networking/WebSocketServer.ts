import * as ws from "ws";
import { IWebSocket } from "../../core/networking/IWebSocket";
import{ Packet, NetHandler, DataTypes } from "nethandler";
import { Server } from "http";
import { IWebSocketClient } from "../../core/networking/IWebSocketClient";



export class WebSocketServer extends NetHandler implements IWebSocket{

    private players: Map<number, WebSocket>;
    private wsServer: ws.Server | null;
    private port: number;

    constructor(port: number){
        super();
        this.wsServer = null;
        this.port = port;
        this.players = new Map<number,WebSocket>();
    }

    public Connect(): void {
        this.wsServer = new ws.Server({port: this.port});
        this.wsServer.addListener("connection", this.onPlayerConnection);
    }

    private onPlayerConnection(ws: WebSocket){
        console.log("websocket connection");
    }

    private onPlayerMessage(){

    }

    private getFreeId() : number{
        for(let i=0; i < 65535; i++)
            if(!this.players.has(i))
                return i;
        return -1;
    }

}