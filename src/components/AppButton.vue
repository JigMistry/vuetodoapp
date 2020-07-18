 <template>
    <v-btn
        :color="color"
        :height="height"
        :width="width"
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
        },
        color: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 40
        },
        width: {
            type: Number,
            default: 100
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
    // button {
    //     width: 200px;
    // }
</style>
