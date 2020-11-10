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
            console.log('current')
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
                console.log(json[question])
                $('#wrapper-questions').hide()
                $('#wrapper-questions').append(`
                    <div class="card-question">
                        <p>${json[question]['question']}</p>
                    </div>
                    <div class="my-5">
                        <button data-points="0" class="btn-circle error" id="btn-error"><i class="fas fa-times"></i></button>
                        <button data-points="${json[question]['value']}" class="btn-circle correct" id="btn-correct"><i class="fas fa-check"></i></button>
                        <button data-points="${(json[question]['value'])/2}" class="btn-circle half" id="btn-half"><i class="fas fa-star-half-alt"></i></button>
                    </div>
                    <div class="">
                        <button class="btn-next-question" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                        <button class="btn-next-question" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
                    </div>
                `)
                addEventButtonNextTeam()
                currentQuestion += 1;
                addEventButtonNextQuestion()
                addEventButtons()
            }
        }
    }
})

function addEventButtonNextQuestion() {
    console.log(currentQuestion)
    $('#btn-next-question').click(() => {
        $.getJSON(questions, (json) => {
            $('#wrapper-questions').html('')
            for (const question in json) {
                if(json.hasOwnProperty(question)) {
                    if(question === currentQuestion.toString()) {
                        $('#wrapper-questions').hide()
                        $('#wrapper-questions').append(`
                            <div class="card-question">
                                <p>${json[question]['question']}</p>
                            </div>
                            <div class="my-5">
                                <button data-points="0" class="btn-circle error" id="btn-error"><i class="fas fa-times"></i></button>
                                <button data-points="${json[question]['value']}" class="btn-circle correct" id="btn-correct"><i class="fas fa-check"></i></button>
                                <button data-points="${(json[question]['value'])/2}" class="btn-circle half" id="btn-half"><i class="fas fa-star-half-alt"></i></button>
                            </div>
                            <div class="">
                                <button class="btn-next-question" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                                <button class="btn-next-question" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
                            </div>
                        `)
                        addEventButtonNextTeam()
                        currentQuestion ++;
                        addEventButtonNextQuestion()
                        addEventButtons()
                        break;
                    }else if(currentQuestion === 13) {
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
        })
    })
}

function addEventButtons () {
    $('#btn-error').click((event) => {
        teams[currentTeam].points += 0;
        printTeams()
    }) 
    $('#btn-correct').click((event) => {
        const points = parseInt(event.target.dataset.points)
        console.log(points)
        teams[currentTeam].points += points;
        printTeams()
    }) 
    $('#btn-half').click((event) => {
        const points = parseInt(event.target.dataset.points)
        console.log(points)
        teams[currentTeam].points += points;
        printTeams()
    }) 
}



