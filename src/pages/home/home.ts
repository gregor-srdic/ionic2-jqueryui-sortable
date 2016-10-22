import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public availableElements = ['A','B','C','D','D','E','F','G','H','I','J','K','L','M','N'];
  public elements = [];
  constructor(public navCtrl: NavController) {
    this.elements.push(this.getRandomElement());
    this.elements.push(this.getRandomElement());
    this.elements.push(this.getRandomElement());
    this.elements.push(this.getRandomElement());
  }
  addElement(){
    this.elements.push(this.getRandomElement());
  }
  getRandomElement(){
    var i = Math.ceil(Math.random() * this.availableElements.length) - 1;
    return {
      value: this.availableElements[i]
    };
  }
}
