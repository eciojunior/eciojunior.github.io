var paginaAtual = "home";
var empilhadeiraSelecionada = {};
var fotoAtual = 1;
function mudarPagina(pagina) {
    document.getElementById(paginaAtual).style.display = "none";
    document.getElementById(pagina).style.display = "block";
    paginaAtual = pagina;
}

function abrirEmpilhadeira (id) {
    empilhadeiraSelecionada = json.find(function(img) {
        return img.id == id;
    });
    document.getElementById("empilhadeiras").style.display = "none";
    document.getElementById("tituloGrid").style.display = "none";
    document.getElementById("detalheEmpilhadeira").style.display = "block";
    document.getElementById("imageBak").style.display = "block";
    lerFotos();
    aplicarFotoGrande(null);
    buscarDadosEmpilhadeira();
}

function buscarDadosEmpilhadeira () {    
    var detalhadoEmpilhadeira = modeloDadosEmpilhadeira;
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("nomeEmpilhadeira", empilhadeiraSelecionada.nome);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("anoEmpilhadeira", empilhadeiraSelecionada.ano);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("capacidadeEmpilhadeira", empilhadeiraSelecionada.capacidade);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("torreEmpilhadeira", empilhadeiraSelecionada.torre);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("combEmpilhadeira", empilhadeiraSelecionada.comb);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("marcaEmpilhadeira", empilhadeiraSelecionada.marca);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("observacaoEmpilhadeira", empilhadeiraSelecionada.observacao);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("valorEmpilhadeira", empilhadeiraSelecionada.valor);
    document.getElementById("dadosEmpilhadeira").innerHTML = detalhadoEmpilhadeira;
}

function openInNewTab(url) {
    console.log(url);
    var win = window.open(url, '_blank');
    win.focus();
  }

function voltarEmpilhadeiras () {
    document.getElementById("empilhadeiras").style.display = "block";
    document.getElementById("tituloGrid").style.display = "block";
    document.getElementById("detalheEmpilhadeira").style.display = "none";  
    document.getElementById("imageBak").style.display = "none";
}

function lerFotos() {
    var html = "";
    for (var i = 1; i <= empilhadeiraSelecionada.qtdFotos; i++) {
        var exemplar = modeloFotoLateral;
        exemplar = exemplar.replace("numeroFoto", i);
        exemplar = exemplar.replace("numeroFoto", i);
        exemplar = exemplar.replace("pastaFoto", empilhadeiraSelecionada.pasta);
        html = html + exemplar;
    }
    document.getElementById("fotosLaterais").innerHTML = html;
}

function aplicarFotoGrande (foto) {
    var toAply = foto || 1;
    var html = '<img style="width: auto; height: 400px;" src="img/Empilhadeiras/'+empilhadeiraSelecionada.pasta+'/'+toAply+'.jpeg"/>';
    document.getElementById("fotoGrande").innerHTML = html;
    fotoAtual = toAply;
}

function moverFoto (ind) {
    var ftToAply = 0;
    if (ind > 0) {
        if ((fotoAtual + 1) <= empilhadeiraSelecionada.qtdFotos) {
            ftToAply = fotoAtual + 1;
        } else {
            ftToAply = 1;
        }
    }
    if (ind < 0) {
        if ((fotoAtual -1) < 1) {
            ftToAply = empilhadeiraSelecionada.qtdFotos;
        } else {
            ftToAply = fotoAtual - 1;
        }
    }
    aplicarFotoGrande(ftToAply);
}

var modeloFotoLateral = '               <a onclick="aplicarFotoGrande(numeroFoto)" href="#"> ' +
' <img class="iconeImagem" src="img/Empilhadeiras/pastaFoto/numeroFoto.jpeg"/><br> </a>' 

var modelo = '<div class="row itemEstoque"> ' +
'	<a style="width: 100%;" onclick="abrirEmpilhadeira(idEmpilhadeira)" class="services-icon" href="#services">' +
'	<div class="col-md-3" aling="center">' +
 '         <img class="logo-curso" src="img/Empilhadeiras/pastaEmpilhadeira/principal.jpeg"> ' +
'	</div>' +
'	<div class="col-md-2" style="height: 150px" align="left">' +
'      <h4 class="dadoEmp">nomeEmpilhadeira</h4>' +
'	</div>' +
'	<div class="col-md-2" style="height: 150px" >' +
'     <h4 class="dadoEmp">marcaEmpilhadeira</h4>' +
'	</div>' +
'	<div class="col-md-2" style="height: 150px">' +
'	  <h4 class="dadoEmp"> anoEmpilhadeira</h4>' +
'	</div>' +
'	<div class="col-md-2" style="height: 150px">' +
'	  <h4 class="dadoEmp">capacidadeEmpilhadeira</h4> ' +
'	</div>' +
'	<div class="col-md-1" style="height: 150px">' +
'	  <img class="dadoEmp" style="height: 60px; margin-top: 50px" src="img/saiba mais.png"/> ' +
'	</div>' +
'   </a>' +
 '</div>';

function montarHtmlEstoque () {
    var html = "";
    json.forEach(function(empilhadeira) {
        var novo = modelo;
        novo = novo.replace("pastaEmpilhadeira", empilhadeira.pasta);
        novo = novo.replace("nomeEmpilhadeira", empilhadeira.nome);
        novo = novo.replace("idEmpilhadeira", empilhadeira.id);
        novo = novo.replace("anoEmpilhadeira", empilhadeira.ano);
        novo = novo.replace("marcaEmpilhadeira", empilhadeira.marca);
        novo = novo.replace("capacidadeEmpilhadeira", empilhadeira.capacidade);

        html = html + novo;
    });
    document.getElementById("empilhadeiras").innerHTML = html;
}

montarHtmlEstoque();
var modeloDadosEmpilhadeira = '              <div class="row">' +
'  <h3>nomeEmpilhadeira</h3>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Marca:</b> marcaEmpilhadeira</label>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Ano:</b> anoEmpilhadeira</label>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Capacidade:</b> capacidadeEmpilhadeira</label>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Torre:</b> torreEmpilhadeira</label>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Comb.:</b> combEmpilhadeira</label>' +
'  </div>' +
'  <div class="row dadosEmp">' +
'  <label><b>Observação:</b> observacaoEmpilhadeira</label>' +
'  </div>' +
'  <div class="precoEmpilhadeira row">' +
'  <label>valorEmpilhadeira</label>' +
'  </div>';
