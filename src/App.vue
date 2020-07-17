<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
			:min-height="80"
		>
			<div class="app-header">
				<h1>OpenXcell</h1>
				<p>To-Do App</p>
			</div>
		</v-app-bar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
header {
	.v-toolbar__content {
		height: 100% !important;
	}
	.app-header {
		margin-top: 10px;
		p {
			font-weight: 600;
		}
	}
}
</style>