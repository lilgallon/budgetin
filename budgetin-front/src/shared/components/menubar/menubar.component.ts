import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Menu } from 'primeng/menu';
import { Badge } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-topbar',
  imports: [Menu, Badge, AvatarModule, InputTextModule, CommonModule, RouterLink, Ripple],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenubarComponent {
  public items: MenuItem[] = [
    {
      separator: true,
    },
    {
      label: 'Données',
      items: [
        {
          label: 'Données',
          icon: 'pi pi-database',
          shortcut: '⌘+N',
          routerLink: ['/budgetin'],
        },
      ],
    },
    {
      label: 'Visualisation',
    },
  ];
}
