<template>
    <div>
        <div class='filter'>
            <Form ref="op" :model="op" :rules="ruleCustom" :label-width="80" inline>
                <FormItem label="年度/月份" prop="currentDate">
                     <Cascader :data="timeDate" v-model="op.currentDate"></Cascader>
                </FormItem>
                <FormItem label="付款状态" prop="financialStatus">
                    <Select v-model="op.financialStatus">
                        <Option value="1">已付款</Option>
                        <Option value="0">未付款</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('op')">检索</Button>
                </FormItem>
            </Form>
        </div>
        <div>
            <p>余额: <span>{{balance}}</span> 应付: <span>{{payAmount}}</span></p>
        </div>
        <div style='margin:16px'><Button type="primary" @click="ToMakeOutAnInvoice">去开票</Button></div>
        <Table @on-selection-change='selection' :data="invoicData" :columns="tableColumns" :style='{minHeight:"500px"}' stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import track from '@/utils/track.js'
import { mapActions } from 'vuex'
import { getInvoicAmount,getBalance } from '@/api/invoic.js'
export default {
    data() {
        return {
            balance:'0.00',
            payAmount:'0.00',
            op: {
                    financialStatus:'0'
                },
                ruleCustom: {
                    contractCode: [
                        // { validator: validateText}
                    ]
                },
                invoicData:[],
                currentSelections:[],
                total:100,
                current:1,
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '合同编号',
                        key: 'contractCode',
                        render:(h, params) => {
                            return h('a', {on:{
                                click: () => {
                                    this.gotoDetail({contractType:params.row.contractType,id:params.row.id})
                                }
                            }},params.row.contractCode);
                        }
                    },
                    {
                        title: '合同标题',
                        key: 'contractTitle'
                    },
                    {
                        title: '关系人',
                        key: 'personOfInterest'
                    },
                    {
                        title: '时间',
                        key: 'invoiceTime'
                    },
                    {
                        title: '应付金额',
                        key: 'amount'
                    },
                    {
                        title: '付款状态',
                        key: 'invoiceStatus',
                        render: (h, params) => {
                            return h('span', {},params.row.financialStatus ? '已付款' : '未付款');
                        }
                    },
                    {
                        title: '开票进度',
                        key: 'invoiceStatus',
                        render: (h, params) => {
                            return h('span', {},!params.row.invoiceStatus ? '未提交' : params.row.invoiceStatus == 1 ? '开票中' : params.row.invoiceStatus == 2 ? '已开票' : '');
                        }
                    }
                ],
                timeDate:[{
                    value: '2020',
                    label: '2020',
                    children: [
                        {
                            value: '01',
                            label: '01'
                        },
                        {
                            value: '02',
                            label: '02'
                        },
                        {
                            value: '03',
                            label: '03'
                        },
                        {
                            value: '04',
                            label: '04'
                        },
                        {
                            value: '05',
                            label: '05'
                        },
                        {
                            value: '06',
                            label: '06'
                        },
                        {
                            value: '07',
                            label: '07'
                        },
                        {
                            value: '08',
                            label: '08'
                        },
                        {
                            value: '09',
                            label: '09'
                        },
                        {
                            value: '10',
                            label: '10'
                        },
                        {
                            value: '11',
                            label: '11'
                        },
                        {
                            value: '12',
                            label: '12'
                        }
                    ]
                }]
        }
    },
    created() {
        this.init()
    },
    methods: {
        ...mapActions(['getInvoicList']),
        handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.init()
                    } else {
                        this.$Message.error('失败!');
                    }
                })
        },
        ToMakeOutAnInvoice(){
            this.$router.push({path:'/manager/invoic/upload'})
        },
        @track.loading
        async init(){
            let query = JSON.parse(JSON.stringify(this.op))
            for (const key in query) {
                if(query[key]){
                    if(key == 'currentDate' && query[key].length > 0){
                        query['year'] =  query[key][0]
                        query['month'] =  query[key][1]
                    }
                }else{
                    delete query[key]
                }
            }
            delete query['currentDate']
          let data = (await this.getInvoicList(query)).data
          this.invoicData = data.records
          this.total = data.total
          this.current = data.page
          this.getInvoicAmount(query)
          this.getBalance()
        },
        getInvoicAmount(query){
            getInvoicAmount(query).then(res => {
                this.payAmount = res.data ? res.data : '0.00'
            })
        },
        getBalance(){
            getBalance().then(res => {
                this.balance = res.data ? res.data : '0.00'
            })
        },
        selection(selections){
            this.currentSelections = selections
        },
        changePage (page) {
            this.op.current = page
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            this.init();
        },
    },
}
</script>
<style lang="scss" scoped>
    
</style>