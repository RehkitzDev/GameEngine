import { RClient } from "./client/RClient";
import { Handler } from "./client/networking/Handler";
import { HemisphericLight, Vector3, FreeCamera } from "babylonjs";

window.addEventListener('DOMContentLoaded', function(){ 
    let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    let client = new RClient(canvas,30,"ws://127.0.0.1:1337",new Handler());
    let light = new HemisphericLight("HemiLight",new Vector3(0,1,0),client.getScene());
    let camera = new FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), client.getScene());
    client.getAssetManager().load();
});