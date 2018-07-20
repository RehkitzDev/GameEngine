import {InstancedMesh } from "babylonjs";
import { GameObject } from "./GameObject";

export abstract class NetGameObject extends GameObject{
    
    private id: number;

    constructor(id: number,mesh: InstancedMesh){
        super(mesh);
        this.id = id;
    }

    public getId(): number{
        return this.id;
    }

}