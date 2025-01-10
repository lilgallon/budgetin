import { Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-edit-action-table-column',
  imports: [Button, NgIf, Ripple, TableModule],
  templateUrl: './edit-action-table-column.component.html',
  styleUrl: './edit-action-table-column.component.css',
})
export class EditActionTableColumnComponent {
  public editing = input(false);
  public edit = output();
}
