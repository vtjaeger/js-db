document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit",  async (event) => {
        event.preventDefault();

        const nomeInput = document.getElementById("nome");
        const nome = nomeInput.value;

        localStorage.setItem("nome", nome);
        console.log(nome);

        try {
            const resposta = await fetch('http://localhost:3000/server', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({nome})
            })
            if(resposta.ok){
                console.log('adicionado');
            } else {
                console.error('erro ao adicionar');
            }
        } catch (erro) {
            console.error('erro de fetch');
        }
    })
})