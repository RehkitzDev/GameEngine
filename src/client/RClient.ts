import { REngine } from "../core/REngine";
import { Engine } from "babylonjs";
import { WebSocketClient } from "./networking/WebSocketClient";
import { Handler } from "./networking/Handler";

export class RClient extends REngine{

    constructor(canvas: HTMLCanvasElement,wsAdress: string, handler: Handler){
        super(new Engine(canvas),new WebSocketClient(wsAdress,handler));
        console.log("success");
    }

}