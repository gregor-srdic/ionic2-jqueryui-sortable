import { Component, ElementRef,Input,OnInit  } from '@angular/core';
declare var $;
@Component({
  selector: 'sortable-grid',
  templateUrl: 'sortable-grid.html'
})
export class SortableGrid implements OnInit{
  @Input() data:any;
  public container:any;
  public elementsCount = 0;
  public idPrefix = 'sortable_';
  constructor(public el:ElementRef){
    console.log('constructor');
  };
  ngOnInit(){
    console.log('ngOnInit');
    this.elementsCount = 0;
    this.container = $(this.el.nativeElement).find('#sortable');
    this.container.sortable({
      placeholder: "sortable-element-placeholder",
      opacity:0.6,
      items: '.sortable-element',
      //revert: true,
      scroll:false,
      start: (e, ui) => {  },
      over: (e, ui) => { ui.item.removeClass('should-delete'); },
      out: (e, ui) => { ui.item.addClass('should-delete'); },
      beforeStop: (e,ui) => { 
        if(ui.item.hasClass('should-delete')){
          let id = ui.item.attr('id');
          let oldPosition = getArrayIndex(this.data,id,'id');
          if(oldPosition>-1){
            this.data.splice(oldPosition,1);
            this.elementsCount = this.data.length;
          }
          ui.item.remove();
        }
      },
      update: (e,ui) => {
        let newPosition = ui.item.index();
        let id = ui.item.attr('id');
        let oldPosition = getArrayIndex(this.data,id,'id');
        if(oldPosition>-1&&oldPosition!=newPosition){
          moveElementInArray(this.data,oldPosition,newPosition);
        }
      }
    });
    this.container.disableSelection();
  }
  ngDoCheck() {
    if(this.data.length!=this.elementsCount){
      console.warn('Drawing');
      this.elementsCount = this.data.length;
      this.container.empty();
      for(var i=0,e;i<this.data.length;i++){
        e = this.data [i];
        e.id = [this.idPrefix,i].join('');
        this.container.append($(`<div class="sortable-element" id="${e.id}"><span>${e.value+' '+i}</span></div>`,{}));
      }
      this.container.append($(`<div class="clearfix"></div>`,{}));
    }
  }
}
function getArrayIndex(a,k,p){
  if(a&&a.length>0&&k&&p)
    for(var i=0;i<a.length;i++)
      if(a[i][p]==k)
        return i;
  return -1;
}
function moveElementInArray(array,old_index, new_index) {
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    return array; // for testing purposes
};