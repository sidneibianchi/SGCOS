import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../_services/Servico.service';
import { BsModalService, BsModalRef, BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servico } from '../_models/Servico';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap';
import { toDate } from '@angular/common/src/i18n/format_date';
import { DateFormatPipePipe } from '../_helps/DateFormatPipe.pipe';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  titulo = 'Serviços';
  servicoFiltrados: Servico[];
  servicos: Servico[];
  servico: Servico;
  bodyDeletarServico = '';
  modoSalvar = 'post';
  FiltroLista: string;
  registerForm: FormGroup;
  idEquipamento: number;
  dtAtendimento: string;

  dataAtual: Date = new Date();


    constructor(private servicoService: ServicoService,
                private modalService: BsModalService,
                private fb: FormBuilder,
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private localeService: BsLocaleService) {
                  this.localeService.use('pt-br');
                 }

  get filtroLista(): string {
    return this.FiltroLista;
  }

  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.servicoFiltrados = this.filtroLista ? this.filtrarServicos(this.filtroLista) : this.servicos;
  }

  filtrarServicos(filtrarPor: string): Servico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.servicos.filter(
      servico => servico.observacao.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  ngOnInit() {
    this.idEquipamento = +this.route.snapshot.paramMap.get('idEquipamento');
    this.getServicosPorEquipamento(this.idEquipamento.toString());
    this.validation();
  }

  novoServico(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  fechaModal(template: any) {
    this.ngOnInit();
    template.hide();
  }

  validation() {
    this.registerForm = this.fb.group({
      nrOrdem: [''],
      dtAtendimento: ['', Validators.required],
      qtdDiasGarantia: ['', Validators.required],
      defeito: [''],
      servicosExecutados: [''],
      pecasSubstituidas: [''],
      observacao: [''],
      valorServico: [''],
      equipamentoId: ['']
    });
  }

  editarServico(servico: Servico, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.servico = Object.assign({}, servico);
    console.log(servico);
    this.registerForm.patchValue(this.servico);
  }

  excluirServico(servico: Servico, template: any) {
    this.openModal(template);
    this.servico = servico;
    this.bodyDeletarServico = `Tem certeza que deseja excluir o servico: ${servico.id}`;
  }

  confirmeDelete(template: any) {
    this.servicoService.deleteServico(this.servico.id).subscribe(
      () => {
        template.hide();
        this.getServicosPorEquipamento(this.servico.equipamentoId.toString());
        this.toastr.success('Servico excluido com sucesso!');
      }, error => {
        this.toastr.error('Erro ao tentar excluir servico: ${error}');
        console.log(error);
      }
    );
  }

  salvarServico(template: any) {
    if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
        this.servico = Object.assign({}, this.registerForm.value);
        this.servico.equipamentoId = this.idEquipamento;
        console.log(this.servico);
        this.servicoService.postServico(this.servico).subscribe(
          (novoServico: Servico) => {
            template.hide();
            this.ngOnInit();
            this.getServicosPorEquipamento(this.servico.equipamentoId.toString());
            this.toastr.success('Servico inserido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao incluir servico: ${error}');
          });
      } else {
        this.servico = Object.assign({ id: this.servico.id }, this.registerForm.value);
        console.log(this.servico);
        this.servicoService.putServico(this.servico).subscribe(
          () => {
            template.hide();
            this.ngOnInit();
            this.getServicosPorEquipamento(this.servico.equipamentoId.toString());
            this.toastr.success('Servico alterado com sucesso!');
          }, error => {
            console.log(error);
            this.toastr.error('Erro ao alterar servico: ${error}');
          });
      }
    }
  }

  getServicosPorEquipamento(idEquipamento: string) {
    this.servicoService.getServicoByEquipamento(idEquipamento).subscribe(
      (Servicos: Servico[]) => {
        this.servicos = Servicos;
        this.servicoFiltrados = this.servicos;
        console.log(this.servicos);
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao tentar carregar servicos: ${error}');
      });
  }

}
