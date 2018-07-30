import { REngine } from "../core/REngine";
import { NullEngine } from "babylonjs";
import { WebSocketServer } from "./networking/WebSocketServer";
import { Handler } from "./networking/Handler";

export class RServer extends REngine{

    constructor(port: number,networkUpdatesPerSecond:number, handler: Handler){
        super(new NullEngine(),networkUpdatesPerSecond,new WebSocketServer(port, handler));
        console.log("RServer Started");
    }

}