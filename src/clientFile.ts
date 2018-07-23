import { RClient } from "../src/client/RClient";

window.addEventListener('DOMContentLoaded', function(){ 
    let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    let client = new RClient(canvas,"ws://127.0.0.1:1337");
    client.getAssetManager().load();
});