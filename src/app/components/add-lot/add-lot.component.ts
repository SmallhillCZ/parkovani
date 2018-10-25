import { Component, OnInit } from '@angular/core';

import { ModalController, LoadingController } from '@ionic/angular';

import { DataService } from 'app/services/data.service';
import { Lot } from "app/schema/lot";

@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.scss']
})
export class AddLotComponent implements OnInit {

  lots: Lot[] = [];

  constructor(private dataService: DataService, private modalController: ModalController, private loadingController:LoadingController) { }

  ngOnInit() {
    this.loadLots();
  }

  async loadLots() {

    const myLots = await this.dataService.getMyLots();

    const loading = await this.loadingController.create({
      translucent: true
    });
    await loading.present();
    
    const lots = (await this.dataService.getLots()).filter(lot => myLots.indexOf(lot.identifier) === -1);

    lots.sort((a, b) => a.address.localeCompare(b.address));

    this.lots = lots;
    
    loading.dismiss();
  }

  async addLot(lot){
    await this.dataService.addMyLot(lot.identifier);
    this.close();
  }

  close():void{
    this.modalController.dismiss();
  }

}
