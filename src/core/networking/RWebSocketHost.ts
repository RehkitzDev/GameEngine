import { GameObjectManager } from "../GameObjectManager";
import { BasicHandler } from "./BasicHandler";

export abstract class RWebSocketHost{
    
    protected gameObjectManager: GameObjectManager;
    protected abstract handler: BasicHandler;

    constructor(gameObjectManager: GameObjectManager){
        this.gameObjectManager = gameObjectManager;
    }

    abstract connect(): void;
    abstract onConnection(): void;

    public getGameObjectManager(): GameObjectManager{
        return this.gameObjectManager;
    }

}