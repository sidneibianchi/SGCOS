import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteService } from '../_services/Cliente.service';
import { Cliente } from '../_models/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Endereco } from '../_models/Endereco';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  titulo = 'Clientes';
  clienteFiltrados: Cliente[];
  clientes: Cliente[];
  cliente: Cliente;
  bodyDeletarCliente = '';
  modoSalvar = 'post';
  registerForm: FormGroup;
  FiltroLista: string;

  constructor(private clienteService: ClienteService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }


  get filtroLista(): string {
    return this.FiltroLista;
  }
  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.clienteFiltrados = this.filtroLista ? this.filtrarClientes(this.filtroLista) : this.clientes;
  }

  editarCliente(cliente: Cliente, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.cliente = Object.assign({}, cliente);
    console.log(cliente);
    this.registerForm.patchValue(this.cliente);
  }

  novoCliente(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirCliente(cliente: Cliente, template: any) {
    this.openModal(template);
    this.cliente = cliente;
    this.bodyDeletarCliente = `Tem certeza que deseja excluir o cliente: ${cliente.nome}`;
  }

  confirmeDelete(template: any) {
    this.clienteService.deleteCliente(this.cliente.id).subscribe(
      () => {
        template.hide();
        this.getClientes();
        this.toastr.success('Cliente excluido com sucesso!');
      }, error => {
        this.toastr.error('Erro ao tentar excluir cliente: ${ error}');
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.getClientes();
    this.validation();
  }

  filtrarClientes(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [''],
      cpfCnpj: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      contato: ['', Validators.required],
      complemento: ['', Validators.required],
      enderecos: this.fb.array([]),
      telefones: this.fb.array([])
    });
  }


  get telefones(): FormArray {
    return this.registerForm.get('telefones') as FormArray;
  }

  criaTelefone(telefone: any): FormGroup {
    return this.fb.group({
      id: [telefone.id],
      numero: [telefone.numero],
      tipo: [telefone.tipo]
    });
  }

  adicionarTelefone() {
    this.telefones.push(this.criaTelefone({ id: 0 }));
  }

  removerTelefone(id: number) {
    this.telefones.removeAt(id);
  }

  get enderecos(): FormArray {
    return this.registerForm.get('enderecos') as FormArray;
  }

  criaEndereco(endereco: any): FormGroup {
    return this.fb.group({
      id: [endereco.id],
      cep: [endereco.cep],
      logradouro: [endereco.logradouro],
      numero: [endereco.numero],
      bairro: [endereco.bairro],
      cidade: [endereco.cidade],
      uf: [endereco.uf]
    });
  }

  adicionarEndereco() {
    this.enderecos.push(this.criaEndereco({ id: 0 }));
  }

  removerEndereco(id: number) {
    this.enderecos.removeAt(id);
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.cliente = Object.assign({}, this.registerForm.value);
        console.log(this.cliente);
        this.clienteService.postCliente(this.cliente).subscribe(
          (novoCliente: Cliente) => {
            template.hide();
            this.getClientes();
            this.toastr.success('Cliente inserido com sucesso!');
          }, error => {
            console.log(error);
            console.log(this.cliente);
            this.toastr.error('Erro ao incluir cliente: ${error}');
          });
      } else {
        this.cliente = Object.assign({ id: this.cliente.id }, this.registerForm.value);
        console.log(this.cliente);
        this.clienteService.putCliente(this.cliente).subscribe(
          () => {
            template.hide();
            this.getClientes();
            this.toastr.success('Cliente alterado com sucesso!');
          }, error => {
            console.log(error);
            console.log(this.cliente);
            this.toastr.error('Erro ao alterar cliente: ${error}');
          });
      }
    }
  }

  getClientes() {
    this.clienteService.getAllCliente().subscribe(
      (Clientes: Cliente[]) => {
        this.clientes = Clientes;
        this.clienteFiltrados = this.clientes;
      }, error => {
        this.toastr.error('Erro ao tentar carregar cliente: ${error}');
      });
  }

}
