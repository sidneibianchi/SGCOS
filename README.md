##SGCOS


recriar banco de dados 

no diretorio SGCOS.Repository executar :

dotnet ef --startup-project ../SGCOS.WeAPI migrations add init

dotnet ef --startup-project ../SGCOS.WebAPI database update


Imagens 

<button class="btn btn-outline-primary" (click)="alternarImagem()">
          Mostrar Imagem
        </button>

<img *ngIf="mostrarImagem" src="http://localhost:5000/img/{{imagemUrl}}" alt=""
        [style.width.px] = "imagemLargura"
        [style.margin.px] = "imagemMargem"
        >