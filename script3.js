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
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 0
        ]
        moves = 0
        $("#moves").text(moves)

        shuffleBoard(board)
        renderBoard()
    }
    
    function shuffleBoard(array) {
        let shuffleDeep = 200
        let moveIdx
        for(let i = 0; i < shuffleDeep; i++){
            let emptyIdx = array.indexOf(0)
            let neighbors = getNeighbors(emptyIdx)
            moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)]
            [array[emptyIdx], array[moveIdx]] = 
            [array[moveIdx], array[emptyIdx]]
        }
    }
    function getNeighbors(idx){
        let neighbors = []
        let row = Math.floor(idx / 4)
        let col = idx % 4

        if(row > 0) { neighbors.push(idx - 4) } //вгору
        if(row < 3) { neighbors.push(idx + 4) } //вниз
        if(col > 0) { neighbors.push(idx - 1) } //вліво
        if(col < 3) { neighbors.push(idx + 1) } //вправо

        return neighbors
    }

    function renderBoard() {
        $("#gameBoard").empty()
        board.forEach((num, idx)=>{
            let tileDiv = $('<div><div/>').addClass('tile')
            if(num === 0){
                tileDiv.addClass('empty').text('')
            } else {
                tileDiv.text(num).click(()=> moveTile(idx))
            }
            $("#gameBoard").append(tileDiv)
        })
    }

    function moveTile(idx) {
        let emptyIdx = board.indexOf(0);
        let neighbors = getNeighbors(emptyIdx);

        if (neighbors.includes(idx)) {
            [board[emptyIdx], board[idx]] = [board[idx], board[emptyIdx]];
            renderBoard();
        }
    }

    function startTime() {
        time = 300
        localStorage.setItem("time", time)
        setInterval(() => {
            time = parseInt(localStorage.getItem("time")) - 1
            $('.time').val(time).trigger('change')

            if (time <= 0) {
                alertify.error("Час закінчився!")
                setTimeout(() => window.open("task3.html", "_self", false), 2000)
            }
            else {
                localStorage.setItem("time", time)
            }
            console.log(time);

        }, 1000)
    }


    $("#start").click(function() {
        $(this).hide()
        $("#gameBoard").css('display', 'grid')
        initGame()
        startTime()
    })

    if (timeStorage.getItem("time")) {
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