import { Component,NgZone } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public elementsManager:any = {
    availableElements: ['A','B','C','D','D','E','F','G','H','I','J','K','L','M','N'],
    selected: [],
    getArrayIndex: function(a,k,p){
      if(a&&a.length>0&&k&&p)
        for(var i=0;i<a.length;i++)
          if(a[i][p]==k)
            return i;
      return -1;
    },
    moveElementInArray: function(array,old_index, new_index) {
      if (new_index >= array.length) {
          var k = new_index - array.length;
          while ((k--) + 1) {
              array.push(undefined);
          }
      }
      array.splice(new_index, 0, array.splice(old_index, 1)[0]);
      return array;
    },
    elementsCount:0
  };
  constructor(public navCtrl: NavController,public zone:NgZone) {
    var me = this;
    this.elementsManager.getRandomElement = function(){
      var i = Math.ceil(Math.random() * me.elementsManager.availableElements.length) - 1;
      return {
        value: me.elementsManager.availableElements[i]
      };
    };
    this.elementsManager.refresh = function(){
      me.zone.run(() =>{});
    };
    this.elementsManager.addElement = function(){
      me.elementsManager.selected.push(me.elementsManager.getRandomElement());
    };
    this.elementsManager.addElement();
    this.elementsManager.addElement();
    this.elementsManager.addElement();
  }
  reorderItems(indexes) {
    this.elementsManager.moveElementInArray(this.elementsManager.selected,indexes.from,indexes.to);
    this.elementsManager.elementsCount = -1;
  }
}
