import dados from "../data/models/dados.js";
const { speedruners } = dados;

const getAllSpeedruners = (req,res) => {
    const { jogo, categoria, ranking, plataforma } = req.query;
    let resultado = speedruners;

    if ( jogo ) {
        resultado = resultado.filter(j => j.jogo.toLowerCase() === jogo.toLowerCase())
    }
    if ( categoria ) {
        resultado = resultado.filter(c => c.categoria.toLowerCase() === categoria.toLowerCase())
    }
    if ( ranking ) {
        resultado = resultado.filter(r => r.ranking == ranking)
    }
    if ( plataforma ) {
        resultado = resultado.filter(p => p.plataforma.toLowerCase() === plataforma.toLowerCase())
    }


    res.status(200).json({
        total: resultado.length,
        speedruners: resultado
    })
}

const getSpeedrunersByID = (req,res) => {
    const id = parseInt(req.params.id)
    const speedruner = speedruners.find(s => s.id === id);

    if (speedruner) {
        res.status(200).json(speedruner)
    } else {
        res.status(400).json({
            message: "Speedruners nao encontrado!!"
        })
    }
}

const createSpeedruner = (req,res) => {
    const { jogo, categoria, jogador, tempo, plataforma, data, verificado, ranking } = req.body;

    if (!jogador || !jogo || !tempo > 0 || !verificado ) {
        return res.status(400).json({
            success: false,
            message: "Jogador e jogo são obrigatorios. Tempo deve ser maior que zero. Record deve haver uma verificação"
        })
    }

    const novoSpeedruner = {

        id: speedruners.length + 1,
        jogo: jogo,
        categoria: categoria,
        jogador: jogador,
        tempo: tempo,
        plataforma: plataforma,
        data: data,
        verificado: verificado,
        ranking: parseInt(ranking)

    }

    speedruners.push(novoSpeedruner);

    res.status(200).json({
        success: true,
        message: "Novo speedruner foi adicionado" 
    })

}

const deleteSpeedruner = (req,res) => {
    const id = parseInt(req.params.id)

    const speedrunerParaRemover = speedruners.find(s => s.id === id)

    if(!speedrunerParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Esse speedruner nao existe ou já foi deletado"
        })
    }

    const speedrunersFiltrados = speedruners.filter(speedruner => speedruner.id !== id)

    speedruners.splice(0, speedruners.length, ...speedrunersFiltrados)

    res.status(200).json({
        success: true,
        message: "Speedruner deletado com sucesso",
        speedrunerRemovido: speedrunerParaRemover
    })
}

const updateSpeedruner = (req,res) => {
    const id = parseInt(req.params.id);
    const { jogo, categoria, jogador, tempo, plataforma, data, verificado, ranking } = req.body;

    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400)({
            success: false,
            message: "O id deve ser um numero válido"
        })
    }

    const speedrunerExiste = speedruners.find(speedruner => speedruner.id === idParaEditar)
    if (!speedrunerExiste) {
        return res.status(404)({
            success: false,
            message: `Speedruner com id ${id} não existe.`
        })
    }

    const speedrunersAtualizados = speedruners.map(speedruner => speedruner.id === idParaEditar ? {

        ...speedruner,
        ...(jogo && {jogo}),
        ...(categoria && {categoria}),
        ...(jogador && {jogador}),
        ...(tempo && {tempo: parseInt(tempo)}),
        ...(plataforma && {plataforma}),
        ...(data && {data}),
        ...(verificado && {verificado}),
        ...(ranking && {ranking: parseInt(ranking)}),

    } : speedruner)

    speedruners.splice(0, speedruners.length, ...
    speedrunersAtualizados);

    const speedrunerNovo = speedruners.find(speedruner => speedruner.id === idParaEditar)

    res.status(200).json({
        success: true,
        message: `Dados do(a) Speedruner ID ${idParaEditar} atualizados com sucesso`,
        Speedruner: speedrunerNovo
    })
}

export { getAllSpeedruners, getSpeedrunersByID, createSpeedruner, deleteSpeedruner, updateSpeedruner}