import { Component, ElementRef,Input,OnInit  } from '@angular/core';
declare var $;
@Component({
  selector: 'sortable-grid',
  templateUrl: 'sortable-grid.html'
})
export class SortableGrid implements OnInit{
  @Input() data:any;
  @Input() manager:any;
  public container:any;
  public idPrefix = 'sortable_';
  constructor(public el:ElementRef){};
  ngOnInit(){
    this.container = $(this.el.nativeElement).find('#sortable');
    this.container.on('click','.add-element',()=>{
      this.manager.addElement();
    });
    this.container.sortable({
      placeholder: 'sortable-element-placeholder',
      opacity:0.6,
      items: '.sortable-element',
      //containment:'.ion-page.show-page',
      //revert: true,
      tolerance:'pointer',
      handle: '.handle',
      scroll:false,
      start: (e, ui) => {  },
      over: (e, ui) => { 
        ui.item.removeClass('should-delete');
        if(ui.placeholder)
          ui.placeholder.show();
      },
      out: (e, ui) => { 
        ui.item.addClass('should-delete');
        if(ui.placeholder)
          ui.placeholder.hide();
      },
      beforeStop: (e,ui) => { 
        if(ui.item.hasClass('should-delete')){
          let id = ui.item.attr('id');
          let oldPosition = this.manager.getArrayIndex(this.data,id,'id');
          if(oldPosition>-1){
            this.data.splice(oldPosition,1);
            this.manager.elementsCount = this.data.length;
          }
          ui.item.remove();
          this.manager.refresh();
        }
      },
      update: (e,ui) => {
        let newPosition = ui.item.index();
        let id = ui.item.attr('id');
        let oldPosition = this.manager.getArrayIndex(this.data,id,'id');
        if(oldPosition>-1&&oldPosition!=newPosition){
          this.manager.moveElementInArray(this.data,oldPosition,newPosition);
        }
        this.manager.refresh();
      }
    });
    this.container.disableSelection();
  }
  ngDoCheck() {
    if(this.data.length!=this.manager.elementsCount){
      this.manager.elementsCount = this.data.length;
      this.container.empty();
      for(var i=0,e;i<this.data.length;i++){
        e = this.data [i];
        e.id = [this.idPrefix,i].join('');
        this.container.append($(`<div class="sortable-element" id="${e.id}"><span class="handle">${e.value+' '+i}</span></div>`,{}));
      }
      this.container.append($(`<button class="add-element disable-hover button button-clear"><span class="button-inner">+<br/>Add</span><div class="button-effect"></div></button>`,{}));
      this.container.append($(`<div class="clearfix"></div>`,{}));
    }
  }
}