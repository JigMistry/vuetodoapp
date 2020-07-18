const state = {
    todosList: [
        {
            id: new Date().getTime()+"1",
            title: 'To Do 1',
            isCompleted: false
        },
        {
            id: new Date().getTime()+"2",
            title: 'To Do 2',
            isCompleted: true
        } 
    ]
};

const actions = {
    addTodo({ commit }, data) {
        commit('add', data);
    },
    updateTodo({ commit }, data) {
        commit('update', data);
    },
    deleteTodo({ commit }, data) {
        commit('delete', data);
    },
    changeOrderTodo({ commit }, data) {
        commit('orderChange', data);
    }
};

const mutations = {
    add(state, { title }) {
        state.todosList.unshift({
            id: new Date().getTime(),
            title,
            isCompleted: false
        });
    },
    update(state, { toBeUpdateToDo, newTitle }) {
        let indexFound = state.todosList.findIndex((l) => {
            return l.id === toBeUpdateToDo.id;
        });
        state.todosList = state.todosList.map((td, index) => {
            if(index === indexFound) {
                td.title = newTitle;
                return td;
            }
            return td;
        });
    },
    delete(state, { toBeDeleteToDo }) {
        let index = state.todosList.findIndex(td => td.id == toBeDeleteToDo.id);
        if(index >= 0) {
            state.todosList.splice(index, 1);
        }
    },
    orderChange(state, data) {
        if( data.oldIndex === data.newIndex ) {
            return;
        }
        let temp = state.todosList.splice(data.oldIndex, 1);
        state.todosList.splice( data.newIndex, 0, temp[0]);
    }
};

export const todos = {
    namespaced: true,
    state,
    actions,
    mutations
};