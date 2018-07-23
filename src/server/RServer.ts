import { REngine } from "../core/REngine";
import { NullEngine } from "babylonjs";
import { WebSocketServer } from "./networking/WebSocketServer";

export class RServer extends REngine{

    constructor(port: number){
        super(new NullEngine(),new WebSocketServer(port));
        console.log("success");
    }

}