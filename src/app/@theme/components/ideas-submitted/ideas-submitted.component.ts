import { Component, Input } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { RankUser } from '../../../@core/types/rank.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inova-ideas-submitted',
  standalone: true,
  imports: [
    SelectComponent,
    CommonModule
  ],
  templateUrl: './ideas-submitted.component.html',
  styleUrl: './ideas-submitted.component.scss'
})
export class IdeasSubmittedComponent {

  @Input() rankUser?: RankUser;

  get monthsItems() {
    return [
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 },
    ]
  }

  //get current month
  get currentMonth() {
    return new Date().getMonth() + 1
  }

}
