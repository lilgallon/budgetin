import { Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Severity } from '../../../models/severity';

@Component({
  selector: 'app-money-tag',
  imports: [CurrencyPipe, Tag],
  templateUrl: './money-tag.component.html',
  styleUrl: './money-tag.component.css',
})
export class MoneyTagComponent {
  public money = input.required<number>();
  public severity = computed<Severity>(() => {
    if (this.money() > 0) {
      return 'success'
    } if (this.money() === 0) {
      return 'secondary'
    } else {
      return 'danger'
    }
  })
}
