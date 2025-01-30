import { Component, model } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-editable-table-column',
  imports: [TableModule, InputNumber, ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './money-editable-table-column.component.html',
  styleUrl: './money-editable-table-column.component.css',
})
export class MoneyEditableTableColumnComponent {
  public money = model<number>();
}
