import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RankUser } from '../../../@core/types/rank.type';

@Component({
  selector: 'inova-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {

  @Input() rankUser?: RankUser;

  get classFromScore() {
    if(!this.rankUser) return '';

    if (this.rankUser?.total >= 100) {
      return 'green';
    } else if (this.rankUser?.total >= 50) {
      return 'orange';
    } else if (this.rankUser?.total >= 20) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  get labelFromScore() {
    if(!this.rankUser) return '';

    if (this.rankUser?.total >= 100) {
      return 'Excelente';
    } else if (this.rankUser?.total >= 50) {
      return 'Boa';
    } else if (this.rankUser?.total >= 20) {
      return 'Alerta';
    } else {
      return 'Crítico';
    }
  }

  get year() {
    return new Date().getFullYear();
  }

}
