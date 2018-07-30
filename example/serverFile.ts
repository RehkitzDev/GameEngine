import { RServer } from "../src/server/RServer";
import { HemisphericLight, Vector3, FreeCamera } from "babylonjs";




let rserver = new RServer(1337,30,new Handler());
let light = new HemisphericLight("HemiLight",new Vector3(0,1,0),rserver.getScene());
let camera = new FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), rserver.getScene());


rserver.getAssetManager().load();




//README: "parcel --target=node dist/serverfile.js" BEI NODE ENV