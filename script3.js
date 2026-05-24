$(document).ready(function () {
    console.log("сторінка завантажилась")
    
    let progress = 0
    let timeStorage = localStorage
    let time

    const size = 4
    let board = []
    let moves = 0

    function initGame() {
        board = [
            1,  2,  3,  4,
            5,  6,  7,  8,
            9,  10, 11, 12,
            13, 14, 15, 0
        ]
        moves = 0
        $("#moves").text(moves)

        shuffleBoard()
        renderBoard()
    }
    function shuffleBoard () {}
    function renderBoard () {}
    initGame()

    if(timeStorage.getItem("time")) {
        time = parseInt(timeStorage.getItem("time"))
    }
    else {
        time = 300
        timeStorage.setItem("time", time)
    }
    
    $('.description-content').slideToggle()

    $('.description-header').click(() => {
        $('.description-content').slideToggle()
    })

    $(".progress").knob({
        'min': 0,
        'max': 12,
        'angleOffset': -75,
        'angleArc': 150,
        'readOnly': true,
        'lineCap': 'round',
        'displayInput': false,
        'thickness': 0.2,
        'bgColor': '#f5f6c2',
        'fgColor': '#80e887'
    })

    $(".time").knob({
        'min': 0,
        'max': 300,
        'angleOffset': 0,
        'angleArc': 360,
        'readOnly': true,
        'lineCap': 'butt',
        'width': '100%',
        'displayInput': false,
        'thickness': 0.2,
        'bgColor': '#f5f6c2',
        'fgColor': '#80e887'
    })
});