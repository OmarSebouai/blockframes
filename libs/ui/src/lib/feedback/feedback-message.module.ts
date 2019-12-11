import { NgModule } from '@angular/core';
import { FeedbackMessageComponent } from './feedback-message.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { AssetsThemeModule } from '../assets-directive/assets-theme.module';

@NgModule({
  declarations: [FeedbackMessageComponent],
  imports: [
    MatButtonModule,
    FlexModule,
    AssetsThemeModule
  ],
  exports: [FeedbackMessageComponent],
})
export class FeedbackMessageModule { }
