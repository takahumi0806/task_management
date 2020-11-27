window.onload = function() {

  const tasks = [];
  const taskBtn = document.getElementById('task_button');

  function createStatus(newRow, status){
    newCell = newRow.insertCell();
    newText = document.createTextNode(status);
    newCell.appendChild(newText);
  }

  function deleteBtn(newRow, status, id){
    newCell = newRow.insertCell();
    newText = document.createElement('button');
    newText.textContent = status;
    newCell.appendChild(newText);
    newText.addEventListener('click', () =>{
      const taskTable = document.getElementById('targetTable');
      let rowNum = taskTable.rows.length; 
      while(rowNum-1>0){
        if (rowNum>1) {
          taskTable.deleteRow(rowNum-1);
        }
        rowNum -= 1
      }
      tasks.splice(id, 1)
      tasks.forEach(function(task) {
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

  function createBtn(newRow, status, id){
    newCell = newRow.insertCell();
    newText = document.createElement('button');
    newText.textContent = status;
    newCell.appendChild(newText);
    newText.addEventListener('click', () => {
    })
  }

  function appendTask(task){
    const taskTable = document.getElementById('targetTable');
    const newRow = taskTable.insertRow();
    createStatus(newRow, task.id);
    createStatus(newRow, task.comment);
    createBtn(newRow, task.status, task.id);
    deleteBtn(newRow, '削除', task.id);
  }
  
  taskBtn.addEventListener('click', () => {
    const id = tasks.length
    const comment = document.getElementById('task_input').value;
    tasks.push({id, comment, status: '作業中'});
    appendTask(tasks[id]);
    document.sampleform.reset();
  });
};