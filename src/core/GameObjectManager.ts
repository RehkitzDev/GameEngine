import { NetGameObject } from "./gameobject/NetGameObject";
import { LinesMesh } from "babylonjs";
import { AssetFactory } from "./AssetFactory";
import { GameObject } from "./gameobject/GameObject";

export class GameObjectManager{

    private assetFactory: AssetFactory;
    private gameObjects: Array<GameObject>;
    private networkedGameObjects: Map<number,NetGameObject>;

    constructor(assetFactory: AssetFactory){
        this.assetFactory = assetFactory;
        this.gameObjects = new Array<GameObject>();
        this.networkedGameObjects = new Map<number,NetGameObject>();
    }

    public addNetworkedGameObject(gameObject: NetGameObject){
        if(!this.networkedGameObjects.has(gameObject.getId()))
            this.networkedGameObjects.set(gameObject.getId(),gameObject);
    }


    public addOfflineGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
    }

    public removeNetworkedGameObject(gameObject: NetGameObject){
        if(this.networkedGameObjects.has(gameObject.getId())){
            gameObject.getMesh().dispose();
            this.networkedGameObjects.delete(gameObject.getId())
        }
    }

    public removeGameObject(gameObject: GameObject){
        gameObject.getMesh().dispose();
        this.gameObjects = this.gameObjects.filter(g => g != gameObject);    
    }

    public update(deletaTime: number){
        this.gameObjects.forEach((gameObject: GameObject) => {
            gameObject.Update(deletaTime);
        });

        this.networkedGameObjects.forEach((gameObject: GameObject, id: number) => {
            gameObject.Update(deletaTime);
        });
    }
}