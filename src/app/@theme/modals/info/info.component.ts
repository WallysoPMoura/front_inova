import { Component, Input } from '@angular/core';
import { DialogRef } from '../../../@core/services/dialogref.service';

@Component({
  selector: 'inova-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

  @Input() title: string = 'Title'
  @Input() message: string = 'Lorem ipsum dolor sit amet'

  @Input() buttonLabel: string = 'Text Label'

  constructor(public dialogRef: DialogRef) {}

}
