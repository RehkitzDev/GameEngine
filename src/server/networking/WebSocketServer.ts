import * as http from "http";
import * as ws from "ws";
import{ Packet, NetHandler, DataTypes } from "nethandler";
import { Server } from "http";
import { GameObjectManager } from "../../core/GameObjectManager";
import { RWebSocketHost } from "../../core/networking/RWebSocketHost";
import { Handler } from "./Handler";



export class WebSocketServer extends RWebSocketHost {
    private wsServer: ws.Server | null;
    private port: number;

    constructor(port: number, handler: Handler){
        super(handler);
        this.wsServer = null;
        this.port = port;
        this.handler = new Handler(this);
    }

    init(): void {
        this.wsServer = new ws.Server({port: this.port});
        this.wsServer.on("listening", () => { console.log("websocket listening on port "+ this.port); });
        this.wsServer.addListener("connection", this.onPlayerConnection); 
    }

    private onPlayerConnection(ws: WebSocket){
        console.log("websocket connection");
        console.log(ws);
        //ws.addEventListener("message")
    }

    private onPlayerMessage(){

    }


}