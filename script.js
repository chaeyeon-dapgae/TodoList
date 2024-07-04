let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let underLine = document.querySelector("#under-line"); //underline

//+ 버튼 클릭시 taskList 배열에 task 객체(할 일) 추가하기
addButton.addEventListener("click", addTask);

/*
  자바스크립트 키보드 이벤트는 총 3가지
  keydown - 키가 눌렸을 때 (값 keycode)
  keypress - 키가 눌린 상태일 때 (연속적으로 실행됨) (값 ASCII)
  keypress 이벤트는 ASCII 표에 없는 shift, Fn, CapsLock 키는 인식 못함
  keyup - 키 누름이 해제될 때 (값 keycode)
*/
// input태그에서 Enter 누르면 addTask() 실행 
taskInput.addEventListener("keyup", function (enterKeyCode) {
  let enterKey = enterKeyCode.code;
  /*
    console.log(enterKey) -> 누른 키보드의 string 타입의 값
    여기서 enterKey 는 엔터키의 키보드 번호!! enter키의 번호 : 13
    if (event.keyCode === 13) //keyCode는 현재 지원하지 않는 브라우저가 있음
  */
  if (enterKey == "Enter" || enterKey == "NumpadEnter") {
    addTask();
    taskInput.value = "";
  }
});

// tab 클릭 시 underline 이동
// for (let i = 1; i < tabs.length; i++) {
//   tabs[i].addEventListener("click", function (e) {
//     underLine.style.width = e.target.offsetWidth + "px";
//     underLine.style.left = e.target.offsetLeft + "px";
//     //#under-line의 두께만큼 빼줘야 함
//     underLine.style.top = e.target.offsetHeight - 4 + "px";
//     //여기서 filter함수 실행해야 UI 변경가능..?
//     // filter()
//   });
// }
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

// + 버튼 클릭 시 taskList 배열에 task객체 추가 후 div 추가하는 render() 실행
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
  /* +버튼 클릭 시 input초기화 */
  taskInput.value = "";
}

// filter()에 따라 "filter된" div들을 html에 작성해주는 함수
// check, delete 버튼 클릭 시 아이템이 이동안되는 이유는 "화면갱신"을 안해서 그렇다고 함
// 강의영상에서 하나만 바꾸면 된다고 함...
function render() {
  let resultHtml = "";
  let list = [];
  /*
    내가 선택한 탭에 따라서 리스트를 달리 보여준다
    all => taskList
    ongoing,done => filterList
  */
  /* mode 변수는 tab의 id인 string 값을 가지고 있음 */
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

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
  /* 위에 for문에서 isComplete 값 비교 후 div추가 */
  document.getElementById("task-board").innerHTML = resultHtml;
}

// check 클릭 시 실행되는 함수
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      /* 클릭한 아이템의 id가 같아질 때 isComplete값 변경(true or false) */
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  /* isComplete값 변경 후 div 추가 */
  // render();
  filter()
}

// delete 클릭 시 실행되는 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  /* 클릭한 아이템의 id가 같아질 때 해당 아이템을 taskList배열에서 삭제 */
  // render();
  filter()
}

// tab의 id값의 따라 isComplete 변경 후 render 실행
function filter(e) {
  console.log(e) //pointerEvent 출력

  // mode변수 위치에 따라 결과가 완전 달라짐
  console.log(mode)
  // mode = e.target.id;
  if(e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    //#under-line의 두께만큼 빼줘야 함
    underLine.style.top = e.target.offsetHeight - 4 + "px";
  }

  filterList = [];
  if (mode === "ongoing") {
    //진행중인 리스트를 보여준다.
    //task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}