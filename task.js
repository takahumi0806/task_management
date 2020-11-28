window.onload = () => {

  const tasks = [];
  const taskBtn = document.getElementById('task_button');

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
      const parent = document.querySelector('tbody');
      while(parent.firstChild){
        parent.removeChild(parent.firstChild);
      }
      tasks.splice(id, 1);
      tasks.forEach((task) => {
          if (id < task.id){
            newId = task.id-1;
            tasks[newId].id=newId;
            appendTask(task);
          }else{
            appendTask(task);
          }
      });
    });
  }

  function createBtn(newRow, status){
    const newCell = newRow.insertCell();
    const newText = document.createElement('button');
    newText.textContent = status;
    newCell.appendChild(newText);
  }

  function appendTask(task){
    const taskTable = document.querySelector('tbody');
    const newRow = taskTable.insertRow();
    createStatus(newRow, task.id);
    createStatus(newRow, task.comment);
    createBtn(newRow, task.status, task.id);
    deleteBtn(newRow, '削除', task.id);
  }
  
  taskBtn.addEventListener('click', () => {
    const id = tasks.length;
    const comment = document.getElementById('task_input').value;
    tasks.push({id, comment, status: '作業中'});
    appendTask(tasks[id]);
    document.sampleform.reset();
  });
};