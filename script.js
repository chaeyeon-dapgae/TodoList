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
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render ()
}

function render () {
  let resultHtml = '';

  for(let i = 0; i < taskList.length; i ++) {
    resultHtml +=
      `<div class="task">
        <div>${taskList[i]}</div>
        <div>
          <button>Check</button>
          <button>Delete</button>
        </div>
      </div>`
  }

  document.getElementById('task-board').innerHTML = resultHtml;
}