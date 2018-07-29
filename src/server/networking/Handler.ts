import { NetHandler } from "nethandler";
import { BasicHandler } from "../../core/networking/BasicHandler";

export class Handler extends BasicHandler{

    constructor(){
        super();
    }

    OnConnection(): void {
        throw new Error("Method not implemented.");
    }

}