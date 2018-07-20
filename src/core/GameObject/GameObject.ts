import {InstancedMesh } from "babylonjs";

export abstract class GameObject{
    
    private id: number;
    private mesh: InstancedMesh;

    constructor(id: number,mesh: InstancedMesh){
        this.id = id;
        this.mesh = mesh;
    }

    public getId(): number{
        return this.id;
    }

    public getMesh(): InstancedMesh{
        return this.mesh;
    }

    public abstract Update(deltaTime: number): void;
}