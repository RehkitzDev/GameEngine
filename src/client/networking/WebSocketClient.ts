import { Packet } from "nethandler";
import { RWebSocketHost } from "../../core/networking/RWebSocketHost";
import { BasicHandler } from "../../core/networking/BasicHandler";

export class WebSocketClient extends RWebSocketHost{
    
    private id: number;
    private websocketUrl: string;
    private socket: WebSocket | null;

    constructor(websocketUrl: string,handler:BasicHandler){
        super(handler);
        this.websocketUrl = websocketUrl;
        this.socket = null;
        this.id = -1;
    }

    init(): void {
        this.socket = new WebSocket(this.websocketUrl);
        this.socket.binaryType = "arraybuffer";
        this.socket.onopen = (event: Event) => { this.handler.onConnect(event); };
        this.socket.onclose = (event: Event) => { this.handler.onDisconnect(event); };
        this.socket.onmessage = (event: MessageEvent) => { this.onMessage(event); };
    }

    private onMessage(msg: MessageEvent){
        if(msg.type != "string")
            this.handler.Handle(msg.data,{});
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