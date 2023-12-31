import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() label = 'Button';
  @Input() variant: 'primary' | 'default' | 'success' | 'danger' = 'default';
  @Input() fullWidth = false;
  @Output() buttonClick = new EventEmitter<void>();
}
