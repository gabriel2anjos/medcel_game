//Tipos: 0 - Consulatorio, 1 - Audio, 2 - RaioX, 3 - Imagem, 4 - Sangue, 5 - Urina

export let arvore = {
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
                
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            },
            0:{
                exame:"Verificar febre",
                tipo:0,
                resultado:"Não há febre",
                
                precisao:0,
                no:4,
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
                erro:"Uma ausculta cardíaca poderia indicar pericardite, e te ajudaria a ter um diagnostico mais preciso.",
                tipo:1,
                resultado:"../aa/aa/aa",
                
                precisao:4,
                no:3,
                no_pai:-1,
                checado: false,
            },
            1:{
                exame:"Realizar raio-X do tórax",
                erro:"Um raio-X do torax denunciaria pericardite, dando mais precisão ao diagnostico.",
                tipo:2,
                resultado:"../aa/aa/aa",
                
                precisao:2,
                no:3,
                no_pai:-1,
                checado: false,
            },
            2:{
                exame:"Realizar exame de imagem do tórax",
                erro:"Um exame de imagem do torax denunciaria pericardite, dando mais precisão ao diagnostico.",
                tipo:3,
                resultado:"./res/heart/heart.obj",
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
                exame:"Realizar ultrassonografia",
                erro:"Não era necessário realizar uma ultrassonografia.",
                tipo:1,
                resultado:"./res/heart/heart.obj",
                
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            },
            1:{
                exame:"Relizar exame de urina",
                tipo:5,
                resultado:"./res/heart/heart.obj",
                precisao:6,
                no:3,
                no_pai:-1,
                checado: false,
            },
            2:{
                exame:"Relizar exame de sangue",
                tipo:4,
                resultado:"./res/heart/heart.obj",
                precisao:6,
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
                tipo:1,
                resultado:"../aa/aa/aa",
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
                erro:"O paciente não foi perguntado sobre dores ao respirar.",
                precisao:4,
                no:0,
                no_pai:-1,
                checado: false,
            }
        },
        exames:{
            0:{
                exame:"Realizar teste de reação",
                tipo:0,
                resultado:"Reação ok.",
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            },
            
        }
    },
}