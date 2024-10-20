import { Component } from '@angular/core';
import { DialogRef } from '../../../@core/services/dialogref.service';

@Component({
  selector: 'inova-terms',
  standalone: true,
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {

  constructor(public dialogRef: DialogRef) { }

}
