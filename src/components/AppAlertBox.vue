<template>
    <v-alert>
		<v-row align="center">
			<v-col>{{title}}</v-col>
		</v-row>
		<v-row>
			<v-col class="action-container">
				<v-btn @click="handleOnYes">YES</v-btn>
				<v-btn @click="handleOnNo">NO</v-btn>
			</v-col>
		</v-row>
    </v-alert>
</template>

<script>
export default {
    name: 'AppAlertBox',
    props: {
        title: {
            type: String
        }
    },
	data: () => ({
		//
    }),
    methods: {
        handleOnNo() {
			this.$emit("onNo");
		},
		handleOnYes() {
			this.$emit("onYes");
		}
    }
}
</script>

<style lang="scss" scoped>
    .v-alert {
		position: absolute;
		width: 500px;
		margin: auto;
		background-color: #EF5152;
		color: #fff;
		font-weight: 600;
		z-index: 10;
		@media only screen and (max-width: 600px) {
			width: 90%;
		}
	}
	.action-container {
		display: flex;
		justify-content: space-between;
	}
</style>
