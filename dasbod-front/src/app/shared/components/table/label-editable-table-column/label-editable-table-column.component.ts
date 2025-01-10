import { Component, model } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-label-editable-table-column',
  imports: [InputText, FormsModule, TableModule],
  templateUrl: './label-editable-table-column.component.html',
  styleUrl: './label-editable-table-column.component.css',
})
export class LabelEditableTableColumnComponent {
  public label = model<string>();
}
