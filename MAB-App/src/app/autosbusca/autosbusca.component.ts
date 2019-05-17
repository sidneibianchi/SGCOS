import { Component, OnInit, TemplateRef } from '@angular/core';
import { AutoBuscaService } from '../_services/AutoBusca.service';
import { AutoBusca } from '../_models/AutoBusca';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale  } from 'ngx-bootstrap';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-autosbusca',
  templateUrl: './autosbusca.component.html',
  styleUrls: ['./autosbusca.component.css']
})
export class AutosbuscaComponent implements OnInit {

  autoBuscaFiltrados: AutoBusca[];
  autosbusca: AutoBusca[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  FiltroLista: string;

  constructor(private autoBuscaService: AutoBuscaService
              ,private modalService: BsModalService
              ,private fb: FormBuilder
              ,private localeService: BsLocaleService)
              {
                this.localeService.use('pt-br');
              }

  get filtroLista(): string {
    return this.FiltroLista;
  }
  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.autoBuscaFiltrados = this.filtroLista ? this.filtrarAutos(this.filtroLista) : this.autosbusca;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef =  this.modalService.show(template);
  }

  ngOnInit() {
    this.getAutosbusca();
    this.validation();
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarAutos(filtrarPor: string): AutoBusca[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.autosbusca.filter(
      autobusca => autobusca.incidentes.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation(){
    this.registerForm = this.fb.group({
     data:['', Validators.required],
     hora:['', Validators.required],
     incidentes: ['', Validators.required]
    });
  }

  salvarAlteracao(){

  }

  getAutosbusca() {
    this.autoBuscaService.getAllAutoBusca().subscribe(
      (_autosBusca: AutoBusca[]) => {
      this.autosbusca = _autosBusca;
      this.autoBuscaFiltrados = this.autosbusca;
      console.log(_autosBusca);
    }, error => {
      console.log(error);
    });
  }
}
