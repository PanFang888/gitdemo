export default {
    data() {
        return {
            breadList: []
        }
    },
    watch: {
        //data 计算属性 props $route
        $route() {
            this.getBreadCrumb()
        }
    },
    created() {
        this.getBreadCrumb()
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || []
        }
    }


}