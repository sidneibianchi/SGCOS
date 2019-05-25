import { Component, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/_services/Chamado.service';
import { BsModalService } from 'ngx-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chamado-edit',
  templateUrl: './chamado-edit.component.html',
  styleUrls: ['./chamado-edit.component.css']
})
export class ChamadoEditComponent implements OnInit {

  titulo = 'Edição de Chamados';
  registerForm: FormGroup;
  chamado = {};

  constructor(private chamadoService: ChamadoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

    ngOnInit() {
      this.validation();
    }

    validation() {
      this.registerForm = this.fb.group({
        data: ['', Validators.required],
        hora: ['', Validators.required],
        observacao: ['', Validators.required],
        status: ['', Validators.required],
        clienteId: ['', Validators.required]
      });
    }
}
