import { Component, OnInit } from '@angular/core';
import { Equipamento } from 'src/app/_models/Equipamento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipamentoService } from 'src/app/_services/Equipamento.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipamentoedit',
  templateUrl: './equipamentoedit.component.html',
  styleUrls: ['./equipamentoedit.component.css']
})
export class EquipamentoeditComponent implements OnInit {

  titulo = 'Equipamentos';
  FiltroLista: string;
  equipamentoFiltrados: Equipamento[];
  equipamentos: Equipamento[];
  equipamento: Equipamento;
  idEquipamento: number;
  bodyDeletarEquipamento = '';
  modoSalvar = 'post';
  registerForm: FormGroup;
  returnedArray: Equipamento[];
  imagemURL = 'assets/img/upload.png';

  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  file: File;
  fileNameToUpdate: string;

  dataAtual: string;

  constructor(private equipamentoService: EquipamentoService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              public router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
               }

  get filtroLista(): string {
    return this.FiltroLista;
  }

  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.equipamentoFiltrados = this.filtroLista ? this.filtrarEquipamentos(this.filtroLista) : this.equipamentos;
  }

  filtrarEquipamentos(filtrarPor: string): Equipamento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.equipamentos.filter(
      equipamento => equipamento.nrSerie.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  novoEquipamento() {
    this.modoSalvar = 'post';
    //this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    console.log('oninit');
    this.idEquipamento = +this.route.snapshot.paramMap.get('idEquipamento');
    if (this.idEquipamento !== 0 ) {
      console.log(this.idEquipamento);
      this.getEquipamentosPorId(this.idEquipamento);
    } else {
      console.log('getall');
      this.getAllEquipamentos();
    }
    this.validation();
  }

  roleName() {
    return sessionStorage.getItem('role');
  }

  getEquipamentosPorId(idEquipamento: number) {
    this.equipamentoService.getEquipamentoById(idEquipamento).subscribe(
      (Equipamento: Equipamento) => {
        this.equipamento = Equipamento;
        console.log(this.equipamento);
        this.editarEquipamento(this.equipamento);
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao tentar carregar equipamento: ${error}');
      });
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getAllEquipamentos() {
    this.equipamentoService.getAllEquipamento().subscribe(
      (Equipamentos: Equipamento[]) => {
        this.equipamentos = Equipamentos;
        this.equipamentoFiltrados = this.equipamentos;
        console.log(this.equipamentos);
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao tentar carregar equipamentos: ${error}');
      });
  }

  validation() {
    this.registerForm = this.fb.group({
      nrSerie: ['', Validators.required],
      descricao: [''],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      imagemURL: ['', Validators.required],
      clienteId: []
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file);
    }
  }

  uploadImagem() {
    if (this.modoSalvar === 'post') {
      const nomeArquivo = this.equipamento.imagemURL.split('\\', 3);
      this.equipamento.imagemURL = nomeArquivo[2];

      this.equipamentoService.postUpload(this.file, nomeArquivo[2])
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getAllEquipamentos();
          }
        );
    } else {
      this.equipamento.imagemURL = this.fileNameToUpdate;
      this.equipamentoService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getAllEquipamentos();
          }
        );
    }
  }


  editarEquipamento(equipamento: Equipamento) {
    this.modoSalvar = 'put';
    console.log('1');
    console.log(equipamento);
    //this.openModal(template);
    this.equipamento = Object.assign({}, equipamento);
    console.log('2');
    console.log(this.equipamento);
    this.fileNameToUpdate = this.equipamento.imagemURL.toString();
    console.log('3');
    this.equipamento.imagemURL = '';
    console.log(this.equipamento);
    this.registerForm.patchValue(this.equipamento);
  }

  excluirEquipamento(equipamento: Equipamento, template: any) {
    this.openModal(template);
    this.equipamento = equipamento;
    this.bodyDeletarEquipamento = `Tem certeza que deseja excluir o equipamento: ${equipamento.nrSerie}`;
  }

  confirmeDelete(template: any) {
    const clienteId =  this.equipamento.clienteId;
    this.equipamentoService.deleteEquipamento(this.equipamento.id).subscribe(
      () => {
        template.hide();
        this.ngOnInit();
        /* this.getEquipamentosPorCliente(clienteId); */
        this.toastr.success('Equipamento excluido com sucesso!');
      }, error => {
        this.toastr.error('Erro ao tentar excluir equipamento: ${error}');
        console.log(error);
      }
    );
  }

  salvarEquipamento(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.equipamento = Object.assign({}, this.registerForm.value);
        //this.equipamento.clienteId = this.idCliente;
        console.log(this.equipamento);
        this.uploadImagem();
        this.equipamentoService.postEquipamento(this.equipamento).subscribe(
          (novoEquipamento: Equipamento) => {
            template.hide();
            //this.getEquipamentosPorCliente(this.equipamento.clienteId);
            this.toastr.success('Equipamento inserido com sucesso!');
          }, error => {
            this.toastr.error('Erro ao incluir equipamento: ${error}');
          });
      } else {
        this.equipamento = Object.assign({ id: this.equipamento.id }, this.registerForm.value);
        console.log(this.equipamento);
        this.uploadImagem();
        this.equipamentoService.putEquipamento(this.equipamento).subscribe(
          () => {
            template.hide();
            //this.getEquipamentosPorCliente(this.equipamento.clienteId);
            this.toastr.success('Equipamento alterado com sucesso!');
          }, error => {
            console.log(error);
            this.toastr.error('Erro ao alterar equipamento: ${error}');
          });
      }
    }
  }

}
