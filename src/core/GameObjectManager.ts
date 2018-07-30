import { NetGameObject } from "./gameobject/NetGameObject";
import { LinesMesh } from "babylonjs";
import { AssetFactory } from "./AssetFactory";
import { GameObject } from "./gameobject/GameObject";
import { ConnectedPlayer } from "./networking/ConnectedPlayer";

export class GameObjectManager{

    protected assetFactory: AssetFactory;
    protected gameObjects: Array<GameObject>;
    protected networkedGameObjects: Map<number,NetGameObject>;
    protected connectedPlayers: Map<number, ConnectedPlayer>;

    constructor(assetFactory: AssetFactory){
        this.assetFactory = assetFactory;
        this.gameObjects = new Array<GameObject>();
        this.networkedGameObjects = new Map<number,NetGameObject>();
        this.connectedPlayers = new Map<number, ConnectedPlayer>();
    }

    public getFreePlayerId(): number{
        for(let i=0; i < 65535; i++)
            if(!this.connectedPlayers.has(i))
                return i;
        return -1;
    }

    public getFreeGameObjectId(): number{
        for(let i=0; i < 65535; i++)
            if(!this.networkedGameObjects.has(i))
                return i;
        return -1;
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
            gameObject.update(deletaTime);
        });

        this.networkedGameObjects.forEach((gameObject: GameObject, id: number) => {
            gameObject.update(deletaTime);
        });
    }

    public netWorkUpdate(deltaTime: number){
        this.networkedGameObjects.forEach((gameObject: NetGameObject, id: number) => {
            gameObject.networkedUpdate(deltaTime);
        });
    }
}