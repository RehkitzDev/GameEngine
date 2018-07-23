import { REngine } from "../core/REngine";
import { Engine } from "babylonjs";
import { WebSocketClient } from "./networking/WebSocketClient";

export class RClient extends REngine{

    constructor(canvas: HTMLCanvasElement,wsAdress: string){
        super(new Engine(canvas),new WebSocketClient(wsAdress));
        console.log("success");
    }

}