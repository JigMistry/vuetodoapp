<template>
	<v-container>
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
						<template v-for="(item, index) in todos">
							<v-list-item
								:key="index"
							>
								<v-list-item-content>
									<v-list-item-title>{{item.title}}</v-list-item-title>
									<v-list-item-subtitle>
										
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-divider v-bind:key="index"/>
						</template>
					</v-list>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>
export default {
	name: 'ToDoPage',
	data: () => ({
		tab: null,
        items: [
			{ tab: 'All'},
			{ tab: 'Active'},
			{ tab: 'Completed'}
		],
		todos: [
			{
				title: 'To Do 1'
			},
			{
				title: 'To Do 2'
			},
			{
				title: 'To Do 3'
			}
		]
	})
}
</script>

<style lang="scss">
	.v-tabs {
		margin-top: 100px;
	}
</style>
