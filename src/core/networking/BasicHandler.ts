import { NetHandler } from "nethandler"

export class BasicHandler extends NetHandler{

    //WebSocket message mit der Handle Function verkuppeln

    constructor(){
        super();
        this.OnConnect = () => {this.OnConnect()};
    }

    public OnConnect(){

    }

}