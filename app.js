let dt, b, score = 0, BestScore = 0;
let selectedSigns = []; // Массив выбранных знаков

// Функция для открытия и закрытия модального окна с информацией о версии
function toggleVersionInfo() {
    var versionInfo = document.getElementById("versionInfo");
    // Переключаем видимость модального окна
    versionInfo.style.display = versionInfo.style.display === "block" ? "none" : "block";
}

// Функция для открытия и закрытия дополнительной информации о версиях
function toggleNestedInfo() {
    var nestedInfo = document.getElementById("nestedInfo");
    nestedInfo.style.display = nestedInfo.style.display === "block" ? "none" : "block";
}

// Закрытие модального окна при клике на "×"
document.querySelectorAll('.close').forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById("versionInfo").style.display = "none";
        document.getElementById("nestedInfo").style.display = "none";
    });
});

// Функция для добавления/удаления знаков
function toggleSign(sign) {
    const index = selectedSigns.indexOf(sign);
    if (index === -1) {
        selectedSigns.push(sign); // Добавляем знак в массив
    } else {
        selectedSigns.splice(index, 1); // Убираем знак из массива
    }
    console.log("Выбранные знаки: " + selectedSigns.join(", ")); // Логирование для отладки
}

function StartTimer(t) {
    dt = t;
    b = t;
    document.getElementById("score").innerHTML = '<span>score: 0 </span>';
    document.getElementById("Bscore").innerHTML = '<span>Best score: ' + BestScore + ' </span>';
    document.getElementById("bot1").disabled = true;
    let timerId = setTimeout(function timer() {
        document.getElementById("dp").innerHTML = "<span>Осталось времени- " + Math.trunc(dt) + " секунд  <progress max = 100 value= 0 id= bar></progress> </span>"
        document.getElementById('bar').value = dt - 1
        document.getElementById('bar').max = t - 1
        dt -= 0.01
        if (dt <= 1) {
            clearTimeout(timerId)
            console.log("время вышло!!!!!!!")
            BestScore = Math.max(BestScore, score);
            score = 0
            document.getElementById("dp").innerHTML = '<span>время вышло!</span>'
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
    let x, y, rez, zadanie;
    const difficulty = document.getElementById('difficulty').value;  // Получаем выбранную сложность

    // Генерация чисел в зависимости от сложности
    if (difficulty === '1') {
        x = Math.round(Math.random() * 9 + 1);  // Однозначные числа от 1 до 9
        y = Math.round(Math.random() * 9 + 1);  // Однозначные числа от 1 до 9
    } else if (difficulty === '2') {
        x = Math.round(Math.random() * 90 + 10);  // Двузначные числа от 10 до 99
        y = Math.round(Math.random() * 90 + 10);  // Двузначные числа от 10 до 99
    } else {
        x = Math.round(Math.random() * 900 + 100);  // Трехзначные числа от 100 до 999
        y = Math.round(Math.random() * 900 + 100);  // Трехзначные числа от 100 до 999
    }

    // Выбираем случайный знак из массива выбранных знаков
    if (selectedSigns.length === 0) {
        alert("Пожалуйста, выберите хотя бы один знак!");
        return;
    }
    const sign = selectedSigns[Math.floor(Math.random() * selectedSigns.length)];

    // Логика задания в зависимости от выбранного знака
    if (sign === '+') {
        rez = x + y;
        zadanie = x + ' + ' + y;
    } else if (sign === '-') {
        rez = x - y;
        zadanie = x + ' - ' + y;
    } else if (sign === '*') {
        rez = x * y;
        zadanie = x + ' * ' + y;
    } else if (sign === '/') {
        // Убедимся, что y не равно нулю для деления
        while (y === 0) y = Math.round(Math.random() * 10 + 1); // избегаем деления на 0
        rez = x / y;  // Используем результат деления
        zadanie = x + ' / ' + y;
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
