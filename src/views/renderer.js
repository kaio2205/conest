
function client() {
    api.openclient()
}
function fornec() {
    api.openfornec()
}
function produto() {
    api.openproduto()
}

function relatorio(){
    api.openrelatorio()
}

// alteraçao do icone do status do banco de dados 
api.dbMessage((event,message)=>{
console.log(message)
if (message === "conectado") {
    document.getElementById('status').src ="../public/img/dbon.png"
} else {
    document.getElementById('status').src ="../public/img/dboff.png"
}
})
