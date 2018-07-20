import { REngine } from "../core/REngine";
import { NullEngine } from "babylonjs";
import { WebSocketServer } from "./networking/WebSocketServer";

export class RServer extends REngine{

    constructor(){
        super(new NullEngine(),new WebSocketServer(1337));
        console.log("success");
    }

}


window.addEventListener('DOMContentLoaded', function(){ 
    let server = new RServer();
});