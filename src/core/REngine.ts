import { Engine, Scene,AssetsManager, NullEngine, AbstractAssetTask } from "babylonjs";
import { AssetFactory } from "./AssetFactory";
import { GameObjectManager } from "./GameObjectManager";
import { RWebSocket } from "./networking/RWebSocket";

export class REngine{
    
    private babylonEngine: Engine;
    private scene: Scene;

    private assetManager: AssetsManager;
    private gameObjectManager: GameObjectManager | null;
    private assetFactory: AssetFactory | null;
    private webSocket: RWebSocket;

    constructor(babylonEngine: Engine, ws: RWebSocket){
        this.babylonEngine = babylonEngine;
        this.webSocket = ws;

        this.scene = new Scene(this.babylonEngine);
        this.assetManager = new AssetsManager(this.scene);
        this.assetFactory = null;
        this.gameObjectManager = null;
        this.assetManager.onFinish = (tasks: AbstractAssetTask[]) => {  this.init(); };
    }

    public getDeltaTime(): number{
        return this.babylonEngine.getDeltaTime() / 1000;
    }

    public getAssetManager(): AssetsManager{
        return this.assetManager;
    }

    public getAssetFactory(): AssetFactory{
        return this.assetFactory!;
    }

    public getGameObjectManager(): GameObjectManager{
        return this.gameObjectManager!;
    }

    public Update(deltaTime: number){
        this.gameObjectManager!.update(deltaTime);
    }

    private init(){
        this.assetFactory = new AssetFactory(this.scene);
        this.gameObjectManager = new GameObjectManager(this.assetFactory);
        this.webSocket.connect();

        this.scene.onBeforeRenderObservable.add(() => {
            this.Update(this.getDeltaTime());
        });

        if(!(this.babylonEngine instanceof NullEngine))
            this.babylonEngine.runRenderLoop(() => { this.scene.render(); });
    }

    

}