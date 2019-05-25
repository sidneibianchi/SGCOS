import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Cliente.service';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  titulo = 'Clientes';
  cliente: {};
  registerForm: FormGroup;

  constructor(private clienteService: ClienteService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      cpF_CNPJ: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      contato: ['', Validators.required],
      agencia: ['', Validators.required]
    });
  }

}
