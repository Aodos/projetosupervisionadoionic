import { Injectable } from "../../node_modules/@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local.user";

@Injectable()
export class StorageService{

    getLocalUser() : string {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        } else {
            return usr;
        }
    }

    setLocalUser(obj : LocalUser){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, obj.token);
        }
    }
}