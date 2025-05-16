// Espera o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    const mensagemDiv = document.getElementById('mensagem');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');

    // Adiciona um listener para o evento de submit do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário

        // Desativa o botão e mostra o spinner
        submitButton.classList.add('loading');
        buttonText.textContent = 'Enviando...'; // Altera o texto do botão
        mensagemDiv.textContent = ''; // Limpa mensagens anteriores
        mensagemDiv.className = 'mensagem'; // Reseta as classes da mensagem

        const formData = new FormData(form); // Coleta os dados do formulário
        const data = Object.fromEntries(formData.entries()); // Converte para um objeto JSON

        try {
            // Envia os dados para o backend usando fetch API
            const res = await fetch('/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Converte o objeto para uma string JSON
            });

            const resultado = await res.json(); // Processa a resposta JSON do backend

            // Exibe a mensagem de sucesso ou erro
            if (resultado.status === 'sucesso') {
                mensagemDiv.textContent = "Dados enviados com sucesso! Em breve entraremos em contato.";
                mensagemDiv.classList.add('sucesso');
                form.reset(); // Limpa o formulário em caso de sucesso
            } else {
                mensagemDiv.textContent = "Ocorreu um erro ao enviar os dados. Tente novamente.";
                mensagemDiv.classList.add('erro');
            }

        } catch (error) {
            // Captura e exibe erros de rede ou outros
            console.error("Erro ao enviar dados:", error);
            mensagemDiv.textContent = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
            mensagemDiv.classList.add('erro');
        } finally {
            // Reativa o botão e esconde o spinner
            submitButton.classList.remove('loading');
            buttonText.textContent = 'Quero Vender Mais'; // Volta o texto original do botão
            mensagemDiv.classList.add('show'); // Torna a mensagem visível com transição
        }
    });
});

// Função para scroll suave para a seção do formulário
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});