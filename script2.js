$(document).ready(function () {
    console.log("сторінка завантажилась")
    
    let progress = 0
    let timeStorage = localStorage
    let time
    let firstCard = null
    let secondCard = null

    if(timeStorage.getItem("time")) {
        time = parseInt(timeStorage.getItem("time"))
    }
    else {
        time = 300
        timeStorage.setItem("time", time)
    }

    let cards = [
        {
            name : "php",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
            id: 1
        },
        {
            name : "css3",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
            id: 2
        },
        {
            name : "html5",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
            id: 3
        },
        {
            name : "jquery",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
            id: 4
        },
        {
            name : "javascript",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
            id: 5
        },
        {
            name : "node",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
            id: 6
        },
        {
            name : "photoshop",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
            id: 7
        },
        {
            name : "python",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
            id: 8
        },
        {
            name : "rails",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
            id: 9
        },
        {
            name : "sass",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
            id: 10
        },
        {
            name : "sublime",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
            id: 11
        },
        {
            name : "wordpress",
            img : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
            id: 12
        },
    ]
    
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

     $("#start").click(()=>{
        $("#start").css('display', 'none')
        $("#gameBoard").css('display', 'grid')
        fillBoard()
        $(".card").on('click', cardClicked)
        startTime()
     })

     function fillBoard() {
        let board = shuffle([...cards, ...cards])
        for (let i = 0; i < board.length; i++){
            let cardHTML = 
            `
            <div class="card" data-id="${board[i].id}">
                <div class="front">ROBOCODE</div>
                <div class="back">
                    <img src="${board[i].img}" alt="${board[i].name}">
                </div>
            </div>
            `
            $("#gameBoard").append(cardHTML)
        }
     }
     function startTime() {
        time = 300
        localStorage.setItem("time", time)
        setInterval(()=>{
            time = parseInt(localStorage.getItem("time")) - 1
            $('.time').val(time).trigger('change')
            
            if(time <= 0) {
                alertify.error("Час закінчився!")
                setTimeout(()=> window.open("task2.html", "_self", false), 2000)
            }
            else {
                localStorage.setItem("time", time)
            }
            console.log(time);
            
        }, 1000)
     }

     function shuffle(array) {
        let counter = array.length
        let temp
        let index

        while(counter > 0){
            index = Math.floor(Math.random() * counter)
            counter--

            temp = array[counter]
            array[counter] = array[index]
            array[index] = temp
        }
        return array
     }

     function cardClicked(event) {

        if(secondCard || $(this).hasClass('matched')){
            return
        }

        if(!firstCard){
            firstCard = $(this)
            firstCard.addClass('flip')
            return
        }
        
        if(firstCard[0] === $(this)[0]) {
            return
        }

        if(firstCard) {
            secondCard = $(this)
            secondCard.addClass('flip')

            if(firstCard.attr('data-id') == secondCard.attr('data-id')){
                firstCard.hasClass('matched')
                secondCard.hasClass('matched')
                
                firstCard = null
                secondCard = null
                
                progress++
                $('.progress').val(progress).trigger('change')
                if(progress == 12) {
                    win()
                }
                return
            }
            else {
                setTimeout(()=>{
                    firstCard.removeClass('flip')
                    secondCard.removeClass('flip')
                    firstCard = null
                    secondCard = null  
                }, 500)
            }
        }
     }
     function win() {}

});