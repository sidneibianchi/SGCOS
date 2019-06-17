import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  titulo = 'Usuarios';
  usersFiltrados: User[];
  users: User[];
  user: User;
  registerForm: FormGroup;
  bodyDeletarUsuario = '';
  modoSalvar = 'post';

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              public router: Router) { }

  ngOnInit() {
    if (!this.userName()) {
      this.logout();
    }
    this.getUsers();
    this.validation();
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Você saiu do sistema.');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  }

  /* validation() {
    this.registerForm = this.fb.group({
    id: [''],
    userName: [''],
    email: [''],
    password: [''],
    fullName: ['']
    });
  }
  */

  getUsers() {
     this.authService.getAllUser().subscribe(
      (Users: User[]) => {
        this.users = Users;
        this.usersFiltrados = this.users;
        console.log(this.users);
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar usuarios: ${error}`);
      });
  }

  novoUsuario(template: any) {
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

  excluirUser(user: User, template: any) {
    this.openModal(template);
    this.user = user;
    this.bodyDeletarUsuario = `Tem certeza que deseja excluir o equipamento: ${user.fullName}`;
  }

  confirmeDelete(template: any) {
      this.authService.deleteUser(this.user.id).subscribe(
      () => {
        template.hide();
        this.getUsers();
        this.toastr.success('Usuário excluido com sucesso!');
      }, error => {
        this.toastr.error(`Erro ao tentar excluir usuário: ${error}`);
        console.log(error);
      }
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
      }, { validator: this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.modoSalvar === 'post') {}
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/usuarios']);
          this.toastr.success('Cadastro Realizado');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado!');
                break;
              default:
                this.toastr.error(`Erro no Cadatro! CODE: ${element.code}`);
                break;
            }
          });
        }

      );
    }
  }

}
