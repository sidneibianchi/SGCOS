import { Component, OnInit, TemplateRef } from '@angular/core';
import { InqueritoService } from '../_services/Inquerito.service';
import { Inquerito } from '../_models/Cliente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-inqueritos',
  templateUrl: './inqueritos.component.html',
  styleUrls: ['./inqueritos.component.css']
})
export class InqueritosComponent implements OnInit {

  inqueritoFiltrados: Inquerito[];
  inqueritos: Inquerito[];
  inquerito: Inquerito;
  bodyDeletarInquerito = '';
  modoSalvar = 'post';
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;

  FiltroLista: string;

  constructor(private inqueritoService: InqueritoService
            , private modalService: BsModalService
            , private fb: FormBuilder) { }

  get filtroLista(): string {
    return this.FiltroLista;
  }
  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.inqueritoFiltrados = this.filtroLista ? this.filtrarInqueritos(this.filtroLista) : this.inqueritos;
  }

  editarInquerito(inquerito: Inquerito, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.inquerito = Object.assign({}, inquerito);
    this.registerForm.patchValue(this.inquerito);
  }

  novoInquerito(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirInquerito(inquerito: Inquerito, template: any) {
    this.openModal(template);
    this.inquerito = inquerito;
    this.bodyDeletarInquerito = `Tem certeza que deseja excluir o Inquerito: ${inquerito.numeroInquerito}, Juiz: ${inquerito.nomeJuiz}`;
  }

  confirmeDelete(template: any) {
    this.inqueritoService.deleteInquerito(this.inquerito.id).subscribe(
      () => {
          template.hide();
          this.getInqueritos();
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
    this.getInqueritos();
    this.validation();
  }

  filtrarInqueritos(filtrarPor: string): Inquerito[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.inqueritos.filter(
      inquerito => inquerito.nomeJuiz.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      numeroInquerito: ['', Validators.required],
      nomeJuiz: ['', Validators.required],
      tribunal: ['', Validators.required],
      varaCriminal: ['', Validators.required]
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        console.log('post');
        this.inquerito = Object.assign({}, this.registerForm.value);
        this.inqueritoService.postInquerito(this.inquerito).subscribe(
        (novoInquerito: Inquerito) => {
          template.hide();
          this.getInqueritos();
        }, error => {
          console.log(error);
        });
      } else {
        console.log('put');
        this.inquerito = Object.assign({id: this.inquerito.id}, this.registerForm.value);
        this.inqueritoService.putInquerito(this.inquerito).subscribe(
          () => {
            template.hide();
            this.getInqueritos();
          }, error => {
            console.log(error);
          });
      }
    }
  }

  getInqueritos() {
    this.inqueritoService.getAllInquerito().subscribe(
      (Inqueritos: Inquerito[]) => {
      this.inqueritos = Inqueritos;
      this.inqueritoFiltrados = this.inqueritos;
      console.log(Inqueritos);
    }, error => {
      console.log(error);
    });
  }

}
