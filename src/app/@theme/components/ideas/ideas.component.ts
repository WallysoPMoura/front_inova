import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasePaginateResponse } from '../../../@core/types/base-response.type';
import { Idea } from '../../../@core/types/idea.type';
import { ButtonComponent } from '../button/button.component';
import { PaginateComponent } from '../paginate/paginate.component';
import { DialogService } from '../../../@core/services/dialog.service';
import { DetailsComponent } from '../../modals/details/details.component';

@Component({
  selector: 'inova-ideas',
  standalone: true,
  imports: [
    ButtonComponent,
    PaginateComponent
  ],
  providers: [
    DialogService
  ],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent {

  @Input() paginatedIdeas?: BasePaginateResponse<Idea[]>;

  @Input() title!: string;
  @Input() subtitle!: string;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private dialogService: DialogService) { }

  openDetails(idea: Idea) {

    console.warn(idea);

    this.dialogService.open(DetailsComponent, { idea });
  }

}
