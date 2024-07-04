alert(
  "All 탭이 아닌 다른 탭에서 check, trash 버튼 누르면 UI변경하는 부분을 아직 해결 못했습니다ㅜㅜ"
);

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let underLine = document.querySelector("#under-line"); //underline

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    //#under-line의 두께만큼 빼줘야 함
    underLine.style.top = event.target.offsetHeight - 4 + "px";
    filter(event);
    console.log(event);
  });
}

// + 버튼 클릭시 input content 비우기
addButton.addEventListener("click", function () {
  taskInput.value = "";
});

function addTask() {
  if (taskInput.value == "") {
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let list = [];
  // 1. 내가 선택한 탭에 따라서
  // 2. 리스트를 달리 보여준다
  // all => taskList
  // ongoing,done => filterList
  if (mode === "all") {
    //all taskList
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    // ongoing, done filterList
    list = filterList;
  }

  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHtml += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="xi-refresh"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="xi-trash"></i></button>
        </div>
        </div>`;
    } else {
      resultHtml += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
      <button onclick="toggleComplete('${list[i].id}')"><i class="xi-check"></i></button>
      <button onclick="deleteTask('${list[i].id}')"><i class="xi-trash"></i></button>
      </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  console.log(mode);
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    //진행중인 리스트를 보여준다.
    //task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// 자바스크립트 키보드 이벤트는 총 3가지
// keydown - 키가 눌렸을 때 (값 keycode)
// keypress - 키가 눌린 상태일 때 (연속적으로 실행됨) (값 ASCII)
// keypress 이벤트는 ASCII 표에 없는 shift, Fn, CapsLock 키는 인식 못함
// keyup - 키 누름이 해제될 때 (값 keycode)

taskInput.addEventListener("keyup", function (enterKeyCode) {
  let enterKey = enterKeyCode.code;
  // console.log(enterKey) -> 누른 키보드의 string 타입의 값
  // 여기서 event 는 엔터키의 키보드 번호!! enter키의 번호 : 13
  // if (event.keyCode === 13) {
  if (enterKey == "Enter" || enterKey == "NumpadEnter") {
    addTask();
    taskInput.value = "";
  }
});
