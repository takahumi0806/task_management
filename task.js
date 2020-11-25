window.onload = function() {

  const tasks=[]
  const createButton=document.getElementById('task_button');

  function appendID(id){
    const ptagId=document.createElement('p');
    ptagId.textContent = id
    document.getElementById('task_id').appendChild(ptagId);
  }

  function appendComment(comment, id){
    const ptagId=document.createElement('p');
    ptagId.id = `comment${id}`
    ptagId.textContent=comment
    document.getElementById('task_comment').appendChild(ptagId);
  }

  function appendStatusbtn(status, id){
    const statusButton=document.createElement('button')
    const statusPtag=document.createElement("p");
    statusButton.id=`status_task${id}`
    statusPtag.id=`status_now${id}`;
    statusButton.textContent = status
    document.getElementById('task_status').appendChild(statusPtag);
    document.getElementById(`status_now${id}`).appendChild(statusButton);
  }

  function alldeleteStatus(){
    const parent_id=document.getElementById('task_id');
    const parent_delete=document.getElementById('task_delete');
    const parent_status=document.getElementById('task_status');
    const parent_comment=document.getElementById('task_comment');
    while(parent.lastChild){
      parent_id.removeChild(parent_id.lastChild);
      parent_comment.removeChild(parent_comment.lastChild);
      parent_status.removeChild(parent_status.lastChild);
      parent_delete.removeChild(parent_delete.lastChild);
    }
    parent_id.textContent='ID'
    parent_comment.textContent='コメント'
    parent_status.textContent='状態'
    parent_delete.textContent='　　'
  }

  function appendStatusall(task){
    appendID(task.id)
    deleteStatusbtn(task.id)
    appendStatusbtn(task.status, task.id)
    appendComment(task.comment, task.id)
  }

  function deleteStatusbtn(id){
    const deleteButton=document.createElement('button')
    const deletePtag=document.createElement("p");
    deletePtag.id=`delete_status${id}`;
    document.getElementById('task_delete').appendChild(deletePtag);
    deleteButton.textContent='削除'
    document.getElementById(`delete_status${id}`).appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      alldeleteStatus(id)
      tasks.splice(id, 1)
      tasks.forEach(function(task) {
          if (id < task.id){
            newId = task.id-1
            tasks[newId].id=newId
            appendStatusall(task)
          }else{
            appendStatusall(task)
          }
      });
    });
  }
  
  createButton.addEventListener('click', () => {
    const id=tasks.length
    const comment=document.getElementById('task_input').value;
    tasks.push({id, comment, status: '作業中'})
    appendID(id)
    appendComment(comment, id)
    appendStatusbtn(tasks[id].status, id)
    deleteStatusbtn(id)
    document.sampleform.reset();
  });
};