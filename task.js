window.onload=function() {

  const tasks=[]
  const createButton=document.getElementById('task_button');

  function createStatus(newRow, status){
    newCell=newRow.insertCell();
    newText=document.createTextNode(status);
    newCell.appendChild(newText);
  }

  function deleteBtn(newRow, status, id){
    newCell=newRow.insertCell();
    newText=document.createElement('button');
    newText.textContent = status
    newCell.appendChild(newText);
    newText.addEventListener('click', () =>{
      deleteStatusall()
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

  function createBtn(newRow, status, id){
    newCell=newRow.insertCell();
    newTextstatus=document.createElement('button');
    newTextstatus.textContent = status
    newCell.appendChild(newTextstatus);
    newTextstatus.addEventListener('click', () =>{
      deleteStatusall()
      tasks[id].status='完了'
      tasks.forEach(function(task) {
        appendTask(task)
      })
    })
  }

  function appendTask(task){
    let taskTable=document.getElementById('targetTable');
    let newRow=taskTable.insertRow();
    createStatus(newRow, task.id)
    createStatus(newRow, task.comment)
    createBtn(newRow, task.status, task.id)
    deleteBtn(newRow, '削除', task.id)
  }

  function deleteStatusall(){
    let taskTable = document.getElementById('targetTable');
    let row_num=taskTable.rows.length; 
    while(row_num-1>0){
      if (row_num>1) {
        taskTable.deleteRow(row_num-1);
      }
      row_num-=1
    }
  }
  
  createButton.addEventListener('click', () => {
    const id=tasks.length
    const comment=document.getElementById('task_input').value;
    tasks.push({id, comment, status: '作業中'})
    appendTask(tasks[id])
    document.sampleform.reset();
  });
};