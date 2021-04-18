import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/commons/dialog/dialog.component';
import { OptionDialogComponent } from 'src/app/components/commons/option-dialog/option-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(DialogComponent,{
      width: '250px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "150px" },
    });
  }

  openOptionDialog(){
    return this.dialog.open(OptionDialogComponent,{
       width: '300px',
       height: '250px',                       
       panelClass: 'app-full-bleed-dialog', 
       disableClose: true,
       position: { top: "150px" },
     });
   }
}
