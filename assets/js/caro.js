var quantity = 16;
var count = 0;
var turn = 0;

//Bắt đầu
function playGame() {
    document.write(createChessboard(quantity));
}

//Tạo bàn cờ
function createChessboard(quantity) {
    let table = "<table border='1' cellspacing='0' cellpadding='1' style='margin: 0 auto;'>";
    for (let row = 0; row < quantity; row++) {
        table += "<tr>";
        for (let col = 0; col < quantity; col++) {
            table += "<td id ='td(" + row + "," + col + ")' style ='width: 35px; height: 35px;font-size: 25px; text-align: center;' onclick='doAction(" + row + "," + col + ")'></td>";
        }
        table += "</tr>";
    }
    return table;
}

//Đánh X - O
function doAction(row, col) {
    let check = [0, 0];
    let play = document.getElementById("td(" + row + "," + col + ")");
    if (play.innerText == '') {
        if (count % 2 == 0) {
            play.innerText = "X";
            play.style.color = "red";
            if (turn >= 4) {
                check = checkGame(fetchArray(row, col), "X");
            }
        } else {
            play.innerText = "O";
            play.style.color = "blue";
            turn++;
            if (turn >= 4) {
                check = checkGame(fetchArray(row, col), "O");
            }
        }
        if (check[0] == 1) {
            alert("Đội " + check[1] + " thắng");
        } else {
            count++;
        }
    }
}

//Mảng lưu giá trị
function fetchArray(a, b) {
    let array = [];
    for (let i = 0; i < 4; i++) {
        array.push([]);
    }
    for (let i = -4; i <= 4; i++) {
        if (b + i >= 0) {
            array[0].push(document.getElementById("td(" + a + "," + (b + i) + ")").innerHTML); //Hàng ngang
            if (a + i >= 0 && a + i < quantity * quantity) {
                array[2].push(document.getElementById("td(" + (a + i) + "," + (b + i) + ")").innerHTML);//Đường chéo
            }
            if (a - i >= 0 && a - i < quantity * quantity) {
                array[3].push(document.getElementById("td(" + (a - i) + "," + (b + i) + ")").innerHTML);//Đường chéo
            }
        }
        if (a + i >= 0 && a + i < quantity * quantity) {
            array[1].push(document.getElementById("td(" + (a + i) + "," + b + ")").innerHTML);//Hàng dọc
        }
    }
    return array;
    console.log(array);
}

//Kiểm tra điều kiện thắng
function checkGame(array, element) {
    let check = [0, element];
    for (let i = 0; i < 4; i++) {
        let count = 0;
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] == element) {
                count++;
            }
            if (array[i][j] != element && count > 0) {
                break;
            }
        }
        if (count >= 5) {
            check[0] = 1;
        }
    }
    return check;
}

//Âm nhạc
function music() {
    document.addEventListener('click', musicPlay);
    function musicPlay() {
        document.getElementById("music").play();
        document.removeEventListener('click', musicPlay);
    }
}