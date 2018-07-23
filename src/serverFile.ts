import { RServer } from "../src/server/RServer";




let rserver = new RServer(1337);
rserver.getAssetManager().load();




//README: "parcel --target=node dist/serverfile.js" BEI NODE ENV