import { IWebSocket } from "../../core/networking/IWebSocket";
import { Packet } from "nethandler";

export class WebSocketClient implements IWebSocket{

    private websocketUrl: string;
    private socket: WebSocket | null;

    constructor(websocketUrl: string){
        this.websocketUrl = websocketUrl;
        this.socket = null;
    }

    Connect(): void {
        this.socket = new WebSocket(this.websocketUrl);
    }

    GetId(): number {
        throw new Error("Method not implemented.");
    }

    Send(packet: Packet): void{

    }

}