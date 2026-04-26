$(document).ready(function () {
    console.log("сторінка завантажилась");
    //fex.net ключ: ldebcxp тут мої картинки для ребуса
    let answer = [
        "робокод",
        "кіно",
        "ребус",
        "комп'ютер",
        "цукерка",
        "зошит",
        "помідор",
        "огірок",
        "флешка",
        "лікар",
        "осінь",
        "школа",
        "мишка",
        "ластівка",
        "скарби",
    ]

    let was = []
    let proggress = 0
    let num = Math.floor(Math.random() * answer.length) + 1
    console.log(answer[num - 1]);


    $('.description-header').click(() => {
        $('.description-content').slideToggle()
    })

    $(".progress").knob({
        'min': 0,
        'max': 5,
        'angleOffset': -75,
        'angleArc': 150,
        'readOnly': true,
        'lineCap': 'round',
        'displayInput': false,
        'thickness': 0.2,
        'bgColor': '#f5f6c2',
        'fgColor': '#80e887'
    })

    startRebus(num) 

    $('#btnTask1').click(() => {
        if ($("#inputTask1").val().toLowerCase() == `${answer[num - 1]}`) {
            alertify.success("Відповідь правильна!")
            $("#inputTask1").val("")
            proggress++
            $(".progress").val(proggress).trigger('change')
            was.push(num)
            console.log(was);
            
            if(proggress < 5){
                do {
                    num = Math.floor(Math.random() * answer.length) + 1
                } while(was.includes(num))
                console.log(num)
                startRebus(num)
            } else {
                $(".rebus-img, #btnTask1, #inputTask1").css({'display': 'none'})
                $("#nextTask").css({'display': 'flex'})
            }
        } else {
            alertify.error("Відповідь неправильна!");
        }
    })

    function startRebus(arg) {
        $('#picture').attr("src", `img/rebus(${arg}).png`)
    }
});