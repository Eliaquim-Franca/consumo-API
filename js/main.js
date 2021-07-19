'use strict';


const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('uf').value = '';
}

const preencherFormulario = (endereco) => {
    limparFormulario();
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}


const validaCep = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);



const pesquisaCep = async () => {
    limparFormulario();
    let cep = document.getElementById('cep').value;
    let url = `http://viacep.com.br/ws/${cep}/json/`;
    
    let dados = await fetch(url);
    let endereco = await dados.json();
    console.log(endereco);
    
    if (validaCep(cep)) {
        if (endereco.hasOwnProperty('erro')) {
            alert("CEP ERRADO");
            document.getElementById('endereco').value = "Endereço não encontrado."
        } else {
            preencherFormulario(endereco);
        }
    }


}

document.getElementById('cep').addEventListener('focusout', pesquisaCep);