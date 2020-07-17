 <template>
    <v-btn
        color="primary"
        :height="40"
        @click="onSubmit"
    >
        {{title}}
    </v-btn>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        title: {
            type: String
        }
    },
	data: () => ({
		//
    }),
    methods: {
        onSubmit() {
            this.$emit("submit");
        }
    }
}
</script>

<style lang="scss" scoped>
    button {
        width: 200px;
    }
</style>
