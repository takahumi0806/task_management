window.onload = () => {

  const tasks = [];
  const taskBtn = document.getElementById('task_button');
  const taskChange = document.getElementById('taskchange');
  const numberStatus = document.getElementsByName("status");

  function createStatus(newRow, status){
    const newCell = newRow.insertCell();
    const newText = document.createTextNode(status);
    newCell.appendChild(newText);
  }

  function deleteBtn(newRow, status, id){
    const newCell = newRow.insertCell();
    const newText = document.createElement('button');
    newText.textContent = status;
    newCell.appendChild(newText);
    newText.addEventListener('click', () => {
      deleteStatus();
      tasks.splice(id, 1);
      tasks.forEach((task) => {
          if (id < task.id){
            const newId = task.id - 1;
            tasks[newId].id = newId;
            appendTask(task);
          } else {
            appendTask(task);
          }
      });
    });
  }

  function createBtn(newRow, status, id){
    const newCell = newRow.insertCell();
    const newTextstatus=document.createElement('button');
    newTextstatus.textContent = status;
    newCell.appendChild(newTextstatus);
    newTextstatus.addEventListener('click', () =>{
      deleteStatus();
      if (tasks[id].status ===' 完了'){
        tasks[id].status = '作業中';
        changeTask();
      } else {
        tasks[id].status = '完了';
        changeTask();
      }
    });
  }

  function changeTask(){
    tasks.forEach(function(task) {
      appendTask(task);
    });
  }

  function appendTask(task){
    const taskTable = document.querySelector('tbody');
    const newRow = taskTable.insertRow();
    createStatus(newRow, task.id);
    createStatus(newRow, task.comment);
    createBtn(newRow, task.status, task.id);
    deleteBtn(newRow, '削除', task.id);
  }

  function deleteStatus(){
    const parent = document.querySelector('tbody');
    while (parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
  }

  function selectTask(task){
      const results = tasks.filter(value => value.status === task);
      results.forEach(function(result){
        appendTask(result);
      });
    }
  
  taskBtn.addEventListener('click', () => {
    const id = tasks.length;
    const comment = document.getElementById('task_input').value;
    tasks.push({id, comment, status:'作業中'});
    if (!numberStatus[2].checked){
      appendTask(tasks[id]);
    }
    document.sampleform.reset();
  });

  taskChange.addEventListener('change', () => {
    if (numberStatus[0].checked){
      deleteStatus();
      changeTask();
    } else if (numberStatus[1].checked){
      deleteStatus();
      selectTask(numberStatus[1].value);
    } else if (numberStatus[2].checked){
      deleteStatus();
      selectTask(numberStatus[2].value);
    }
  });
}