enum CATEGORIA {
    ACAO = "ação",
    COMEDIA = "comédia",
    DRAMA = "drama",
    ROMANCE = "romance",
    TERROR = "terror"
};

type Filme = {
    nome: string,
    anoDeLancamento: number,
    categoria: CATEGORIA,
    pontuacao?: number
};

function filme(nome: string, anoDeLancamento: number, categoria: CATEGORIA, pontuacao?: number) {

    const resultado = {
        nome: nome,
        anoDeLancamento: anoDeLancamento,
        categoria: categoria,
        pontuacao: pontuacao
    };

    return resultado;
};

console.log(filme("Enrolados", 2022, CATEGORIA.COMEDIA, 88));
