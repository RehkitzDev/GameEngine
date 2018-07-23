import { ConnectedPlayer } from "./ConnectedPlayer";

export abstract class RWebSocket{
    protected connectedPlayers: Map<number, ConnectedPlayer>;

    constructor(){
        this.connectedPlayers = new Map<number,ConnectedPlayer>();
    }

    abstract connect(): void;
}