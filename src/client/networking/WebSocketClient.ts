import { Packet } from "nethandler";
import { Handler } from "./Handler";
import { GameObjectManager } from "../../core/GameObjectManager";
import { RWebSocketHost } from "../../core/networking/RWebSocketHost";

export class WebSocketClient extends RWebSocketHost{
    
    private id: number;
    private websocketUrl: string;
    private socket: WebSocket | null;

    constructor(websocketUrl: string,handler:Handler){
        super(handler);
        this.websocketUrl = websocketUrl;
        this.socket = null;
        this.handler = new Handler(this);
        this.id = -1;
    }

    init(): void {
        this.socket = new WebSocket(this.websocketUrl);
    }

    public setId(id: number): void{
        if(this.id == -1)
            this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public send(packet: Packet): void{
        this.socket!.send(this.handler.PacketToArrayBuffer(packet));
    }

}