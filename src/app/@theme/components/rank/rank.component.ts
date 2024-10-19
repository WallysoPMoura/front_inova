import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RankItem, RankType } from '../../../@core/types/rank.type';

@Component({
  selector: 'inova-rank',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent {

  @Input() title: string = 'Ranking';
  @Input() subtitle: string = 'Ranking dos colaboradores';
  @Input() items: RankItem[] = [];
  @Input() rankType: RankType = 'center';

  get sliced() {
    if (this.rankType == 'center') {
      return this.items.slice(0, 5);
    }
      return this.items;
  }

}
