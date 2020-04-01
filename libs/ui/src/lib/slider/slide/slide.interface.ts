import { SafeStyle } from '@angular/platform-browser';

export interface Slide {
  image: SafeStyle;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
}
