import { Engine, Scene,AssetsManager, NullEngine, AbstractAssetTask } from "babylonjs";
import { AssetFactory } from "./AssetFactory";
import { GameObjectManager } from "./GameObjectManager";
import { RWebSocketHost } from "./networking/RWebSocketHost";

export class REngine{
    
    private babylonEngine: Engine;
    private scene: Scene;

    private assetManager: AssetsManager;
    private gameObjectManager: GameObjectManager | null;
    private assetFactory: AssetFactory | null;
    private wsHost: RWebSocketHost;

    private netWorkUpdateTime: number;
    private netWorkCurrentUpdateTime: number;

    constructor(babylonEngine: Engine,networtUpdateTime: number, wsHost: RWebSocketHost){
        this.babylonEngine = babylonEngine;
        this.wsHost = wsHost;

        this.netWorkUpdateTime = networtUpdateTime;
        this.netWorkCurrentUpdateTime = 0;

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

        if(this.netWorkCurrentUpdateTime >= this.netWorkUpdateTime)
            this.NetWorkUpdate(this.netWorkCurrentUpdateTime);
    }

    public NetWorkUpdate(deltaTime: number){
        this.gameObjectManager!.netWorkUpdate(deltaTime);
        this.netWorkCurrentUpdateTime = 0;
    }

    private init(){
        this.assetFactory = new AssetFactory(this.scene);
        this.gameObjectManager = new GameObjectManager(this.assetFactory);
        this.wsHost.connect(this.gameObjectManager);

        this.scene.onBeforeRenderObservable.add(() => {
            this.Update(this.getDeltaTime());
        });

        if(!(this.babylonEngine instanceof NullEngine))
            this.babylonEngine.runRenderLoop(() => { this.scene.render(); });
    }

    

}