import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Batch } from '../../types/batch';
import { BatchService } from '../../services/batch.service';
import { Intern } from '../../types/intern';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-intern-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './intern-form.component.html',
  styleUrl: './intern-form.component.css',
})
export class InternFormComponent {
  @Input() isMentor: boolean = false;
  @Output() formClosed = new EventEmitter<void>();
  @Output() internAdded = new EventEmitter<Partial<Intern>>();

  @Input() intern: Intern | null = null;
  @Output() internUpdated = new EventEmitter<Intern>();

  // enrollForm = {
  //   name: '',
  //   college: '',
  //   email: '',
  //   city: '',
  //   contact: '',
  //   batchID: null,
  // };

  enrollForm: Intern = {
    name: '',
    college: '',
    email: '',
    city: '',
    contact: '',
    batchID: 0,
    type: '',
    remark: '',
  };

  batches: Batch[] = [];

  constructor(private batchService: BatchService) {}

  ngOnInit(): void {
    if (this.isMentor) {
      this.fetchBatches();
    }
    if (this.intern) {
      this.enrollForm = { ...this.intern };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['intern'] && this.intern) {
      this.enrollForm = { ...this.intern };
    }
  }

  fetchBatches(): void {
    this.batchService.getBatches().subscribe((data) => {
      this.batches = data;
    });
  }

  closeForm(event: MouseEvent) {
    this.formClosed.emit();
    event.stopPropagation();
  }

  // onSubmit() {
  //   this.internAdded.emit({ ...this.enrollForm });
  //   this.resetForm();
  //   this.closeForm(new MouseEvent('click'));
  // }

  // onSubmit() {
  //   if (this.intern) {
  //     this.internUpdated.emit({ ...this.enrollForm });
  //   } else {
  //     this.internAdded.emit({ ...this.enrollForm });
  //   }
  //   this.resetForm();
  //   this.closeForm(new MouseEvent('click'));
  // }

  onSubmit() {
    const internData = this.intern
      ? { ...this.enrollForm }
      : {
          name: this.enrollForm.name,
          college: this.enrollForm.college,
          email: this.enrollForm.email,
          city: this.enrollForm.city,
          contact: this.enrollForm.contact,
        };

    if (this.intern) {
      this.internUpdated.emit(internData as Intern);
    } else {
      this.internAdded.emit(internData);
    }

    this.resetForm();
    this.closeForm(new MouseEvent('click'));
  }

  // resetForm() {
  //   this.enrollForm = {
  //     name: '',
  //     college: '',
  //     email: '',
  //     city: '',
  //     contact: '',
  //     batchID: null,
  //   };
  // }
  resetForm() {
    this.enrollForm = {
      name: '',
      college: '',
      email: '',
      city: '',
      contact: '',
      batchID: 0,
      type: '',
      remark: '',
    };
  }
}
