import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const idEquipamento = +this.route.snapshot.paramMap.get('idEquipamento');
    console.log(idEquipamento);
  }

}
