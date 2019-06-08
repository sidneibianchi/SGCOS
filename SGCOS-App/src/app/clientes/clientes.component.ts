import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from '../_services/Cliente.service';
import { Cliente } from '../_models/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

 @ViewChild('cpf') InputCpf: ElementRef;

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
              public router: Router,
              private toastr: ToastrService) { }


  get filtroLista(): string {
    return this.FiltroLista;
  }

  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.clienteFiltrados = this.filtroLista ? this.filtrarClientes(this.filtroLista) : this.clientes;
  }

  editarCliente(cli: Cliente, template: any) {
    this.ngOnInit();
    this.clienteService.getClienteById(cli.id)
      .subscribe(
        (cliente: Cliente) => {
          this.cliente = Object.assign({}, cliente);
          this.cliente.cpfCnpj = this.FormataCpfCnpj(this.cliente.cpfCnpj);
          this.registerForm.patchValue(this.cliente);

          this.cliente.enderecos.forEach(endereco => {
            this.enderecos.push(this.criaEndereco(endereco));
          });

          this.cliente.telefones.forEach(telefone => {
            this.telefones.push(this.criaTelefone(telefone));
          });
        }
      );
    this.modoSalvar = 'put';
    this.openModal(template);
    /*  this.InputCpf.nativeElement.disabled = true; */
  }

  novoCliente(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
    /* this.InputCpf.nativeElement.disabled = false; */
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
    if (!this.userName()) {
      this.logout();
    }
    this.LimpaCliente();
    this.getClientes();
    this.validation();
  }

  filtrarClientes(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  VerificaSeExisteCliente(cpfcnpj: string, template: any) {

    if (cpfcnpj === this.cliente.cpfCnpj) {
      return;
   }

    const exp = /\.|\-|\//g;
    cpfcnpj = cpfcnpj.replace(exp, '');

    console.log(this.cliente.cpfCnpj);
    console.log(cpfcnpj);

    if (cpfcnpj.length > 0 && cpfcnpj.length <= 11) {
      if (!this.Validacpf(cpfcnpj)) {
        this.limpaDadosCpfCnpj();
      }
    }
    if (cpfcnpj.length > 11 ) {
      if (!this.Validacnpj(cpfcnpj)) {
        this.limpaDadosCpfCnpj();
      }
    }
    const ret =  this.clientes.filter(
          cliente => cliente.cpfCnpj === cpfcnpj);

    if (ret.length > 0 ) {
        this.toastr.warning('Cliente com documento: ' + this.FormataCpfCnpj(cpfcnpj) + ' já possui um cadastrado no sistema.');
        this.novoCliente(template);
        this.InputCpf.nativeElement.focus();
      }

  }

  limpaDadosCpfCnpj() {
    this.InputCpf.nativeElement.value = '';
    this.InputCpf.nativeElement.focus();
    this.toastr.error('Informe um CPF ou CNPJ válido.');
    this.cliente.cpfCnpj = '';
    console.log(this.cliente);
    this.registerForm.patchValue(this.cliente);
  }

  validation() {
    this.registerForm = this.fb.group({
      cpfCnpj: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      contato: ['', Validators.required],
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
      numero: [telefone.numero, Validators.required],
      tipo: [telefone.tipo, Validators.required],
    });
  }

  roleName() {
    return sessionStorage.getItem('role');
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
      cep: [endereco.cep, Validators.required],
      logradouro: [endereco.logradouro, Validators.required],
      numero: [endereco.numero, Validators.required],
      bairro: [endereco.bairro, Validators.required],
      cidade: [endereco.cidade, Validators.required],
      uf: [endereco.uf, Validators.required],
    });
  }

  adicionarEndereco() {
    this.enderecos.push(this.criaEndereco({ id: 0 }));
  }

  fechaModal(template: any) {
    this.ngOnInit();
    template.hide();
  }

  removerEndereco(id: number) {
    this.enderecos.removeAt(id);
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.cliente = Object.assign({}, this.registerForm.value);
        const exp = /\.|\-|\//g;
        this.cliente.cpfCnpj =  this.cliente.cpfCnpj.replace(exp, '');
        console.log(this.cliente);
        this.clienteService.postCliente(this.cliente).subscribe(
          (novoCliente: Cliente) => {
            template.hide();
            this.ngOnInit();
            this.toastr.success('Cliente inserido com sucesso!');
          }, error => {
            console.log(error);
            console.log(this.cliente);
            this.toastr.error('Erro ao incluir cliente: ${error}');
          });
      } else {
        this.cliente = Object.assign({ id: this.cliente.id }, this.registerForm.value);
        const exp = /\.|\-|\//g;
        this.cliente.cpfCnpj =  this.cliente.cpfCnpj.replace(exp, '');
        console.log(this.cliente);
        this.clienteService.putCliente(this.cliente).subscribe(
          () => {
            template.hide();
            this.ngOnInit();
            this.toastr.success('Cliente alterado com sucesso!');
          }, error => {
            console.log(error);
            console.log(this.cliente);
            this.toastr.error('Erro ao alterar cliente: ${error}');
          });
      }
    }
  }

  LimpaCliente() {
    this.cliente = new Cliente();
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

  FormataCpfCnpj(cpfcnpj: string): string {
    const exp = /\.|\-|\//g;
    cpfcnpj = cpfcnpj.replace(exp, '');

    if (cpfcnpj.length <= 11) {
      cpfcnpj = cpfcnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      cpfcnpj = cpfcnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    console.log(cpfcnpj);

    return cpfcnpj;
  }

  Validacpf(cpf: string): boolean {
    if (cpf === null) {
        return false;
    }
    if (cpf.length !== 11) {
        return false;
    }
    if ((cpf === '00000000000') || (cpf === '11111111111') ||
        (cpf === '22222222222') || (cpf === '33333333333') ||
        (cpf === '44444444444') || (cpf === '55555555555') ||
        (cpf === '66666666666') || (cpf === '77777777777') ||
        (cpf === '88888888888') || (cpf === '99999999999')) {
        return false;
    }

    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) === -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
        return false;
    } else {
        return true;
    }
  }


  Validacnpj(cnpj: string): boolean {
    if (cnpj === null) {
        return false;
    }

    if (cnpj.length !== 14) {
        return false;
    }
    if ((cnpj === '00000000000000') || (cnpj === '11111111111111') ||
        (cnpj === '22222222222222') || (cnpj === '33333333333333') ||
        (cnpj === '44444444444444') || (cnpj === '55555555555555') ||
        (cnpj === '66666666666666') || (cnpj === '77777777777777') ||
        (cnpj === '88888888888888') || (cnpj === '99999999999999')) {
        return false;
    }

    let tamanho;
    let numeros;
    let digitos;
    let soma;
    let pos;
    let resultado;
    let i;

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {pos = 9; }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== Number(digitos.charAt(0))) { return false; }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {pos = 9; }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== Number(digitos.charAt(1))) {return false; }

    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Você saiu do sistema.');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  }
}
