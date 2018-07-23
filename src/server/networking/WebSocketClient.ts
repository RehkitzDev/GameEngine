import { Packet } from "nethandler";
import { IWebSocketClient } from "../../core/networking/IWebSocketClient";

export class WebSocketClient implements IWebSocketClient{

    
    GetId(): number {
        return -1;
    }

    Send(packet: Packet){
        
    }

}