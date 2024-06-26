function cep(){

let cep = frm.fornecedor.inputcep
let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

fetch(urlAPI)
.then((response)=>{ // obter os dados
return response.json()


})
.then((dados)=>{ // manipular os dados obtidos 
frm.fornecedor.inputlogradouro.value
frm.fornecedor.inputbairro.value
frm.fornecedor.inputcidade.value





})



.catch((erro)=>{
    console.log(`Erro ao obter o endereço: ${erro}`)
})
}