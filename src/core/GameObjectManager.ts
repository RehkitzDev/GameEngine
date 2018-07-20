import { GameObject } from "./GameObject/GameObject";
import { LinesMesh } from "babylonjs";
import { AssetFactory } from "./AssetFactory";

export class GameObjectManager{

    private assetFactory: AssetFactory;
    private gameObjects: Map<number,GameObject>;
    private networkedGameObjects: Map<number,GameObject>;

    constructor(assetFactory: AssetFactory){
        this.assetFactory = assetFactory;
        this.gameObjects = new Map<number,GameObject>();
        this.networkedGameObjects = new Map<number,GameObject>();
    }

    public addNetworkedGameObject(gameObject: GameObject){
        if(!this.networkedGameObjects.has(gameObject.getId()))
            this.networkedGameObjects.set(gameObject.getId(),gameObject);
    }


    public addOfflineGameObject(gameObject: GameObject){
        if(!this.gameObjects.has(gameObject.getId()))
            this.gameObjects.set(gameObject.getId(),gameObject);
    }

    public removeNetworkedGameObject(gameObject: GameObject){
        if(this.networkedGameObjects.has(gameObject.getId())){
            gameObject.getMesh().dispose();
            this.networkedGameObjects.delete(gameObject.getId())
        }
    }

    public removeGameObject(gameObject: GameObject){
        if(this.gameObjects.has(gameObject.getId())){
            gameObject.getMesh().dispose();
            this.gameObjects.delete(gameObject.getId())
        }
    }

    public Update(deletaTime: number){
        this.gameObjects.forEach((gameObject: GameObject, id: number) => {
            gameObject.Update(deletaTime);
        });

        this.networkedGameObjects.forEach((gameObject: GameObject, id: number) => {
            gameObject.Update(deletaTime);
        });
    }
}