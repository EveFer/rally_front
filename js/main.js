const questions = '/data/questions.json';

let currentTeam = 0;
let currentQuestion = 1
const teams = [
    {
        members: ['Paco','Aldahir', 'Vryhan', 'Erick', 'Gus' ],
        points:0,
        current: true
    },
    {
        members: ['Hector', 'Hugo', 'Cris'],
        points:0,
        current: false
    },
    {
        members: ['Jess', 'Robert', 'Rubs'],
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

function getMembersFormat(members,points, current) {
    const membersElements = members.reduce((accum, member, index) => accum+=`<i class="fas fa-star"></i> ${member} `, '')

    if(current) {
        return `
        <div class="team current">
            <span class="border"></span>
            <span class="border"></span>
            <span class="border"></span>
            <span class="border"></span>
            <div>
                <div class="team-members">
                    ${membersElements}
                </div>
                <div>
                    Points Total: <span class="points">${points}</span>
                </div>
            </div>
        </div>
        `
    }
    return `
    <div class="team">
        <div class="team-members">
            ${membersElements}
        </div>
        <div>
            Points Total: <span class="points">${points}</span>
        </div>
    </div>
    `
}

function printTeams() {
    $('#wrapper-teams').html('')
    teams.forEach((item, index) => {
        if(index === 0 || index === 1) {
            if(item.current) {
                $('#wrapper-teams').append(getMembersFormat(item.members, item.points, true))
            }else {
                $('#wrapper-teams').append(getMembersFormat(item.members, item.points, false))
            }
        }else if(item.current) {
            $('#wrapper-teams').append(getMembersFormat(item.members, item.points, true))
        }else {
            $('#wrapper-teams').append(getMembersFormat(item.members, item.points, false))
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
                        </ol><br/>
                        <P class="text-center">Points: <span class="text-points">${json[question]['value']}</span></P>
                    </div>
                    <div class="my-5">
                        <button class="btn-circle error" id="btn-error" data-points-error='100'><i class="fas fa-times"></i></button>
                        <button class="btn-circle correct" id="btn-correct" data-points-correct='${value}'><i class="fas fa-check"></i></button>
                        <button class="btn-circle half" id="btn-half" data-points-half='${(value)/2}'><i class="fas fa-star-half-alt"></i></button>
                    </div>
                    <div class="d-flex">
                        <button class="btn-next-question mr-1" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                        <button class="btn-next-question ml-1" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
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
                        // console.log(value)
                        $('#wrapper-questions').hide()
                        $('#wrapper-questions').fadeOut(1000)
                        $('#wrapper-questions').append(`
                            <div class="card-question">
                                <ol start="${currentQuestion}">
                                    <li>
                                    ${json[question]['question']}
                                    </li>
                                </ol> <br/>
                                <P class="text-center">Points: <span class="text-points">${json[question]['value']}</span></P>
                            </div>
                            <div class="my-5">
                                <button class="btn-circle error" id="btn-error" data-points-error='100'><i class="fas fa-times"></i></button>
                                <button class="btn-circle correct" id="btn-correct" data-points-correct='${value}'><i class="fas fa-check"></i></button>
                                <button class="btn-circle half" id="btn-half" data-points-half='${(value)/2}'><i class="fas fa-star-half-alt"></i></button>
                            </div>
                            <div class="d-flex">
                                <button class="btn-next-question mr-1" id="btn-next-team"><i class="far fa-hand-point-right"></i> Next Team</button>
                                <button class="btn-next-question ml-1" id="btn-next-question"><i class="fas fa-arrow-right"></i> Next question</button>
                            </div>
                        `)
                        // addEventButtonNextTeam()
                        currentQuestion ++;
                        // addEventButtonNextQuestion()
                        // addEventButtons()
                        break;
                    }else if(currentQuestion > 7) {
                        const pointsTotal = teams.reduce((accum, team) => accum += team.points, 0)
                        console.log('Ultima pregunta')
                        $('#wrapper-questions').html('')
                        $('#wrapper-questions').append(`
                            <div class="card-question text-center">
                                <p> FIN </p>
                                <p class="points-tota">Mucho éxito Amigos!!!</p>
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





