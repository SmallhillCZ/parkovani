import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";

import { Storage } from '@ionic/storage';

import { Lot } from "app/schema/lot";

import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  api_root:string = environment.api_root;

  constructor(private http:HttpClient, private storage:Storage) { }

  getLots():Promise<Lot[]>{
    return this.http.get<Lot[]>(this.api_root + "/lots").toPromise();
  }

  getMyLots():Promise<string[]>{
    return this.storage.get("myLots").then(lots => lots || []);
  }

  async addMyLot(lotId:string):Promise<void>{
    const myLots = await this.getMyLots();
    if(myLots.indexOf(lotId) === -1) myLots.push(lotId);
    await this.storage.set("myLots",myLots);
  }

  async removeMyLot(lotId:string):Promise<void>{
    const myLots = await this.getMyLots();
    await this.storage.set("myLots",myLots.filter(lot => lot !== lotId));
  }

  getMyNames():Promise<any>{
    return this.storage.get("myNames").then(myNames => myNames || {});
  }

  async setMyName(lotId:string,name:string):Promise<void>{
    const myNames = await this.getMyNames();
    myNames[lotId] = name;
    await this.storage.set("myNames",myNames);
  }

  getStats():Promise<any>{
    return this.http.get<any>(this.api_root + "/stats").toPromise();
  }
}
