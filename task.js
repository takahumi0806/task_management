window.onload = () => {

  const tasks = [];
  const taskBtn = document.getElementById('task_button');
  const taskAll = document.getElementById('allTask');
  const taskWorking = document.getElementById('working');
  const taskDone = document.getElementById('done');

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
      if (tasks[id].status==='完了'){
        tasks[id].status='作業中';
        changeTask();
      } else {
        tasks[id].status='完了';
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

  taskBtn.addEventListener('click', () => {
    const id = tasks.length;
    const comment = document.getElementById('task_input').value;
    tasks.push({id, comment, status:'作業中'});
    if (!taskDone.checked){
      appendTask(tasks[id]);
    }
    document.sampleform.reset();
  });

  taskAll.addEventListener('click', function(){
    deleteStatus();
    changeTask()
  })

  taskWorking.addEventListener('click', function(){
    deleteStatus();
    for (let i = 0; i < tasks.length; i++) {
      if(!tasks[i].status.indexOf('作業中')){
        appendTask(tasks[i]);
      }
    }
  });

  taskDone.addEventListener('click', function(){
    deleteStatus();
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].status.indexOf('作業中')){
        appendTask(tasks[i]);
      }
    }
  });
}