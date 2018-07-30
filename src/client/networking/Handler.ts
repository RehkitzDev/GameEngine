import { NetHandler } from "nethandler";
import { BasicHandler } from "../../core/networking/BasicHandler";
import { GameObjectManager } from "../../core/GameObjectManager";
import { WebSocketClient } from "./WebSocketClient";

export class Handler extends BasicHandler{

    constructor(webSocketHost: WebSocketClient){
        super(webSocketHost);
        this.OnConnect = this.OnConnection;
    }

    OnConnection(): void {
        throw new Error("Method not implemented.");
    }

}