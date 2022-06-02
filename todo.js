update();
let text = document.getElementById("text");
let addBtn = document.getElementById("addBtn");

text.addEventListener('keyup', (e) => {
    // if ENTER key pressed
    if (e.key === 'Enter') {
        let text = document.getElementById("text");
        let textVal = text.value;
        if (textVal.trim() != 0) {
          if (localStorage.getItem("pendingTodo") == null) {
            var array = [];
            array.push(textVal);
            localStorage.setItem("pendingTodo", JSON.stringify(array));
          } else {
            var arrStr = localStorage.getItem("pendingTodo");
            array = JSON.parse(arrStr);
            if (array.indexOf(textVal) === -1) {
              array.push(textVal);
            }
            localStorage.setItem("pendingTodo", JSON.stringify(array));
          }
          update();
        }
      
        text.value = "";
    }
  });

addBtn.addEventListener("click", function () {
  let text = document.getElementById("text");
  let textVal = text.value;
  if (textVal.trim() != 0) {
    if (localStorage.getItem("pendingTodo") == null) {
      var array = [];
      array.push(textVal);
      localStorage.setItem("pendingTodo", JSON.stringify(array));
    } else {
      var arrStr = localStorage.getItem("pendingTodo");
      array = JSON.parse(arrStr);
      if (array.indexOf(textVal) === -1) {
        array.push(textVal);
      }
      localStorage.setItem("pendingTodo", JSON.stringify(array));
    }
    update();
  }

  text.value = "";
});

//update the list
function update() {
  if (localStorage.getItem("pendingTodo") == null) {
    array = [];
    localStorage.setItem("pendingTodo", JSON.stringify(array));
  } else {
    arrStr = localStorage.getItem("pendingTodo");
    array = JSON.parse(arrStr);
    let html = "";
    array.forEach((item, index) => {
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
      html +=
        `
      <span><input type="checkbox" name="checkbox" id="pendingItemNo_` +
        index +
        `" class="pendingItems" onchange="moveToDone(event)" value = ${item}>${item}</span><br>
      `;
    });

    document.getElementById("pending").innerHTML = html;
  }

  if (localStorage.getItem("doneTodo") == null) {
    array = [];
    localStorage.setItem("doneTodo", JSON.stringify(array));
  } else {
    arrStr = localStorage.getItem("doneTodo");
    array = JSON.parse(arrStr);
    let html = "";
    array.forEach((item, indexNum) => {
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
      html +=
        `
      <span><input type="checkbox" onchange="moveToPending(event)" checked name="checkbox" id="doneItemNo_` +
      indexNum +
        `" class="doneItems" value = ${item}>${item}</span><button class="crossbtn" onclick="removeTodo(${indexNum})">x</button><br>
      `;
    });

    document.getElementById("done").innerHTML = html;
  }
}

function moveToDone(event){
    console.log(event);
    var val = event.target.value;
    var pending = localStorage.getItem("pendingTodo");
    pending = JSON.parse(pending);
    var done = localStorage.getItem("doneTodo");
    done = JSON.parse(done);
    done.push(val);
    pending.splice(pending.indexOf(val),1);
    localStorage.setItem("pendingTodo", JSON.stringify(pending));
    localStorage.setItem("doneTodo", JSON.stringify(done));
    update();
}

function moveToPending(event){
    console.log(event);
    var val = event.target.value;
    var pending = localStorage.getItem("pendingTodo");
    pending = JSON.parse(pending);
    var done = localStorage.getItem("doneTodo");
    done = JSON.parse(done);
    pending.push(val);
    done.splice(done.indexOf(val),1);
    localStorage.setItem("pendingTodo", JSON.stringify(pending));
    localStorage.setItem("doneTodo", JSON.stringify(done));
    update();
}

function removeTodo(indexNum) {
  arrStr = localStorage.getItem("doneTodo");
  newArr = JSON.parse(arrStr);
  newArr.splice(indexNum,1);
  localStorage.setItem("doneTodo", JSON.stringify(newArr));
  update();
}