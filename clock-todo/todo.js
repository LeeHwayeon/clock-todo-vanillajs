/*
1. form에 입력을 받으면
2. 제출한 값을 리스트에 띄워줘야 한다.
3. 새로고침해도 리스트가 남아 있도록 localStorage에 저장해줘야 한다.
4. 할 일 삭제 버튼
*/

const toDoForm = document.querySelector('.form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.todo-ul')

const TODOLIST = 'toDoList';
//배열을 사용하지 않고 그냥 todo를 계속 추가한다면 기존의 todo는 없어지고 새로운 todo만 남는다.
//따라서 배열형태로 리스트를 만들어 배열을 저장해준다.
let toDoListArray = [];

function init(){
  loadToDoList();
  toDoForm.addEventListener('submit', createToDo);
}

init();

//입력한 input 값을 받아오는 함수
function createToDo(e){
  e.preventDefault();
  const toDoInputValue = toDoInput.value;
  console.log(toDoInputValue);
  paintToDo(toDoInputValue);
  saveToDoList(toDoInputValue);
  toDoInput.value = "";
}

//받아온 input값을 화면에 띄워주는 함수
function paintToDo(toDoInputValue){
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = toDoInputValue;
  li.appendChild(span);
  toDoList.append(li);
}

function loadToDoList(){
  const loadToDoList = localStorage.getItem(TODOLIST);
  if(loadToDoList !== null){
    const parsedToDoList = JSON.parse(loadToDoList);
    parsedToDoList.forEach(function(todo){
      paintToDo(todo.text);
      saveToDoList(todo.text);
    })
  }
}

function saveToDoList(toDoInputValue){
  const toDoObj = {
    text: toDoInputValue,
    id: toDoListArray.length+1
  };
  toDoListArray.push(toDoObj);
  localStorage.setItem(TODOLIST, JSON.stringify(toDoListArray));
}



