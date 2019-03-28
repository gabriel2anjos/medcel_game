//Tipos: 0 - Consulatorio, 1 - Audio, 2 - RaioX, 3 - Imagem, 4 - Sangue, 5 - Urina

export let arvore = {
    // ID da parte do corpo (aqui é 0, poderia ser um nome)
    0:{
        //Nome exibido no centro da tela
        name:'Cabeça',
        dialogos:{
            //Primeiro dialogo
            0:{
                //Fala retornada ao clicar no botao, exibida no quadrado azul
                fala:"Sinto muita dor de cabeça.",
                //erro quando voê nao pergunta (checado==false)
                erro:"O paciente não foi perguntado sobre dores de cabeça.",
                //Peso de vc ter feito essa pergunta na precisao final
                precisao:4,
                //Id do nó (unico)
                no:0,
                //No pai que faria essa opcao aparecer apenas se ele ja tivesse sido checado.
                //Nao usei nesse projeto, mas a ideia é colocar o id do no pai. Caso nao tenha, usar -1
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
                //nome do exame a ser feito
                exame:"Verificar pupilas",
                //Tipo (acima tem os tipos)
                tipo:0,
                //resultado ao fazer
                resultado:"Não há anomalia",
                //como impacto na precisao é igual a 0, nao precisa ter erro
                //afinal, se vc não usou ele, não é um erro pq nn era neessario
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
                //Eu repeti os ids do nó, acontece mas nn deveria
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
                resultado:"Ausculta realizada",
                
                precisao:4,
                no:3,
                no_pai:-1,
                checado: false,
            },
            1:{
                exame:"Realizar raio-X do tórax",
                erro:"Um raio-X do torax denunciaria pericardite, dando mais precisão ao diagnostico.",
                tipo:2,
                //Resultado aqui seria onde está o objeto que sera exibido, ele usuario isso como base pra exibir o modelo.
                //Porem, o valor tem que ser constante, então vale rever isso
                resultado:"./res/raioxtorax.jpg",
                
                precisao:2,
                no:3,
                no_pai:-1,
                checado: false,
            },
            2:{
                exame:"Exame de imagem cardíaco",
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
                resultado:"",
                
                precisao:0,
                no:3,
                no_pai:-1,
                checado: false,
            },
            1:{
                exame:"Realizar exame de urina",
                tipo:5,
                resultado:"./res/exameurina.png",
                precisao:6,
                no:3,
                no_pai:-1,
                checado: false,
            },
            2:{
                exame:"Relizar exame de sangue",
                tipo:4,
                resultado:"",
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