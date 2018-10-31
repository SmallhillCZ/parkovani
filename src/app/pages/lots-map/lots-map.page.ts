import { Component, OnInit } from '@angular/core';

import { Environment, GoogleMaps, GoogleMap, MarkerOptions } from "@ionic-native/google-maps";
import { Platform } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-lots-map',
  templateUrl: './lots-map.page.html',
  styleUrls: ['./lots-map.page.scss'],
})
export class LotsMapPage implements OnInit {

  map: GoogleMap;

  constructor(private platform: Platform, private dataService:DataService) { }

  ngOnInit() {
    this.loadMap().then(map => this.updateLots())
    
  }

  async loadMap() {

    await this.platform.ready();

    Environment.setEnv({
      // api key for server
      'API_KEY_FOR_BROWSER_RELEASE': environment.geo_key,

      // api key for local development
      'API_KEY_FOR_BROWSER_DEBUG': environment.geo_key
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {//50.0755° N, 14.4378° E
          lat: 50.0755,
          lng: 14.4378
        },
        zoom: 18,
        tilt: 30
      }
    });

    this.map.setTrafficEnabled(true);
  }
  async updateLots() {

    console.log("Loading lots to map...");
    await this.map.clear();

    const lots = await this.dataService.getLots();

    const cameraTarget:Array<{lat:number,lng:number}> = [];
    
    lots.forEach(lot => {

      let color = "green";
      if(lot.freeSpots / lot.totalSpaces < 0.5) color = "orange";
      if(lot.freeSpots === 0) color = "red";

      let coords = {lat: lot.latitude,lng: lot.longitude};

      cameraTarget.push(coords);

      const markerOptions:MarkerOptions = {
        position: coords,

        icon: color,

        title: lot.address.split(",")[0],

        snippet: "Volná místa: " + lot.freeSpots + " z " + lot.totalSpaces
      }
      this.map.addMarker(markerOptions);
    });

    this.map.moveCamera({target: cameraTarget});

  }

}
