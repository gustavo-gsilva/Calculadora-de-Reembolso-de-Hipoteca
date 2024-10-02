const botaoLimpar = document.querySelector('.limpar-campos');
const botaoCalcular = document.querySelector('.btn');
const campos = document.querySelectorAll('.campo-padrao');
const campos2 = document.querySelectorAll('.campo-padrao-2');
const msgErro = document.querySelectorAll('.erro');
const msgErro2 = document.querySelectorAll('.erro-2');
const msgErro3 = document.querySelector('.erro-3');
const mensagemDePagamento = document.querySelector('.mensagem-de-pagamento');
const infoDePagamentoConcluido = document.querySelector('.info-de-pagamento-concluido');
const img = document.querySelector('.img');

botaoLimpar.addEventListener('click', () => {
    limparCampos('.campo-limpo');
    desmarcarRadios();
    mensagemDePagamento.classList.remove('display-none');
    infoDePagamentoConcluido.classList.add('display-none');
    img.classList.remove('display-none');
});

botaoCalcular.addEventListener('click', () => {
    const camposRadio = document.querySelectorAll('input[type="radio"]');
    verificarRadio(camposRadio);
    validarCampos(campos, msgErro, 'campo-padrao', 'campo-vazio', 'campo-preenchido');
    validarCampos(campos2, msgErro2, 'campo-padrao-2', 'campo-vazio-2', 'campo-preenchido-2');

    const todosCamposPreenchidos = Array.from(campos).every(campo => campo.value.trim() !== '') &&
        Array.from(campos2).every(campo => campo.value.trim() !== '') &&
        Array.from(camposRadio).some(radio => radio.checked);

    if (todosCamposPreenchidos) {
        mensagemDePagamento.classList.add('display-none');
        infoDePagamentoConcluido.classList.remove('display-none');
        img.classList.add('display-none');
    }
});

function limparCampos(seletor) {
    const campos = document.querySelectorAll(seletor);
    campos.forEach(campo => {
        campo.value = '';
        campo.classList.remove('campo-preenchido', 'campo-vazio');
        campo.classList.add('campo-padrao');
    });
};

function desmarcarRadios() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = false;

        const bordaEspecifica = radio.parentElement;
        bordaEspecifica.classList.remove('borda-ativo');
        bordaEspecifica.classList.add('borda-desativado');
        bordaEspecifica.style.backgroundColor = '';
    });
};

function verificarRadio(camposRadio) {
    const algumCampoAtivo = Array.from(camposRadio).some(radio => radio.checked);
    msgErro3.style.opacity = algumCampoAtivo ? '0' : '1';
};

function validarCampos(campos, mensagens, classeBase, classeVazio, classePreenchido) {
    campos.forEach((campo, index) => {
        const mensagem = mensagens[index];
        if (campo.value.trim() === '') {
            campo.classList.remove(classeBase, classePreenchido);
            campo.classList.add(classeVazio);
            mensagem.style.opacity = '1';
        } else {
            campo.classList.remove(classeBase, classeVazio);
            campo.classList.add(classePreenchido);
            mensagem.style.opacity = '0';
        }
    });
};

function toggleBorder(radio) {
    const bordas = document.querySelectorAll('.borda');
    bordas.forEach(borda => {
        borda.classList.remove('borda-ativo');
        borda.classList.add('borda-desativado');
    });

    const bordaEspecifica = radio.parentElement;
    bordaEspecifica.classList.remove('borda-desativado');
    bordaEspecifica.classList.add('borda-ativo');
};