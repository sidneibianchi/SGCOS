import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_services/Cliente.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/_models/Cliente';

@Component({
  selector: 'app-clicadedit',
  templateUrl: './clicadedit.component.html',
  styleUrls: ['./clicadedit.component.css']
})
export class ClicadeditComponent implements OnInit {

  titulo = 'Clientes';
  clientes: Cliente[];
  cliente: Cliente;
  modoSalvar = 'post';
  registerForm: FormGroup;
  idCliente: number;

  constructor(private clienteService: ClienteService,
              public router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

    ngOnInit() {
      this.idCliente = +this.route.snapshot.paramMap.get('idCliente');
      if (this.idCliente !== 0) {
        this.carregarCliente(this.idCliente);
      }
      this.validation();
    }

    carregarCliente(idcliente: number) {
      this.clienteService.getClienteById(idcliente)
        .subscribe(
          (cliente: Cliente) => {
            this.cliente = Object.assign({}, cliente);
            console.log(cliente);
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

    get telefones(): FormArray {
      return this.registerForm.get('telefones') as FormArray;
    }

    criaTelefone(telefone: any): FormGroup {
      return this.fb.group({
        id: [telefone.id],
        numero: [telefone.numero, Validators.required],
        tipo: [telefone.tipo]
      });
    }

    adicionarTelefone() {
      this.telefones.push(this.criaTelefone({ id: 0 }));
    }

    removerTelefone(id: number) {
      this.telefones.removeAt(id);
    }

    validation() {
      this.registerForm = this.fb.group({
        cpfCnpj: ['', Validators.required],
        nome: ['', Validators.required],
        email: [''],
        contato: ['', Validators.required],
        enderecos: this.fb.array([]),
        telefones: this.fb.array([])
      });
    }

    salvarAlteracao() {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.cliente = Object.assign({}, this.registerForm.value);
          console.log(this.cliente);
          this.clienteService.postCliente(this.cliente).subscribe(
            (novoCliente: Cliente) => {
              this.toastr.success('Cliente inserido com sucesso!');
              this.router.navigate(['/cliente']);
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
              this.toastr.success('Cliente alterado com sucesso!');
            }, error => {
              console.log(error);
              console.log(this.cliente);
              this.toastr.error('Erro ao alterar cliente: ${error}');
            });
        }
      }
    }

    roleName() {
      return sessionStorage.getItem('role');
    }

    voltar() {
      this.router.navigate(['/cliente']);
    }

}
