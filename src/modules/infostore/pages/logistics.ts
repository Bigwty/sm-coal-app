import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InfostoreService} from "../services/infostore.service";
import {LogisticsDetailPage} from "./logistics-detail";

/**
 * Generated class for the Logistics page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-logistics',
  templateUrl: 'logistics.html',
})
export class LogisticsPage {

  showCancelButton: boolean=true;
  cancelButtonText: string="搜索";
  queryText: string;

  logisticsList: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public infostoreService: InfostoreService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logistics');

    this.infostoreService.getLogisticsList({})
      .then( ret => {
        this.logisticsList = ret;
      });
  }

  doRefresh(refresher) {

    this.infostoreService.getLogisticsList({})
      .then( ret => {
        this.logisticsList = ret;
        refresher.complete();
      });
  }

  goLogisticsDetail(logistics) {

    this.navCtrl.push(LogisticsDetailPage, logistics)
  }

  doQuery(ev) {

    if(!this.queryText){
      this.queryText = null;
    }
    let text = this.queryText;
    let me = this;
    setTimeout(function () {
      me.queryText = text;
    }, 100);


    let data : any = {};
    data.destination = text;

    this.infostoreService.getLogisticsList(data)
      .then( ret => {
        this.logisticsList = ret;
      });
  }

}
