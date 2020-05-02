import Pagination from "@/components/Pagination";

let tableMixin = {
    components:{
        Pagination
    },
    created() {
        // console.log('created');
    },
    mounted() {
        // console.log('mounted');
    },
    data() {
        return {
            originList:[],
            list:[],
            total:100,
            listQuery:{
                page:1,
                limit:10
            },
            listLoading:false
        }
    },
    methods: {
        getList(){
            
        }
    },
}


export default tableMixin;