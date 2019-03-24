export const arvore = {
    0:{
        name:'Cabeça',
        dialogos:{
            0:{
                fala:"Sinto muita dor de cabeça.",
                erro:"O paciente não foi perguntado sobre dores de cabeça.",
                precisao:4,
                no:0,
                no_pai:-1,
                checado: false,
            },
            1:{
                fala:"Sinto dor ao olhar para a luz.",
                erro:"O paciente não foi perguntado sobre fotossensibilidade.",
                precisao:4,
                no:1,
                no_pai:-1,
                checado: false,
            },
        },
        exames:{
            0:{
                exame:"Verificar pupilas",
                tipo:0,
                resultado:"Não há anomalia",
                pontuacao: 0,
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            }
        }
    },
    1:{
        name:'Torax',
        dialogos:{
            0:{
                fala:"Sinto um pouco de dor no peito",
                erro:"O paciente não foi perguntado sobre dores no peito.",
                precisao:4,
                no:0,
                no_pai:-1,
                checado: false,
                },
            },
        exames:{
            0:{
                exame:"Realizar ausculta",
                erro:"Uma ausculta cardíaca poderia indicar plaurisite, e te ajudaria a ter um diagnostico mais preciso.",
                tipo:2,
                resultado:"../aa/aa/aa",
                pontuacao: 0,
                precisao:4,
                no:3,
                no_pai:-1,
                checado: false,
            },
            1:{
                exame:"Realizar raio-X do tórax",
                erro:"Um raio-X do torax denunciaria pericardite, dando mais precisão ao diagnostico.",
                tipo:1,
                resultado:"../aa/aa/aa",
                pontuacao: 0,
                precisao:2,
                no:3,
                no_pai:-1,
                checado: false,
            },
        }
    },
    2:{
        name:'Abdome',
        dialogos:{
            0:{
                fala:"Não sinto nada no abdôme.",
                precisao:0,
                no:0,
                no_pai:-1,
                checado: false,
                },
            },
        exames:{
            0:{
                exame:"Relizar ultrassonografia",
                erro:"Não era necessário realizar uma ultrassonografia.",
                tipo:1,
                resultado:"./res/heart/heart.obj",
                pontuacao: 0,
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            },
        }
        
    },
    3:{
        name:'Costas',
        dialogos:{
            0:{
                fala:"Sinto um pouco de dor ao respirar",
                erro:"O paciente não foi perguntado sobre dores ao respirar.",
                precisao:4,
                no:0,
                no_pai:-1,
                checado: false,
                },
            },
        exames:{
            0:{
                exame:"Realizar ausculta",
                erro:"Uma ausculta pulmonar te ajudaria a ter um diagnostico mais preciso.",
                tipo:2,
                resultado:"../aa/aa/aa",
                pontuacao: 0,
                precisao:4,
                no:3,
                no_pai:-1,
                checado: false,
            },
            
        }
    },
    4:{
        name:'Perna',
        dialogos:{
            0:{
                fala:"Minhas articulações doem muito quando me movimento.",
            }
        },
        exames:{
            0:{
                exame:"Realizar ausculta",
                erro:"Uma ausculta pulmonar te ajudaria a ter um diagnostico mais preciso.",
                tipo:2,
                resultado:"../aa/aa/aa",
                pontuacao: 0,
                precisao:4,
                no:3,
                no_pai:-1,
                checado: false,
            },
            
        }
    },
}