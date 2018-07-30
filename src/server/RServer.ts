import { REngine } from "../core/REngine";
import { NullEngine } from "babylonjs";
import { WebSocketServer } from "./networking/WebSocketServer";
import { Handler } from "./networking/Handler";

export class RServer extends REngine{

    constructor(port: number, handler: Handler){
        super(new NullEngine(),new WebSocketServer(port, handler));
        console.log("success");
    }

}