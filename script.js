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

addButton.addEventListener("click", addTask);

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
  let resultHtml = '';

  for(let i = 0; i < taskList.length; i ++) {
    if (taskList[i].isComplete == true) {
      resultHtml += 
      `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')"><i class="xi-refresh"></i></button>
          <button onclick="deleteTask('${taskList[i].id}')"><i class="xi-trash"></i></button>
        </div>
      </div>`
    } else {
      resultHtml +=
        `<div class="task">
          <div>${taskList[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="xi-check"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="xi-trash"></i></button>
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

function randomIDGenerate () {
  return '_' + Math.random().toString(36).substr(2,9);
}