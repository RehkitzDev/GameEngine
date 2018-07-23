import { RWebSocket } from "../../core/networking/RWebSocket";
import { Packet } from "nethandler";

export class WebSocketClient extends RWebSocket{

    private websocketUrl: string;
    private socket: WebSocket | null;

    constructor(websocketUrl: string){
        super();
        this.websocketUrl = websocketUrl;
        this.socket = null;
    }

    connect(): void {
        this.socket = new WebSocket(this.websocketUrl);
    }

    GetId(): number {
        throw new Error("Method not implemented.");
    }

    Send(packet: Packet): void{

    }

}