// 유저가 값을 입력한다
// + 버튼을 누르면 값이 추가된다
// delete버튼을 누르면 값이 삭제된다.
//check 버튼을 누르면 할일이 끝나서 밑줄이 그어진다.
// 탭을 누르면 언더바가 이동하낟
// Done탭은, 끝난 아이템만, Not Done은 진행중인 아이템만 보여진다
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event){
    filter(event)
  })
}

function addTask () {
  let task = {
    id: randomIDGenerate (),
    taskContent: taskInput.value,
    isComplete: false,
  }
  taskList.push(task);
  render ()
}

function render () {
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === 'all') {
    //all taskList
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    // ongoing, done filterList
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다
  // all => taskList
  // ongoing,done => filterList


  let resultHtml = '';

  for(let i = 0; i < list.length; i ++) {
    if (list[i].isComplete == true) {
      resultHtml += 
      `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="xi-refresh"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="xi-trash"></i></button>
        </div>
      </div>`
    } else {
      resultHtml +=
        `<div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="xi-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="xi-trash"></i></button>
          </div>
        </div>`
    }
  }

  document.getElementById('task-board').innerHTML = resultHtml;
}

function toggleComplete(id) {
  for(let i = 0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render ()
}

function deleteTask(id) {
  for(let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1)
      break;
    }
  }
  render()
}

function filter(event) {
  mode = event.target.id
  filterList = []

  if (mode === "all") {
    render ()
  } else if (mode === "ongoing") {
    //진행중인 리스트를 보여준다.
    //task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete === false) {
        filterList.push(taskList[i])
      }
    }
    render ()
  } else if (mode === "done") {
    //끝나는 케이스
    //task.isComplete = true
    for(let i = 0; i < taskList.length; i++) {
      if(taskList[i].isComplete === true) {
        filterList.push(taskList[i])
      }
    }
    render()
  } 
}

function randomIDGenerate () {
  return '_' + Math.random().toString(36).substr(2,9);
}