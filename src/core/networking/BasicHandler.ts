import { NetHandler } from "nethandler"

export class BasicHandler extends NetHandler{

    //WebSocket message mit der Handle Function verkuppeln
    //Ka was onconnect soll

    // Basic Handler für server + client erstellen damit man die standard sachen wie id's
    // und gameobject movement hat

    constructor(){
        super();
        this.OnConnect = () => {this.OnConnection()};
    }

    public OnConnection(){

    }

}