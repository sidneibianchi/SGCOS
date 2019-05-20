
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteService } from '../_services/Cliente.service';
import { Cliente } from '../_models/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clienteFiltrados: Cliente[];
  clientes: Cliente[];
  cliente: Cliente;
  bodyDeletarCliente = '';
  modoSalvar = 'post';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;

  FiltroLista: string;

  constructor(private clienteService: ClienteService
    , private modalService: BsModalService
    , private fb: FormBuilder) { }


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
          }, error => {
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
        nome: ['', Validators.required]
      });
    }
  
    salvarAlteracao(template: any) {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          console.log('post');
          this.cliente = Object.assign({}, this.registerForm.value);
          this.clienteService.postCliente(this.cliente).subscribe(
          (novoCliente: Cliente) => {
            template.hide();
            this.getClientes();
          }, error => {
            console.log(error);
          });
        } else {
          console.log('put');
          this.cliente = Object.assign({id: this.cliente.id}, this.registerForm.value);
          this.clienteService.putCliente(this.cliente).subscribe(
            () => {
              template.hide();
              this.getClientes();
            }, error => {
              console.log(error);
            });
        }
      }
    }
  
    getClientes() {
      this.clienteService.getAllCliente().subscribe(
        (Clientes: Cliente[]) => {
        this.clientes = Clientes;
        this.clienteFiltrados = this.clientes;
        console.log(Clientes);
      }, error => {
        console.log(error);
      });
    }

  }