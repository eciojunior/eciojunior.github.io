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
    document.getElementById("detalheEmpilhadeira").style.display = "block";
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
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("observacaoEmpilhadeira", empilhadeiraSelecionada.observacao);
    detalhadoEmpilhadeira = detalhadoEmpilhadeira.replace("valorEmpilhadeira", empilhadeiraSelecionada.valor);
    document.getElementById("dadosEmpilhadeira").innerHTML = detalhadoEmpilhadeira;
}

function voltarEmpilhadeiras () {
    document.getElementById("empilhadeiras").style.display = "block";
    document.getElementById("detalheEmpilhadeira").style.display = "none";  
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

var modelo = '<div class="row"> ' +
'	<a style="width: 100%;" onclick="abrirEmpilhadeira(idEmpilhadeira)" class="services-icon" href="#services">' +
'	<div class="col-md-3" aling="center">' +
 '         <img class="logo-curso" src="img/Empilhadeiras/pastaEmpilhadeira/principal.jpeg"> ' +
'	</div>' +
'	<div class="col-md-5" align="left">' +
 '         <h3>nomeEmpilhadeira</h3>' +
'	</div>' +
'	<div class="col-md-2">' +
'	  <h4>valorEmpilhadeira</h4>' +
'	</div>' +
'	<div class="col-md-2">' +
'	  <h4>anoEmpilhadeira</h4> ' +
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
        novo = novo.replace("valorEmpilhadeira", empilhadeira.valor);
        html = html + novo;
    });
    document.getElementById("empilhadeiras").innerHTML = html;
}

montarHtmlEstoque();
var modeloDadosEmpilhadeira = '              <div class="row">' +
'  <h3>nomeEmpilhadeira</h3>' +
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
'  <label><b>Observação:</b> observacaoEmpilhadeira</label>' +
'  </div>' +
'  <div class="precoEmpilhadeira row">' +
'  <label>valorEmpilhadeira</label>' +
'  </div>';
