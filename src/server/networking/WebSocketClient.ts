import { Packet } from "nethandler";
import { ConnectedPlayer } from "../../core/networking/ConnectedPlayer";

export class WebSocketClient extends ConnectedPlayer{

    constructor(clientId: number){
        super(clientId);
    }
    
    Send(packet: Packet){
        
    }

}