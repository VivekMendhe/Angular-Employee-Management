import { Component } from '@angular/core';
import { InternFormComponent } from '../intern-form/intern-form.component';
import { FormsModule } from '@angular/forms';
import { Intern } from '../../types/intern';
import { InternService } from '../../services/intern.service';

@Component({
  selector: 'app-interns',
  standalone: true,
  imports: [InternFormComponent, FormsModule],
  templateUrl: './interns.component.html',
  styleUrl: './interns.component.css',
})
export class InternsComponent {
  interns: Intern[] = [];
  showAddBatchForm = false;
  isMentor = false;

  showEditForm = false;
  currentIntern: Intern | null = null;

  constructor(private internService: InternService) {
    this.isMentor = this.checkIfMentor();
  }

  ngOnInit(): void {
    this.getInterns();
  }

  checkIfMentor(): boolean {
    // Implement logic to check if the user is a mentor
    // For now, let's assume we have a simple role check
    const userRole = 'mentor'; // Replace with actual logic
    return userRole === 'mentor';
  }

  getInterns(): void {
    this.internService.getInterns().subscribe((data) => {
      this.interns = data;
    });
  }

  openAddForm(): void {
    this.showAddBatchForm = true;
    this.showEditForm = false;
    this.currentIntern = null;
  }

  openEditForm(intern: Intern): void {
    this.showEditForm = true;
    this.showAddBatchForm = false;
    this.currentIntern = intern;
  }

  closeForm(): void {
    this.showAddBatchForm = false;
    this.showEditForm = false;
    this.currentIntern = null;
  }

  // addIntern(intern: any) {
  //   this.interns.push(intern);
  // }

  // addIntern(intern: Intern) {
  //   this.internService.addIntern(intern).subscribe((newIntern) => {
  //     this.interns.push(newIntern);
  //     this.showAddBatchForm = false; // Close the form after adding
  //   });
  // }

  // addIntern(newIntern: Intern): void {
  //   this.internService.addIntern(newIntern).subscribe((intern) => {
  //     this.interns.unshift(intern);
  //     this.closeForm();
  //   });
  // }

  addIntern(newIntern: Partial<Intern>): void {
    try {
      const validIntern = validateInternData(newIntern);
      this.internService.addIntern(validIntern).subscribe((intern) => {
        this.interns.push(intern);
        this.closeForm();
      });
    } catch (error: any) {
      console.error(error.message);
      // Handle the error appropriately in your UI
    }
  }

  editIntern(intern: Intern) {
    this.currentIntern = { ...intern };
    this.showEditForm = true;
  }

  // updateIntern(updatedIntern: Intern) {
  //   this.internService
  //     .updateIntern(updatedIntern.id!, updatedIntern)
  //     .subscribe((updated) => {
  //       const index = this.interns.findIndex(
  //         (intern) => intern.id === updated.id
  //       );
  //       if (index !== -1) {
  //         this.interns[index] = updated;
  //       }
  //       this.showEditForm = false;
  //       this.currentIntern = null;
  //     });
  // }

  updateIntern(updatedIntern: Intern): void {
    this.internService
      .updateIntern(updatedIntern.id!, updatedIntern)
      .subscribe((intern) => {
        const index = this.interns.findIndex((i) => i.id === intern.id);
        if (index !== -1) {
          this.interns[index] = intern;
        }
        this.closeForm();
      });
  }
}

function validateInternData(intern: Partial<Intern>): Intern {
  if (
    !intern.name ||
    !intern.college ||
    !intern.email ||
    !intern.city ||
    !intern.contact
  ) {
    throw new Error('Missing required fields');
  }
  return intern as Intern;
}

// interns = [
//   {
//     name: 'John Doe',
//     college: 'ABC University',
//     email: 'john.doe@example.com',
//     city: 'New York',
//     contact: '123-456-7890',
//     type: 'type',
//     remark: 'remark',
//   },
//   {
//     name: 'Jane Smith',
//     college: 'XYZ University',
//     email: 'jane.smith@example.com',
//     city: 'Los Angeles',
//     contact: '987-654-3210',
//     type: 'type',
//     remark: 'remark',
//   },
//   // Add more intern profiles as needed
// ];
