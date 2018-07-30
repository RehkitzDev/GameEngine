import { NetHandler } from "nethandler"
import { GameObjectManager } from "../GameObjectManager";
import { RWebSocketHost } from "./RWebSocketHost";

export abstract class BasicHandler extends NetHandler{

    protected webSocketHost: RWebSocketHost | null;

    constructor(){
        super();
        this.webSocketHost = null;
    }

    public init(webSocketHost: RWebSocketHost){
        this.webSocketHost = webSocketHost;
    }

}