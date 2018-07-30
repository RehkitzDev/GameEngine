import { NetHandler } from "nethandler";
import { BasicHandler } from "../../core/networking/BasicHandler";
import { WebSocketServer } from "./WebSocketServer";

export class Handler extends BasicHandler{

    constructor(){
        super();
        this.OnConnect = this.OnConnection;
    }

    OnConnection(): void {
        throw new Error("Method not implemented.");
    }

}