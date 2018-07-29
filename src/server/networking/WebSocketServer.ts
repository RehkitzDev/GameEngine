import * as http from "http";
import * as ws from "ws";
import{ Packet, NetHandler, DataTypes } from "nethandler";
import { Server } from "http";
import { GameObjectManager } from "../../core/GameObjectManager";



export class WebSocketServer {

    private gameObjectManager: GameObjectManager;
    private wsServer: ws.Server | null;
    private port: number;

    constructor(port: number, gameObjectManager: GameObjectManager){
        super();
        this.wsServer = null;
        this.port = port;
        this.gameObjectManager = gameObjectManager;
    }

    public connect(): void {
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