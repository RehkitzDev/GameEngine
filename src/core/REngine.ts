import { Engine, Scene,AssetsManager, NullEngine } from "babylonjs";
import { IWebSocket } from "./networking/IWebSocketClient";
import { AssetFactory } from "./AssetFactory";
import { GameObjectManager } from "./GameObjectManager";

export class REngine{
    
    private babylonEngine: Engine;
    private scene: Scene;

    private assetManager: AssetsManager;
    private gameObjectManager: GameObjectManager | null;
    private assetFactory: AssetFactory | null;
    private webSocket: IWebSocket;

    constructor(babylonEngine: Engine, ws: IWebSocket){
        this.babylonEngine = babylonEngine;
        this.webSocket = ws;

        this.scene = new Scene(this.babylonEngine);
        this.assetManager = new AssetsManager(this.scene);
        this.assetFactory = null;
        this.gameObjectManager = null;
        this.assetManager.onFinish = this.init;
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
        this.gameObjectManager!.Update(deltaTime);
    }

    private init(){
        this.assetFactory = new AssetFactory(this.scene);
        this.gameObjectManager = new GameObjectManager(this.assetFactory);
        this.webSocket.Connect();

        this.scene.onBeforeRenderObservable.add(() => {
            this.Update(this.getDeltaTime());
        });

        if(!(this.babylonEngine instanceof NullEngine))
            this.babylonEngine.runRenderLoop(() => { this.scene.render(); });
    }

    

}