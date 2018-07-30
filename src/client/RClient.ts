import { REngine } from "../core/REngine";
import { Engine } from "babylonjs";
import { WebSocketClient } from "./networking/WebSocketClient";
import { BasicHandler } from "../core/networking/BasicHandler";

export class RClient extends REngine{

    constructor(canvas: HTMLCanvasElement,networkUpdatesPerSecond:number ,wsAdress: string, handler: BasicHandler){
        super(new Engine(canvas),networkUpdatesPerSecond,new WebSocketClient(wsAdress,handler));
        console.log("RCLient Started");
    }

}