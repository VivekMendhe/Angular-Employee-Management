import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-batch-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './batch-form.component.html',
  styleUrl: './batch-form.component.css',
})
export class BatchFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() batchAdded = new EventEmitter<any>();

  newBatch = {
    title: '',
    duration: '',
    createdOn: '',
    description: '',
  };

  closeForm() {
    this.formClosed.emit();
  }

  submitForm() {
    this.batchAdded.emit({ ...this.newBatch });
    this.resetForm();
    this.closeForm();
  }

  resetForm() {
    this.newBatch = {
      title: '',
      duration: '',
      createdOn: '',
      description: '',
    };
  }
}
