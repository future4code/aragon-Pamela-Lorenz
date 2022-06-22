import React from 'react';

/* Classe TracksExhibition -> responsável pela renderização dos recursos de exibir
    e remover músicas de uma playlist selecionada.
    É o equivalente à Seção2 da Tela2 descrita na atividade. */
class TracksExhibition extends React.Component {
    render() {
        /* Descrição de funcionamento da lógica de filtro e mapeamento de tracks
            
            PARTE 1)
            variável tracks -> criada para produzir o efeito de filtrar quando um
            faz uma busca e renderizar os resultados (tanto de busca quanto sem busca).
            Implementação segue a ordem: array.filter().map()
            
            PARTE 2)
            Implementação do filter() -> O filter é um método de array que cria um novo
            array toda vez que uma condição criada no seu interior for true.
           
            PARTE 3)
            Lógica do filter -> recebemos a informação de pesquisa inserida pelo usuário no
            campo de busca através da props searchValue. Se o usuário digitar qualquer caractere
            no campo, acessamos a primeira parte da condicional. Caso contrário, retornamos sempre
            um valor verdadeiro e, portanto, o array completo de tracks (track.name é verdadeiro pra qualquer
            string não vazia). A primeira parte da condicional if/else retornará verdadeiro se o
            valor inserido em searchValue for compatível ao nome de uma track existente.
            
            PARTE 4)
            Método utilizado na verificação -> string.search(testString)
            Se testString existir dentro de string, retornamos um valor numérico referente à posição
            do primeiro caractere de testString encontrado em string. Caso contrário, o resultado será -1

            PARTE 5)
            Exemplo de uso ->
            const string = "girafa"
            string.search("ir") -> resultado será 1 (i está no 2º caractere de girafa)
            string.search("m") -> resultado será -1 (não existe o caractere m em girafa)
        */
        const tracks = this.props.tracks
        .filter((track) => {
            if (this.props.searchValue) {  
                return track.name.search(this.props.searchValue) !== -1 ||
                    track.artist.search(this.props.searchValue) !== -1;
            } else {
                return track.name;
            }
        })
        .map((track) => {
            return (
                <div key={track.id}>
                    <div>
                        <span>{track.name} - </span>
                        <span>{track.artist} </span>
                        <button
                            onClick={() => this.props.removeTrackFromPlaylist(track.id)}
                        >
                            Excluir
                        </button>
                    </div>
                    <audio controls="controls">
                        <source src={track.url} type="audio/ogg" />
                    </audio>
                </div>
            )
        })
        return (
            <div>
                <h1>Lista de Músicas</h1>
                <p>Observação: Após deploy no surge, caso tenha problemas na execução
                    da música, tente acessar o link do deploy pelo navegador firefox.
                </p>
                <h2>{this.props.playlist.name}</h2>
                {tracks}
            </div>
        );
    };
};

export default TracksExhibition;