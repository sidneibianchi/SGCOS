import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../_services/Servico.service';
import { BsModalService, BsModalRef, BsLocaleService, DateFormatter } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servico } from '../_models/Servico';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { toInt } from 'ngx-bootstrap/chronos/utils/type-checks';
import { EquipamentoService } from '../_services/Equipamento.service';
import { Equipamento } from '../_models/Equipamento';
import { Cliente } from '../_models/Cliente';
import { ClienteService } from '../_services/Cliente.service';

defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  @ViewChild('nrOrdem') NrOrdem: ElementRef;
  @ViewChild('emailDestinatario') EmailDestinatario: ElementRef;

    constructor(private servicoService: ServicoService,
                private equipamentoService: EquipamentoService,
                private clienteService: ClienteService,
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
  servicosComp: Servico[];
  servico: Servico;
  bodyDeletarServico = '';
  modoSalvar = 'post';
  FiltroLista: string;
  registerForm: FormGroup;
  idEquipamento: number;
  dtAtendimento: string;
  minDate: Date;
  maxDate: Date;
  equipamento: Equipamento;
  cliente: Cliente;
  bodyEmailDestinatario = '';
  emailForm: FormGroup;

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
      this.getEquipamentoPorId(this.idEquipamento);
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
    this.getServicosComparacao();
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


  enviarEmail(servico: Servico, detalhes: any, emailDest: any) {
    console.log(detalhes);
    console.log(emailDest);
    detalhes.hide();
    emailDest.show();
    this.servico = servico;
  }

  confirmeEnvio(template: any) {
    this.servicoService.enviaEmail(this.EmailDestinatario.nativeElement.value, this.servico).subscribe(
      () => {
        template.hide();
        this.toastr.success('Email enviado com sucesso!');
        this.EmailDestinatario.nativeElement.value = '';
      }, error => {
      this.toastr.error(`Erro ao tentar enviar email: ${error}`);
      console.log(error);
    });
  }

  confirmeDelete(template: any) {
    this.servicoService.deleteServico(this.servico.id).subscribe(
      () => {
        template.hide();
       /*  this.ngOnInit(); */
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
        console.log(this.servico);
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

  getServicosComparacao() {
    this.servicoService.getAllServico().subscribe(
      (Servicos: Servico[]) => {
        this.servicosComp = Servicos;
        console.log(this.servicosComp);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar serviços: ${error}`);
      });
  }

  getEquipamentoPorId(idEquipamento: number) {
    this.equipamentoService.getEquipamentoById(idEquipamento).subscribe(
      (Equip: Equipamento) => {
        this.equipamento = Equip;
        console.log(this.equipamento);
        this.getClientePorId(this.equipamento.clienteId);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar equipamento: ${error}`);
      });
  }

  getClientePorId(idCliente: number) {
    this.clienteService.getClienteById(idCliente).subscribe(
      (cli: Cliente) => {
        this.cliente = cli;
        console.log(this.cliente);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar cliente: ${error}`);
      });
  }

  VerificaNrOrdem(nrordem: string, template: any) {
    if (nrordem === '') {
      return;
    }

    const ret =  this.servicosComp.filter(
         servico => servico.nrOrdem.toString() === nrordem);

    if (ret.length > 0 ) {
        this.toastr.warning('Ordem de serviço já possui um cadastrado no sistema.');
        this.novoServico(template);
        this.NrOrdem.nativeElement.focus();
      }

  }

}
