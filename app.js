 //САЙТ http://taburetca.beget.tech/
let dt, b, score = 0, BestScore = 0;

 // Функция для отображения основного окна с информацией о версиях
 function toggleVersionInfo() {
     var versionInfo = document.getElementById("versionInfo");
     if (versionInfo.style.display === "block") {
         versionInfo.style.display = "none";
     } else {
         versionInfo.style.display = "block";
     }
 }

 // Функция для отображения вложенного окна с дополнительной информацией
 function toggleNestedInfo() {
     var nestedInfo = document.getElementById("nestedInfo");
     if (nestedInfo.style.display === "block") {
         nestedInfo.style.display = "none";
     } else {
         nestedInfo.style.display = "block";
     }
 }


function StartTimer(t) {
    dt = t
    b = t
    document.getElementById("score").innerHTML='<span>score: 0 </span>';
    document.getElementById("Bscore").innerHTML='<span>Best score: '+BestScore+' </span>';
    document.getElementById("bot1").disabled = true;
    let timerId = setTimeout(function timer() {
        document.getElementById("dp").innerHTML="<span>Осталось времени- "+Math.trunc(dt)+" секунд  <progress max = 100 value= 0 id= bar></progress> </span>"
        document.getElementById('bar').value = dt-1
        document.getElementById('bar').max = t-1
        dt -= 0.01
        if (dt <= 1 ) {
            clearTimeout(timerId)
            console.log("время вышло!!!!!!!")
            BestScore = Math.max(BestScore, score);
            score = 0
            document.getElementById("dp").innerHTML='<span>время вышло!</span>'
            document.getElementById("bot1").disabled = false;
        } else {
         timerId = setTimeout(timer, 10)
        }
    }, 10)
}

function dobav(dtime) {
    dtime = parseFloat(dtime);
    dt += dtime;

}
 function task() {
     let x, y, rez, zn, zadanie;
     const difficulty = document.getElementById('difficulty').value;  // Получаем выбранную сложность

     // Генерация чисел в зависимости от сложности
     if (difficulty === '1') {
         x = Math.round(Math.random() * 9 + 1);  // Однозначные числа от 1 до 9
         y = Math.round(Math.random() * 9 + 1);  // Однозначные числа от 1 до 9
     } else if (difficulty === '2') {
         x = Math.round(Math.random() * 90 + 10);  // Двузначные числа от 10 до 99
         y = Math.round(Math.random() * 90 + 10);  // Двузначные числа от 10 до 99
     } else {
         x = Math.round(Math.random() * 900 + 100);  // Двузначные числа от 100 до 999
         y = Math.round(Math.random() * 900 + 100);  // Двузначные числа от 100 до 999
     }

     zn = Math.round(Math.random() * 100 + 1) % 4;

     if (zn === 0) {
         rez = x + y;
         zadanie = (x + '+' + y);
     } else if (zn === 1) {
         rez = x - y;
         zadanie = x + '-' + y;
     } else if (zn === 2) {
         rez = x * y;
         zadanie = x + '*' + y;
     } else if (zn === 3) {
         x = Math.round(Math.random() * 10 + 1);  // Это специально для деления
         rez = x;
         zadanie = x * y + '/' + y;
     }

     // Вставляем задание на страницу
     document.getElementById("Task").innerHTML = '<span>задание: ' + zadanie + ' = <input type="text" id="inp_4"> </span>';
     document.getElementById("inp_4").focus();

     // Обработчик для ввода ответа
     document.getElementById("inp_4").addEventListener("keyup", function(event) {
         if (event.key === "Enter") {
             let k = parseFloat(document.getElementById('inp_4').value);
             if (k === rez) {
                 dobav(5);
                 score++;
                 document.getElementById("score").innerHTML = '<span>score: ' + score + ' </span>';
             }
             task();
         }
     });
 }

