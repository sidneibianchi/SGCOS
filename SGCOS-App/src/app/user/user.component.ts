import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  titulo = 'Clientes';
  usersFiltrados: User[];
  users: User[];
  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private fb: FormBuilder ) { }

  ngOnInit() {
    this.getUsers();
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
    id: [''],
    userName: [''],
    email: [''],
    password: [''],
    fullName: ['']
    });
  }

  getUsers() {
    this. authService.getAllUser().subscribe(
      (Users: User[]) => {
        this.users = Users;
        this.usersFiltrados = this.users;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar cliente: ${error}`);
      });
  }
}
