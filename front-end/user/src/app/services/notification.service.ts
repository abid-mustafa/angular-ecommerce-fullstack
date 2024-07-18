import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
import { Subject } from "rxjs";

@Injectable({
    'providedIn': 'root',
})

export class NotificationService {
    error: any;

    private errorSubject = new Subject<any>();

    readonly dialog = inject(MatDialog);

    constructor(private toastr: ToastrService) { }

    async toaster(type: string, title: string, message: string, time: number) {
        switch (type) {
            case 'error':
                this.toastr.error(message, title || '', { extendedTimeOut: time, timeOut: time, positionClass: 'toast-bottom-right' });
                break;
            case 'warning':
                this.toastr.warning(message, title || '', { extendedTimeOut: time, timeOut: time, positionClass: 'toast-bottom-right' });
                break;
            case 'success':
                this.toastr.success(message, title || '', { extendedTimeOut: time, timeOut: time, positionClass: 'toast-bottom-right' });
                break;
        }
    }

    openDialog() {
        this.dialog.open(DialogComponent, { data: this.error });
    }

    emitErrorEvent(message: string, title: string) {
        this.error = { title, message };
        this.openDialog();
    }
}