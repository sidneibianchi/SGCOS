import { Component, OnInit } from '@angular/core';
import { ChamadoService } from '../_services/Chamado.service';
import { Chamado } from '../_models/Chamado';
import { BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit {

  titulo = 'Chamados';
  chamadoFiltrados: Chamado[];
  chamados: Chamado[];
  chamado: Chamado;
  bodyDeletarChamado = '';
  modoSalvar = 'post';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;

  FiltroLista: string;

  constructor(private chamadoService: ChamadoService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }


    get filtroLista(): string {
      return this.FiltroLista;
    }
    set filtroLista(value: string) {
      this.FiltroLista = value;
      this.chamadoFiltrados = this.filtroLista ? this.filtrarChamados(this.filtroLista) : this.chamados;
    }

    editarChamado(chamado: Chamado, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.chamado = Object.assign({}, chamado);
      this.registerForm.patchValue(this.chamado);
    }

    novoChamado(template: any) {
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    excluirChamado(chamado: Chamado, template: any) {
      this.openModal(template);
      this.chamado = chamado;
      this.bodyDeletarChamado = `Tem certeza que deseja excluir o chamado: ${chamado.id}`;
    }

    confirmeDelete(template: any) {
      this.chamadoService.deleteChamado(this.chamado.id).subscribe(
        () => {
          template.hide();
          this.getChamados();
          this.toastr.success('Chamado excluido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao tentar excluir chamado: ${ error}');
          }
      );
    }

    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

    ngOnInit() {
      this.getChamados();
      this.validation();
    }

    filtrarChamados(filtrarPor: string): Chamado[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.chamados.filter(
        chamado => chamado.data.toString().indexOf(filtrarPor) !== -1
      );
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

    salvarAlteracao(template: any) {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.chamado = Object.assign({}, this.registerForm.value);
          this.chamadoService.postChamado(this.chamado).subscribe(
          (novoChamado: Chamado) => {
            template.hide();
            this.getChamados();
            this.toastr.success('Chamado inserido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao incluir chamado: ${error}');
          });
        } else {
          this.chamado = Object.assign({id: this.chamado.id}, this.registerForm.value);
          this.chamadoService.putChamado(this.chamado).subscribe(
            () => {
              template.hide();
              this.getChamados();
              this.toastr.success('Chamado alterado com sucesso!');
            }, error => {
              this.toastr.error('Erro ao alterar chamado: ${error}');
            });
        }
      }
    }

    getChamados() {
      this.chamadoService.getAllChamado().subscribe(
        (Chamados: Chamado[]) => {
        this.chamados = Chamados;
        this.chamadoFiltrados = this.chamados;
         }, error => {
           this.toastr.error('Erro ao tentar carregar chamado: ${error}');
      });
    }

}
