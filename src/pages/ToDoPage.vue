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
							<v-divider v-bind:key="'d'+item.id"/>
						</template>
					</v-list>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>

import AppButton from "../components/AppButton";
import AppAlertBox from "../components/AppAlertBox";

export default {
	name: 'ToDoPage',
	components: {
		AppButton,
		AppAlertBox
	},
	computed: {
		buttonTitle() {
			if(this.toBeUpdateToDo) {
				return  "Update";
			} else {
				return "Add";
			}
		},
		todos() {
			console.log("computed called");
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
			},
			{
				id: new Date().getTime()+"3",
				title: 'To Do 3',
				isCompleted: true
			},
			{
				id: new Date().getTime()+"4",
				title: 'To Do 4',
				isCompleted: false
			}
		],

		toBeDeleteToDo: null,
		toBeUpdateToDo: null
	}),
	methods: {
		handleToDoAddEdit() {
			this.todoTitle = this.todoTitle.trim();
			if(!this.todoTitle.length) return;

			if(this.toBeUpdateToDo) { // For handling update
				let indexFound = this.todosList.findIndex((l) => {
					return l.id === this.toBeUpdateToDo.id;
				});
				this.todosList = this.todosList.map((td, index) => {
					if(index === indexFound) {
						td.title = this.todoTitle;
						return td;
					}
					return td;
				});
			} else { // For handling create
				this.todoTitle = this.todoTitle.trim();
				if(!this.todoTitle.length) return;
				this.todosList.unshift({
					id: new Date().getTime(),
					title: this.todoTitle.trim(),
					isCompleted: false
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
			console.log("to do ", todo);
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
			let index = this.todosList.findIndex(td => td.id == this.toBeDeleteToDo.id);
			if(index >= 0) {
				this.todosList.splice(index, 1);
			}
			this.toBeDeleteToDo = null;
		}
	}
}
</script>

<style lang="scss">
	.todo-header {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.v-input {
			width: 100%;
			font-size: 16px;
		}
		.top-button-container {
			display: flex;
			.update-cancel-btn {
				margin-left: 10px;
			}
		}
	}
	.v-tabs {
		margin-top: 100px;
	}
	.v-list {
		.todo-title-header {
			display: flex;
			justify-content: space-between;
		}
		.v-list-item {
			cursor: pointer;
			.v-list-item__title {
				p {
					display: inline-block;
				}
			}
			.v-list-item__subtitle {
				.update-button {
					margin-left: 20px;
				}	
			}
		}
	}
</style>
