window.onload = function () {
    let todos = [];
    init();

    function init() {
        todos = JSON.parse(localStorage.getItem('todos')) || []; // OR it with empty array for undefined        
        renderItems();
        bindInputEvents();

    }

    function bindInputEvents() {
        document.getElementById('to-do-input').addEventListener('keypress', function (event) {
            let task = this.value;
            if (event.key === 'Enter') {
                // console.log('ENTER key is pressed');
                createTodo(task);
                syncLocalStorage();
                renderItems();
                this.value = '';
            }
        });

    }

    function createTodo(task) {
        console.log(task);
        todos.push({
            id: todos.length,
            task: task,
            done: false
        });
        // todos.unshift({
        //     id: todos.length,
        //     task: task,
        //     done: false
        // });
    }

    function syncLocalStorage() {
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderItems() {
        let pEl = document.getElementById('todo-tasks-list');
        pEl.innerHTML = '';
        let list = `
        <li class="todo-item">
            <label class="control--checkbox">                    
                <strong>Modify the "Your To Do List" and Add an Edit Feature to
                Modify the task name that are not yet marked as "Done" </strong>
                <input data-id="0" type="checkbox" disabled>
                    <div class="checked-icon"></div>
            </label>            
        </li>`;
        for (var i = 0; i < todos.length; i++) {
            var item = createItemTemplate(todos[i]);
            list += item;
        }
        pEl.innerHTML = list;

        document.querySelectorAll('#todo-tasks-list li button').forEach(function (item) {
            item.addEventListener('click', function (event) {
                // removeItem(dataId);
                // syncLocalStorage();
                // renderItems();
                let dataId = item.getAttribute('data-id');
                let dataEdit = item.getAttribute('data-bs-edit');
                if(dataId){
                    removeItem(dataId);
                    syncLocalStorage();
                    renderItems();
                }
                if(dataEdit){
                    // document.querySelectorAll('#todo-tasks-list li')[Array.from(document.querySelectorAll('#todo-tasks-list li button')).indexOf(this) +1].innerHTML += ` <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">`;
                    // console.log(todos[dataEdit].task)
                    document.getElementById('ModalLabel').textContent = `Edit to-do "${todos[dataEdit].task}"`;
                    document.getElementById('to-do-edit').setAttribute("data-id", `${dataEdit}`);
                }
            });

        });
        document.querySelectorAll('#todo-tasks-list li input').forEach(function (item) {
            item.addEventListener('click', function (event) {
                let dataId = item.getAttribute('data-id');

                // if (item.getAttribute('checked')) {
                //     // update the "done" parameter as true
                //     item.removeAttribute('checked');
                //     updateItem(dataId, false);
                // } else {
                //     // update the "done" parameter as false
                //     // lagyan ng check
                //     item.setAttribute('checked', true);
                //     updateItem(dataId, true);
                // }
                if(!item.getAttribute('checked')){
                    // item.setAttribute('checked', true);
                    updateItem(dataId, true);
                }
                else{
                    item.setAttribute('checked', false);
                    updateItem(dataId, false);
                }
                syncLocalStorage();
                renderItems();
            })
        });
    }

    function createItemTemplate(todo) {
        var item = '<li class="todo-item ' + (todo.done ? 'done' : '') + '">';        
        item += '<label class="control--checkbox">';
        item += todo.task;
        item += '<input data-id="' + todo.id + '" type="checkbox" ' + (todo.done ? 'checked' : '') + ' />';
        item += '<div class="checked-icon"></div>';
        item += '</label>';
        item += `<button data-bs-edit="${todo.id}" data-bs-toggle="modal" data-bs-target="#edit" class="btn edit-todo-btn"><i class="fa-solid fa-pen-to-square" title="Edit"></i></button>`
        item += '<button data-id="' + todo.id + '" class="btn remove-todo-btn"><i class="fa fa-trash" title="Delete"></i></button>';
        item += '</li>';

        return item;
    }

    function updateItem(id, isDone) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].done = isDone;
                console.log(isDone)
                break;
            }
        }
    }

    document.getElementById('saveChange').addEventListener('click', e => {
        dataEdit = parseInt(document.getElementById('to-do-edit').getAttribute('data-id'));
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == dataEdit) {
                todos[i].task = document.getElementById('to-do-edit').value;
                break;
            }
        }
        syncLocalStorage();
        renderItems();
    });

    function removeItem(id) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
            }
        }
    }

};