import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActivemenu]'
})
export class ActivemenuDirective {
  @HostListener('click') enablemenu() {
    // tslint:disable-next-line: no-debugger
    const selecteditem1 = document.querySelector('.selected');
     const selecteditem2 = this.el.nativeElement.parentElement.querySelector('.selected');
 if (selecteditem2 || selecteditem1) {
   const selectedItem = selecteditem1 ? selecteditem1 : selecteditem2;
  this.render.removeClass(selectedItem, 'selected');

 }
this.render.addClass(this.el.nativeElement, 'selected');
  }
  constructor(private el: ElementRef, private render: Renderer2) {}

}
