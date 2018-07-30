import { REngine } from "../core/REngine";
import { NullEngine } from "babylonjs";
import { WebSocketServer } from "./networking/WebSocketServer";
import { BasicHandler } from "../core/networking/BasicHandler";

export class RServer extends REngine{

    constructor(port: number,networkUpdatesPerSecond:number, handler: BasicHandler){
        super(new NullEngine(),networkUpdatesPerSecond,new WebSocketServer(port, handler));
        console.log("RServer Started");
    }

}