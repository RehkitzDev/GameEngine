import { GameObjectManager } from "../GameObjectManager";
import { BasicHandler } from "./BasicHandler";

export abstract class RWebSocketHost{
    
    protected gameObjectManager: GameObjectManager | null;
    protected handler: BasicHandler;

    constructor(handler: BasicHandler){
        this.handler = handler;
        this.gameObjectManager = null;
    }

    protected abstract init(): void;

    public connect(gameObjectManager: GameObjectManager){
        this.gameObjectManager = gameObjectManager;
        this.init();
    }

    public getGameObjectManager(): GameObjectManager{
        return this.gameObjectManager!;
    }

}