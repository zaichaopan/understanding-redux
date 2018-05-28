const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }));
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

function createStore(reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state. (getState)
    // 3. Listen to changes on the state. (subscribe)
    // 4. Update the state (dispatch)

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => listeners.filter(l => l !== listener);
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

let addTodoBtn = document.querySelector('#todoBtn');
let todoInput = document.querySelector('#todoInput');
let todoList = document.querySelector('#todoList');
let addGoalBtn = document.querySelector('#goalBtn');
let goalInput = document.querySelector('#goalInput');
let goalList = document.querySelector('#goalList');
let store = createStore(app);

function createRemoveBtn(cb) {
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'X';
    removeBtn.addEventListener('click', cb);
    return removeBtn;
}

function addTodoToDom(todo) {
    // list
    let list = document.createElement("li");
    list.innerHTML = todo.name;
    list.id = todo.id;
    todoList.appendChild(list);
    list.style.textDecoration = todo.complete ? 'line-through' : 'none';

    // remove
    const removeBtn = createRemoveBtn(function () {
        store.dispatch(removeTodoAction(todo.id));
    });

    list.appendChild(removeBtn)

    // toggle
    list.addEventListener('click', function () {
        store.dispatch(toggleTodoAction(todo.id));
    });
}

function addGoalToDom(goal) {
    // list
    let list = document.createElement("li");
    list.innerHTML = goal.name;
    goalList.appendChild(list);

    // remove
    const removeBtn = createRemoveBtn(function () {
        store.dispatch(removeGoalAction(goal.id));
    });

    list.appendChild(removeBtn)
}

function updateTodoGoalList() {
    todoList.innerHTML = '';
    goalList.innerHTML = '';
    let { todos, goals } = store.getState();
    todos.forEach(addTodoToDom);
    goals.forEach(addGoalToDom);
}

store.subscribe(updateTodoGoalList);

addTodoBtn.addEventListener('click', function () {
    let value = todoInput.value;
    todoInput.value = '';
    store.dispatch(addTodoAction({
        id: generateId(),
        name: value,
        complete: false
    }));
});


addGoalBtn.addEventListener('click', function () {
    let value = goalInput.value;
    goalInput.value = '';
    store.dispatch(addGoalAction({
        id: generateId(),
        name: value
    }));
});
