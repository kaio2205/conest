// Função responsável por automatizar o endereço pela busca do CEP através de API
function buscarCep() {
    let cep = (frmFornecedor.inputCep.value)
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    // uso de promisse para recuperar os dados do webservices (API)
    fetch(urlAPI)
        .then((response) => { //obter os dados
            return response.json()
        })
        .then((dados) => { //manipular os dados obtidos
            frmFornecedor.inputlogradouro.value = `${dados.logradouro}`
            frmFornecedor.inputbairro.value = `${dados.bairro}`
            frmFornecedor.inputcidade.value = `${dados.localidade}`
            frmFornecedor.uf.value = `${dados.uf}`
        })
        .catch((error) => {
            console.log(`Erro ao obter o endereço: ${error}`)
        })
    }
