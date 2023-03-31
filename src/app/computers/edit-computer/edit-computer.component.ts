import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css'],
})
export class EditComputerComponent {
  formComputer: FormGroup;
  computerID?: number;
  computerBrand?: string;
  computerModel?: string;

  constructor(
    private fb: FormBuilder,
    private computerSvc: ComputerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe({
      next: (params) => {
        this.computerID = params['id'];
        this.getData();
      },
    });

    this.formComputer = this.fb.group({
      id: [this.computerID],
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  getData() {
    this.computerSvc.getComputer(this.computerID!).subscribe({
      next: (data) => {
        this.computerBrand = data.brand;
        this.computerModel = data.model;
        this.formComputer?.patchValue(data);
      },
      error: (err) => {
        console.log('no fue posible obtener la información del computador');
      },
    });
  }

  updateComputer() {
    let data = this.formComputer?.value as Computer;
    this.computerSvc.updateComputer(data).subscribe({
      next: () => {
        this.router.navigate(['/computers']);
      },
      error: (err) => {
        alert('Lo sentimos ocurrió un error');
      },
    });
  }
}
