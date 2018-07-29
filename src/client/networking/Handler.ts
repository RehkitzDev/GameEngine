import { NetHandler } from "nethandler";
import { BasicHandler } from "../../core/networking/BasicHandler";
import { GameObjectManager } from "../../core/GameObjectManager";
import { WebSocketClient } from "./WebSocketClient";

export class Handler extends BasicHandler{

    protected webSocketHost: WebSocketClient;

    constructor(webSocketHost: WebSocketClient){
        super();
        this.webSocketHost = webSocketHost;
    }

    OnConnection(): void {
        throw new Error("Method not implemented.");
    }

}