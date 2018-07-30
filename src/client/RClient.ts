import { REngine } from "../core/REngine";
import { Engine } from "babylonjs";
import { WebSocketClient } from "./networking/WebSocketClient";
import { Handler } from "./networking/Handler";

export class RClient extends REngine{

    constructor(canvas: HTMLCanvasElement,networkUpdatesPerSecond:number ,wsAdress: string, handler: Handler){
        super(new Engine(canvas),networkUpdatesPerSecond,new WebSocketClient(wsAdress,handler));
        console.log("success");
    }

}