import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() transactions: Transaction[] = [];
}
