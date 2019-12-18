import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOnHover]'
})
export class OnHoverDirective {
@HostListener('mouseover') enablemenu() {
  const selecteditem = document.querySelectorAll('.customhover');
  selecteditem.forEach((item) => {
    this.render.addClass(item, 'onHoverForDelete');
  });


}
@HostListener('mouseout') enablemenu2() {
  const selecteditem = document.querySelectorAll('.onHoverForDelete');
  selecteditem.forEach((item) => {
    this.render.removeClass(item, 'onHoverForDelete');
  });
}
  constructor(private el: ElementRef, private render: Renderer2) { }

}
