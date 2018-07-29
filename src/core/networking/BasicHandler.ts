import { NetHandler } from "nethandler"
import { GameObjectManager } from "../GameObjectManager";
import { RWebSocketHost } from "./RWebSocketHost";

export abstract class BasicHandler extends NetHandler{

    protected webSocketHost: RWebSocketHost;

    constructor(webSocketHost: RWebSocketHost){
        super();
        this.webSocketHost = webSocketHost;
    }

}