import { InstancedMesh } from "babylonjs";

export abstract class GameObject{

    private mesh: InstancedMesh;

    constructor(mesh: InstancedMesh){
        this.mesh = mesh;
    }

    public getMesh(): InstancedMesh{
        return this.mesh;
    }

    public abstract Update(deltaTime: number): void;

}