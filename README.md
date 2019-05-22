##SGCOS


recriar banco de dados 

no diretorio SGCOS.Repository executar :

dotnet ef --startup-project ../SGCOS.WebAPI migrations add init

dotnet ef --startup-project ../SGCOS.WebAPI database update



//Para imagens 
Imagens 

<button class="btn btn-outline-primary" (click)="alternarImagem()">
          Mostrar Imagem
        </button>

<img *ngIf="mostrarImagem" src="http://localhost:5000/img/{{imagemUrl}}" alt=""
        [style.width.px] = "imagemLargura"
        [style.margin.px] = "imagemMargem"
        >

app.UseStaticFiles( new StaticFileOptions(){
FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
RequestPath = new PathString("/Resources")
}); 

 // upload de imagem
[HttpPost("Upload")]
public async Task<IActionResult> Upload()
{
        try
        {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Resources","Images");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);

        if(file.Length > 0)
        {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                var fullPath = Path.Combine(pathToSave,fileName.Replace("\"","").Trim());

                using(var stream = new FileStream(fullPath, FileMode.Create))
                {
                file.CopyTo(stream);                        
                }
        }

        return Ok();
        }
        catch (System.Exception ex)
        {
        return this.StatusCode(StatusCodes.Status500InternalServerError, 
        $"Upload de imagem falhou : {ex.Message}");
        }

        return BadRequest("Erro ao tentar fazer Upload de imagem");
} 
