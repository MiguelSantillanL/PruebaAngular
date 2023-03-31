import { Component } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../model/computer.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  computers = new MatTableDataSource<Computer>();
  displayedColumns = ['id', 'brand', 'model', 'actions'];

  constructor(private computerSvc: ComputerService) {
    this.loadDtata();
  }

  loadDtata() {
    this.computerSvc.getComputers().subscribe({
      next: (list) => {
        this.computers.data = list;
      },
      error: (err) => {
        alert('Ocurrio un Error!!: ' + err.message);
      },
    });
  }

  deleteComputer(item: Computer) {
    this.computerSvc.deleteComputer(item.id).subscribe({
      next: () => {
        this.loadDtata();
      },
      error: (err) => {
        alert('Ocurrio un Error!!: ' + err.message);
      },
    });
  }

  updateComputer(item: Computer) {
    this.computerSvc.updateComputer(item).subscribe({
      next: () => {
        this.loadDtata();
      },
      error: (err) => {
        alert('Ocurrio un Error!!: ' + err.message);
      },
    });
  }
}
