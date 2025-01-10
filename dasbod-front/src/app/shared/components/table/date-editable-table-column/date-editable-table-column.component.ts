import { Component, model } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-editable-table-column',
  imports: [TableModule, DatePicker, FormsModule, DatePipe],
  templateUrl: './date-editable-table-column.component.html',
  styleUrl: './date-editable-table-column.component.css',
})
export class DateEditableTableColumnComponent {
  public date = model<Date>();
}
