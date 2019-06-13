import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../_services/Servico.service';
import { BsModalService, BsModalRef, BsLocaleService, DateFormatter } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servico } from '../_models/Servico';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap';


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {


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
  minDate: Date;
  maxDate: Date;

  dataAtual =  (this.maxDate);

  filtrarServicos(filtrarPor: string): Servico[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.servicos.filter(
      servico => servico.nrOrdem.toString().indexOf(filtrarPor) !== -1
    );
  }


  ngOnInit() {
    this.idEquipamento = +this.route.snapshot.paramMap.get('idEquipamento');
    if (this.idEquipamento !== 0) {
      this.getServicosPorEquipamento(this.idEquipamento.toString());
    } else {
      this.getAllServicos();
    }
    this.validation();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - (5 * 365) );
    this.maxDate.setDate(this.maxDate.getDate());
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
      nrOrdem: ['', Validators.required],
      dtAtendimento: ['', Validators.required],
      qtdDiasGarantia: ['', Validators.required],
      defeito: ['', Validators.required],
      servicosExecutados: ['', Validators.required],
      pecasSubstituidas: [''],
      observacao: [''],
      valorServico: ['', Validators.required],
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
    this.bodyDeletarServico = `Tem certeza que deseja excluir o serviço: ${servico.id}`;
  }

  confirmeDelete(template: any) {
    this.servicoService.deleteServico(this.servico.id).subscribe(
      () => {
        template.hide();
        this.getServicosPorEquipamento(this.servico.equipamentoId.toString());
        this.toastr.success('Serviço excluido com sucesso!');
      }, error => {
        this.toastr.error(`Erro ao tentar excluir serviço: ${error}`);
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
            this.toastr.success('Serviço inserido com sucesso!');
          }, error => {
            this.toastr.error(`Erro ao incluir serviço: ${error}`);
          });
      } else {
        this.servico = Object.assign({ id: this.servico.id }, this.registerForm.value);
        console.log(this.servico);
        this.servicoService.putServico(this.servico).subscribe(
          () => {
            template.hide();
            this.ngOnInit();
            this.getServicosPorEquipamento(this.servico.equipamentoId.toString());
            this.toastr.success('Serviço alterado com sucesso!');
          }, error => {
            console.log(error);
            this.toastr.error(`Erro ao alterar serviço: ${error}`);
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
        this.toastr.error(`Erro ao tentar carregar servicos: ${error}`);
      });
  }


  getAllServicos() {
    this.servicoService.getAllServico().subscribe(
      (Servicos: Servico[]) => {
        this.servicos = Servicos;
        this.servicoFiltrados = this.servicos;
        console.log(this.servicos);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar serviços: ${error}`);
      });
  }

}
