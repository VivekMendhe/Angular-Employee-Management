import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternFormComponent } from '../intern-form/intern-form.component';
import { Intern } from '../../types/intern';
import { InternService } from '../../services/intern.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-intern',
  standalone: true,
  imports: [FormsModule, InternFormComponent],
  templateUrl: './intern.component.html',
  styleUrl: './intern.component.css',
})
export class InternComponent {
  showEnrollForm: boolean = false;
  interns: Intern[] = [];

  page: number = 1;
  limit: number = 10;
  loading: boolean = false;

  constructor(
    private internService: InternService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getInterns();
  }

  getInterns(): void {
    this.internService.getInterns().subscribe((data) => {
      this.interns = data.slice().sort((a, b) => {
        if (a.id !== undefined && b.id !== undefined) {
          return b.id - a.id;
        }
        return 0;
      });
    });
  }

  openEnrollForm() {
    this.showEnrollForm = true;
  }

  closeEnrollForm() {
    this.showEnrollForm = false;
  }

  addIntern(newIntern: Partial<Intern>) {
    this.internService.addIntern(newIntern).subscribe({
      next: (intern) => {
        this.interns.unshift(intern);
        this.closeEnrollForm();
        this.showToast('Intern added successfully!', 'success-toast');
      },
      error: () => {
        this.showToast('Failed to add intern.', 'error-toast');
      },
    });
  }

  showToast(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}

// interns = [
//   {
//     name: 'John Doe',
//     college: 'ABC University',
//     email: 'john.doe@example.com',
//     city: 'New York',
//     contact: '123-456-7890',
//   },
//   {
//     name: 'Jane Smith',
//     college: 'XYZ University',
//     email: 'jane.smith@example.com',
//     city: 'Los Angeles',
//     contact: '987-654-3210',
//   },
//   // Add more intern profiles as needed
// ];
