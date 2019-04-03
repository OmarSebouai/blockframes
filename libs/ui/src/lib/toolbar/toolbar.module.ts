import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

import { OrganizationModule} from '@blockframes/organization';
import { AuthModule} from '@blockframes/auth';
import { AccountModule } from '@blockframes/account';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    OrganizationModule,
    AuthModule,
    AccountModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
  ],
  declarations: [HeaderComponent, ContextMenuComponent],
  exports: [HeaderComponent, ContextMenuComponent]
})
export class ToolbarModule {}
