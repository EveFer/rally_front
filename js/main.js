const questions = '/data/questions.json';

let currentTeam = 0;
let currentQuestion = 1
const teams = [
    {
        members: ['Cristobal', 'JP', 'Arnold', 'Toño'],
        points:0,
        current: true
    },
    {
        members: ['Itzi', 'L. Dani', 'Emilio'],
        points:0,
        current: false
    },
    {
        members: ['Cin', 'Arce', 'JC'],
        points:0,
        current: false
    },
    {
        members: ['Emma', 'Chris', 'Abraham'],
        points:0,
        current: false
    },
    {
        members: ['Elda', 'Pete', 'Shari'],
        points:0,
        current: false
    },
    {
        members: ['Airy', 'Eric', 'Rod'],
        points:0,
        current: false
    }
]

function addEventButtonNextTeam() {
    $('#btn-next-team').click(() => {
        if(currentTeam !== teams.length - 1) {
            teams[currentTeam].current = false
            currentTeam ++;
            teams[currentTeam].current = true
            printTeams()
            return
        }
        teams[currentTeam].current = false
        currentTeam = 0;
        teams[currentTeam].current = true
        currentTeam = 0;
        printTeams()
    })
}

function addEventButtonError() {
    $('#btn-error').on('click', function() {
        console.log($(this).data('pointsError'))
        teams[currentTeam].points += $(this).data('pointsError')
        $("#btn-next-team").trigger("click")
        $("#btn-next-question").trigger("click")
    }) 
}

function addEventButtonCorrect() {
    $('#btn-correct').click(function() {
        console.log($(this).data('pointsCorrect'))
        teams[currentTeam].points += $(this).data('pointsCorrect')
        $("#btn-next-team").trigger("click")
        $("#btn-next-question").trigger("click")
    }) 
}
function addEventButtonHalf() {
    $('#btn-half').click(function() {
        console.log($(this).data('pointsHalf'))
        teams[currentTeam].points += parseInt($(this).data('pointsHalf'))
        $("#btn-next-team").trigger("click")
        $("#btn-next-question").trigger("click")
    }) 
}

function printTeams() {
    $('#wrapper-teams').html('')
    teams.forEach((item, index) => {
        
        if(index === 0 ) {
            if(item.current) {
                $('#wrapper-teams').append(`
                    <div class="team current">
                        <div class="team-members"><i class="fas fa-star"></i> ${item.members[0]} <i class="fas fa-star"></i> ${item.members[1]}  <i class="fas fa-star"></i> ${item.members[2]}  <i class="fas fa-star"></i> ${item.members[3]}</div>
                        <div>
                            Points Total: <span class="points">${item.points}</span>
                        </div>
                    </div>
                `)
            }else {
                $('#wrapper-teams').append(`
                    <div class="team">
                        <div class="team-members"><i class="fas fa-star"></i> ${item.members[0]} <i class="fas fa-star"></i> ${item.members[1]}  <i class="fas fa-star"></i> ${item.members[2]}  <i class="fas fa-star"></i> ${item.members[3]}</div>
                        <div>
                            Points Total: <span class="points">${item.points}</span>
                        </div>
                    </div>
                `)
            }
        }else if(item.current === true) {
            $('#wrapper-teams').append(`
                <div class="team current">
                    <div class="team-members"><i class="fas fa-star"></i> ${item.members[0]} <i class="fas fa-star"></i> ${item.members[1]}  <i class="fas fa-star"></i> ${item.members[2]}</div>
                    <div>
                        Points Total: <span class="points">${item.points}</span>
                    </div>
                </div>
            `)
        }else {
            $('#wrapper-teams').append(`
            <div class="team " >
                <div class="team-members"><i class="fas fa-star"></i> ${item.members[0]} <i class="fas fa-star"></i> ${item.members[1]}  <i class="fas fa-star"></i> ${item.members[2]}</div>
                <div>
                    Points Total: <span class="points">${item.points}</span>
                </div>
            </div>
        `)
        }
    })
}

printTeams()

$.getJSON(questions,  (json) => {
    for (const question in json) {
        if(json.hasOwnProperty(question)) {
            if(question === '1') {
                // console.log(json[question])
                const value = json[question]['value']
                console.log(value)
                $('#wrapper-questions').hide()
                $('#wrapper-questions').fadeOut(1000)
                $('#wrapper-questions').append(`
                    <div class="card-question">
                        <ol start="${currentQuestion}">
                            <li>
                                ${json[question]['question']}
                            </li>
                        </ol>
                    </div>
                    <div class="my-5">
                        <button class="btn-circle error" id="btn-error" data-points-error='0'><i class="fas fa-times"></i></button>
                        <button class="btn-circle correct" id="btn-correct" data-points-correct='${value}'><i class="fas fa-check"></i></button>
                        <button class="btn-circle half" id="btn-half" data-points-half='${(value)/2}'><i class="fas fa-star-half-alt"></i></button>
                    </div>
                    <div class="">
                        <button class="btn-next-question" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                        <button class="btn-next-question" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
                    </div>
                `)
                // addEventButtonNextTeam()
                currentQuestion += 1;
                // addEventButtonNextQuestion()
                // addEventButtons()
            }
        }
    }
    addEventButtonNextTeam()
    addEventButtonNextQuestion()
    addEventButtonError()
    addEventButtonCorrect()
    addEventButtonHalf()
})

function addEventButtonNextQuestion() {
    console.log(currentQuestion)
    $('#btn-next-question').click(() => {
        $.getJSON(questions, (json) => {
            $('#wrapper-questions').html('')
            for (const question in json) {
                if(json.hasOwnProperty(question)) {
                    if(question === currentQuestion.toString()) {
                        const value = json[question]['value']
                        console.log(value)
                        $('#wrapper-questions').hide()
                        $('#wrapper-questions').fadeOut(1000)
                        $('#wrapper-questions').append(`
                            <div class="card-question">
                                <ol start="${currentQuestion}">
                                    <li>
                                    ${json[question]['question']}
                                    </li>
                                </ol>
                            </div>
                            <div class="my-5">
                                <button class="btn-circle error" id="btn-error" data-points-error='0'><i class="fas fa-times"></i></button>
                                <button class="btn-circle correct" id="btn-correct" data-points-correct='${value}'><i class="fas fa-check"></i></button>
                                <button class="btn-circle half" id="btn-half" data-points-half='${(value)/2}'><i class="fas fa-star-half-alt"></i></button>
                            </div>
                            <div class="">
                                <button class="btn-next-question" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                                <button class="btn-next-question" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
                            </div>
                        `)
                        // addEventButtonNextTeam()
                        currentQuestion ++;
                        // addEventButtonNextQuestion()
                        // addEventButtons()
                        break;
                    }else if(currentQuestion === 14) {
                        console.log('Ultima pregunta')
                        $('#wrapper-questions').html('')
                        $('#wrapper-questions').append(`
                            <div class="card-question text-center">
                                <p>Final de las Preguntas</p>
                                <p>=n_n=</p>
                            </div>
                        `)
                    }
                }
            }
            addEventButtonNextTeam()
            addEventButtonNextQuestion()
            addEventButtonError()
            addEventButtonCorrect()
            addEventButtonHalf()
        })
        
    })
}





