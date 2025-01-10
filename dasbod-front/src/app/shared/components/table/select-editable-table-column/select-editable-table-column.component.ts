import { Component, computed, ContentChild, input, model, TemplateRef } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Selectable } from '../../../models/selectable';
import { NgTemplateOutlet } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-select-editable-table-column',
  imports: [Select, FormsModule, TableModule, NgTemplateOutlet],
  templateUrl: './select-editable-table-column.component.html',
  styleUrl: './select-editable-table-column.component.css',
})
export class SelectEditableTableColumnComponent {
  public placeholder = input<string>('Faites un choix');
  public choices = input<(Selectable | string)[]>([]);
  public choice = model<Selectable | string>();
  public readableChoice = computed<string | undefined>(() => {
    if (typeof this.choice() === 'string') {
      console.log('c STR', this.choices());
      if (typeof this.choices()[0] === 'object') {
        console.log('cs OBJ');
        return (this.choices() as Selectable[]).find(choice => choice.id === this.choice())?.label;
      } else {
        return this.choice() as string;
      }
    } else {
      return (this.choice() as Selectable).label;
    }
  });
  @ContentChild('selectable') selectable!: TemplateRef<unknown>;
}
