import * as http from "http";
import * as ws from "ws";
import{ Packet, NetHandler, DataTypes } from "nethandler";
import { Server } from "http";
import { GameObjectManager } from "../../core/GameObjectManager";
import { RWebSocketHost } from "../../core/networking/RWebSocketHost";
import { BasicHandler } from "../../core/networking/BasicHandler";



export class WebSocketServer extends RWebSocketHost {
    private wsServer: ws.Server | null;
    private port: number;

    constructor(port: number, handler: BasicHandler){
        super(handler);
        this.wsServer = null;
        this.port = port;
    }

    init(): void {
        this.wsServer = new ws.Server({port: this.port});
        this.wsServer.on("listening", () => { console.log("websocket listening on port "+ this.port); });
        this.wsServer.addListener("connection", this.onPlayerConnection);
        this.wsServer.addListener("error", (error: Error) => {
            console.log(error);
        });
    }

    private onPlayerConnection(ws: ws){
        console.log("websocket connection");
        
        this.handler.onConnect(ws);

        ws.on("message", (message:Buffer) => {
            let arrayBuffer = message.buffer.slice(message.byteOffset,message.byteOffset + message.byteLength);
            this.handler.Handle(arrayBuffer,ws);
        });

        ws.on('close', (code: number, reason:string) => {
            console.log("some1 disconnected");
            this.handler.onDisconnect(ws);
        });
    }

    private onPlayerMessage(){

    }


}