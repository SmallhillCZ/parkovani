import { Component, OnInit } from '@angular/core';

import { LoadingController, ModalController } from '@ionic/angular';

import { DataService } from "app/services/data.service";

import { AddLotComponent } from "app/components/add-lot/add-lot.component";

import { Lot } from "app/schema/lot";
import { LotStats } from "app/schema/stats";

export class LotCard {
  lot: Lot;
  open: boolean = false;
}

@Component({
  selector: 'app-my-lots',
  templateUrl: './my-lots.page.html',
  styleUrls: ['./my-lots.page.scss'],
})
export class MyLotsPage implements OnInit {

  cards: LotCard[] = [];

  hours:number[] = [];

  myNames: { [lotId: string]: string } = {};

  stats:LotStats;

  constructor(private dataService: DataService, private loadingController: LoadingController, private modalController: ModalController) {
    for(var i = 0; i < 24; i++) this.hours.push(i);
  }

  ngOnInit() {
    this.loadMyLots();
    this.loadMyNames();
    this.loadStats();
  }

  async loadMyLots() {

    const loading = await this.loadingController.create({
      translucent: true
    });
    await loading.present();

    const myLots = await this.dataService.getMyLots();

    const lots = (await this.dataService.getLots())
      .filter(lot => myLots.indexOf(lot.identifier) !== -1)
      .map(lot => ({ ...lot, timestamp: new Date(lot.source_timestamp) }));

    lots.sort((a, b) => a.address.localeCompare(b.address));

    this.cards = lots.map(lot => ({ open: false, lot }));

    loading.dismiss();
  }

  async loadMyNames() {
    this.myNames = await this.dataService.getMyNames();
  }

  async loadStats() {
    this.stats = await this.dataService.getStats();
  }

  async openAddLot() {
    const modal = await this.modalController.create({
      component: AddLotComponent,
    });

    modal.addEventListener("ionModalDidDismiss", () => this.loadMyLots());

    await modal.present();
  }

  async removeMyLot(lot:Lot):Promise<void> {
    await this.dataService.removeMyLot(lot.identifier);
    this.loadMyLots();
  }

  toggleCard(card:LotCard):void{
    if(card.open){
      card.open = false;
    }
    else{
      this.cards.forEach(card => card.open = false);
      card.open = true;
    }
  }

  navigate(e: Event, lot: Lot): void {
    e.stopPropagation();
  }

  getColor(lot:Lot){
    const pct = lot.freeSpots / lot.totalSpaces;
    if(pct >= 0.5) return "success";
    if(pct >= 0) return "warning";
    return "danger";
  }

}
