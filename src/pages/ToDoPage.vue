<template>
	<v-container>
		<div class="todo-header">
			<v-text-field
				label="What is your plan to do"
				v-model="todoTitle"
			></v-text-field>
			<app-button
				:title="buttonTitle"
				@submit="handleToDoAdd"
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
											{{item.title}}
										</v-list-item-title>
										<v-checkbox
											v-model="item.isCompleted"
										/>
									</div>
									<v-list-item-subtitle>
										
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

export default {
	name: 'ToDoPage',
	components: {
		AppButton
	},
	computed: {
		todos() {
			console.log("i am called");
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
		todoTitle: "",
		buttonTitle: "Add",
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
		]
	}),
	methods: {
		handleToDoAdd() {
			this.todoTitle = this.todoTitle.trim();
			if(!this.todoTitle.length) return;
			this.todosList.push({
				id: new Date().getTime(),
				title: this.todoTitle.trim(),
				isCompleted: false
			});
			this.todoTitle = "";
			this.tab = 0; // To open All tab when new todo adds
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
		}
	}
</style>
