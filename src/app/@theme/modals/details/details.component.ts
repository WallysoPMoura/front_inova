import { Component, Input, OnInit } from '@angular/core';
import { Idea } from '../../../@core/types/idea.type';
import { DialogRef } from '../../../@core/services/dialogref.service';

@Component({
  selector: 'inova-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
 
  @Input() idea!: Idea;

  constructor(public dialogRef: DialogRef) {}

}
