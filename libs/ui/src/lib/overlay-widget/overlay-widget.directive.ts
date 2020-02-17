import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { OverlayWidgetComponent } from './overlay-widget.component';

// OVERLAY TRIGGERED ON CLICK
@Directive({ selector: "button[widgetTarget]" })
export class OverlayWidgetButtonDirective {

  @Input() widgetTarget: OverlayWidgetComponent;
  @HostListener('click') onclick() {
    this.widgetTarget.open(this.el);
  }
  constructor(private el: ElementRef) {}
}

// OVERLAY TRIGGERED ON FOCUS / CLOSED ON BLUT
@Directive({ selector: "input[widgetTarget]" })
export class OverlayWidgetInputDirective {
  
  @Input() widgetTarget: OverlayWidgetComponent;
  @HostListener('focus') onfocus() {
    this.widgetTarget.open(this.el);
  }
  @HostListener('blur') onblur() {
    this.widgetTarget.close();
  }

  constructor(private el: ElementRef) {}
}

// OVERLAY TRIGGERED ON Hover
@Directive({ selector: "mat-icon[widgetTarget]" })
export class OverlayWidgetIconDirective {

  @Input() widgetTarget: OverlayWidgetComponent;
  @HostListener('mouseover') onMouseOver() {
    this.widgetTarget.open(this.el);
  }

  constructor(private el: ElementRef) {}
}