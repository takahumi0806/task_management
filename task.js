window.onload = function() {

  const tasks=[]
  const createButton=document.getElementById('task_button');

  function createStatus(newRow, status){
    newCell = newRow.insertCell();
    newText = document.createTextNode(status);
    newCell.appendChild(newText);
  }

  function deleteBtn(newRow, status, id){
    newCell = newRow.insertCell();
    newText = document.createElement('button');
    newText.textContent = status
    newCell.appendChild(newText);
    newText.addEventListener('click', () =>{
      let taskTable = document.getElementById('targetTable');
      let row_num = taskTable.rows.length; 
      while(row_num-1>0){
        if (row_num>1) {
          taskTable.deleteRow(row_num-1);
        }
        row_num -= 1
      }
      tasks.splice(id, 1)
      tasks.forEach(function(task) {
          if (id < task.id){
            newId = task.id-1
            tasks[newId].id=newId
            appendTask(task)
          }else{
            appendTask(task)
          }
      });
    })
  }

  function createBtn(newRow, status){
    newCell = newRow.insertCell();
    newText = document.createElement('button');
    newText.textContent = status
    newCell.appendChild(newText);
    newText.addEventListener('click', () =>{
    })
  }

  function appendTask(task){
    let taskTable = document.getElementById('targetTable');
    let newRow = taskTable.insertRow();
    createStatus(newRow, task.id)
    createStatus(newRow, task.comment)
    createBtn(newRow, task.status, task.id)
    deleteBtn(newRow, '削除', task.id)
  }
  
  createButton.addEventListener('click', () => {
    const id=tasks.length
    const comment=document.getElementById('task_input').value;
    tasks.push({id, comment, status: '作業中'})
    task = tasks[id]
    appendTask(task)
    document.sampleform.reset();
  });
};