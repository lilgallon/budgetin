import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root'})
export class ToastService {
  private readonly messageService: MessageService = inject(MessageService);

  public success(title: string, message?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
      key: 'br',
      life: 3000
    });
  }

  public error(title: string, message?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      key: 'br',
      life: 30000
    });
  }
}
