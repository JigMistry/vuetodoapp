<template>
	<v-container>
		<div class="todo-header">
			<v-text-field
				label="What is your plan to do"
				v-model="todoTitle"
			></v-text-field>
			<div class="top-button-container">
				<app-button
					:title="buttonTitle"
					@submit="handleToDoAddEdit"
					color="primary"
				/>
				<app-button
					class="update-cancel-btn"
					v-if="toBeUpdateToDo"
					title="Cancel"
					@submit="handleUpdateCancel"
				/>
			</div>
			<app-alert-box
				v-if="showAlert"
				:title="alertTitle"
				@onYes="onDeleteToDo"
				@onNo="onCancel"
			/>
		</div>
		<v-tabs
			v-model="tab"
			background-color="primary"
			dark
			:centered="true"
		>
			<v-tab
				v-for="item in items"
				:key="item.tab"
			>
				{{ item.tab }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item
				v-for="item in items"
				:key="item.tab"
			>
				<v-card flat>
					<v-list three-line>
						<div v-sortable @sorted="handleSorted">
							<template v-for="(item) in todos">
								<v-list-item
									:key="item.id"
								>
									<v-list-item-content>
										<div class="todo-title-header">
											<v-list-item-title>
												<p v-if="item.isCompleted"><del>{{item.title}}</del></p>
												<p v-else>{{item.title}}</p>
											</v-list-item-title>
											<v-checkbox
												v-model="item.isCompleted"
											/>
										</div>
										<v-list-item-subtitle>
											<app-button
												title="Remove"
												@submit="handleDeleteTodo(item)"
												color="error"
												:height="25"
												:width="80"
											/>
											<app-button
												class="update-button"
												title="Update"
												@submit="handleUpdateTodo(item)"
												:height="25"
												:width="80"
											/>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</template>
						</div>
					</v-list>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>

import Sortable from '../directives/sortable.directive';

import AppButton from "../components/AppButton";
import AppAlertBox from "../components/AppAlertBox";

import { mapState, mapActions } from 'vuex';

export default {
	name: 'ToDoPage',
	components: {
		AppButton,
		AppAlertBox
	},
	directives: { Sortable },
	computed: {
		...mapState({
			todosList: state => state.todosModule.todosList
		}),
		buttonTitle() {
			if(this.toBeUpdateToDo) {
				return  "Update";
			} else {
				return "Add";
			}
		},
		todos() {
			switch(this.tab) {
				case 0 : {
					return this.todosList;
				}
				case 1: {
					return this.todosList.filter(f => f.isCompleted === false);
				}
				case 2: {
					return this.todosList.filter(f => f.isCompleted === true);
				}
				default: {
					return this.todosList;
				}
			}
		}
	},
	data: () => ({

		showAlert: false,
		alertTitle: "",

		todoTitle: "",
		tab: 0, // Initial All Tab
        items: [
			{ tab: 'All'},
			{ tab: 'Active'},
			{ tab: 'Completed'}
		],

		toBeDeleteToDo: null,
		toBeUpdateToDo: null
	}),
	methods: {
		...mapActions({
			addTodo: 'todosModule/addTodo',
			updateTodo: 'todosModule/updateTodo',
			deleteTodo: 'todosModule/deleteTodo',
			changeOrderTodo: 'todosModule/changeOrderTodo',
		}),
		handleToDoAddEdit() {
			this.todoTitle = this.todoTitle.trim();
			if(!this.todoTitle.length) return;

			if(this.toBeUpdateToDo) { // For handling update
				this.updateTodo({
					toBeUpdateToDo: this.toBeUpdateToDo,
					newTitle: this.todoTitle
				});
			} else { // For handling create
				this.addTodo({
					title: this.todoTitle
				});
				this.tab = 0; // To open All tab when new todo adds
			}
			this.toBeUpdateToDo = null;
			this.todoTitle = "";
		},
		handleUpdateCancel() {
			this.toBeUpdateToDo = null;
			this.todoTitle = "";
		},
		handleDeleteTodo(todo) {
			this.alertTitle = `Are you sure to remove the '${todo.title}' ?`
			this.toBeDeleteToDo = todo;
			this.showAlert = true;
		},
		handleUpdateTodo(todo) {
			this.toBeUpdateToDo = todo;
			this.todoTitle = todo.title;
		},
		onCancel() {
			this.showAlert = false;
			this.toBeDeleteToDo = null;
		},
		onDeleteToDo() {
			this.showAlert = false;
			this.deleteTodo({
				toBeDeleteToDo: this.toBeDeleteToDo
			});
			this.toBeDeleteToDo = null;
			// If during update , remove the todo
			this.toBeUpdateToDo = null;
			this.todoTitle = "";
		},
		handleSorted(event) {
			console.log("old , new index", event.oldIndex, event.newIndex);
			this.changeOrderTodo({
				oldIndex: event.oldIndex,
				newIndex: event.newIndex
			});
		}
	}
}
</script>

<style lang="scss">
	@import "src/assets/scss/todopage.scss";
</style>
