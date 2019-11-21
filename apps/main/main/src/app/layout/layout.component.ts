import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ContextMenuService } from '@blockframes/ui';
import { CONTEXT_MENU } from '@blockframes/utils/routes';

@Component({
  selector: 'delivery-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutComponent implements OnInit {

  constructor(
    private contextMenuService: ContextMenuService,
  ) {}

  ngOnInit() {
    console.log(CONTEXT_MENU);
    this.contextMenuService.setMenu(CONTEXT_MENU);
  }
}
