import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Cliente.service';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/_models/Cliente';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  titulo = 'Clientes';
  cliente: Cliente = new Cliente();
  registerForm: FormGroup;

  get endereco(): FormArray {
    return this.registerForm.get('endereco') as FormArray;
  }

  get telefones(): FormArray {
    return this.registerForm.get('telefones') as FormArray;
  }

  get equipamentos(): FormArray {
    return this.registerForm.get('equipamentos') as FormArray;
  }

  constructor(private clienteService: ClienteService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.validation();
    this.carregarCliente();
  }

carregarCliente() {
  const idCliente = +this.route.snapshot.paramMap.get('id');
  this.clienteService.getClienteById(idCliente)
    .subscribe(
      (cliente: Cliente) => {
        this.cliente = Object.assign({}, cliente);
        console.log(this.cliente);
        this.registerForm.patchValue(this.cliente);

        this.cliente.telefones.forEach( telefone =>{
          this.telefones.push(this.criaTelefone(telefone));
        } );

        this.cliente.equipamentos.forEach( equipamento =>{
          this.equipamentos.push(this.criaEquipamento(equipamento));
        });
      }
    );
}

  validation() {
    this.registerForm = this.fb.group({
      id:[],
      cpF_CNPJ: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      contato: ['', Validators.required],
      agencia: ['', Validators.required],
      endereco: this.fb.group({
        id:[],
        cep: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        uf: ['', Validators.required]
      }),
      telefones: this.fb.array([]),
      equipamentos: this.fb.array([])
    });
  }

  criaTelefone(telefone: any): FormGroup {
      return this.fb.group({
        id: [telefone.id],
        numero: [telefone.numero, Validators.required],
        tipo: [telefone.tipo, Validators.required]
      });
  }

  adicionarTelefone() {
    this.telefones.push(this.criaTelefone({ id: 0 }));
  }

  removerTelefone(id: number) {
    this.telefones.removeAt(id);
  }

  criaEquipamento(equipamento: any): FormGroup {
      return  this.fb.group({
        id: [equipamento.id],
        nrSerie: [equipamento.nrSerie, Validators.required],
        descricao: [equipamento.descricao, Validators.required],
        marca: [equipamento.marca, Validators.required],
        modelo: [equipamento.modelo, Validators.required]
      });
  }

  adicionarEquipamento() {
    this.equipamentos.push(this.criaEquipamento({ id: 0 }));
  }

  removerEquipamento(id: number) {
    this.equipamentos.removeAt(id);
  }

  salvarCliente() {
        this.cliente = Object.assign({id: this.cliente.id}, this.registerForm.value);
        this.clienteService.putCliente(this.cliente).subscribe(
          () => {
            this.toastr.success('Cliente alterado com sucesso!');
          }, error => {
            this.toastr.error('Erro ao alterar cliente: ${error}');
          });
    }
 }

