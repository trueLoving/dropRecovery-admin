<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="200">
      <template slot-scope="scope">{{ scope.row.order_no | orderNoFilter }}</template>
    </el-table-column>
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">¥{{ scope.row.price | toThousandFilter }}</template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    }
  },
  data() {
    return {
      list: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list = [
        {
          order_no: "Bb6Aaced-Bd2B-2Ff7-AB8B-3D5e3BDC86BA",
          price: 6621.3,
          status: "success",
          timestamp: 998165354996,
          username: "Thomas Harris"
        },
        {
          order_no: "Bb6Aaced-Bd2B-2Ff7-AB8B-3D5e3BDC86BA",
          price: 6621.3,
          status: "success",
          timestamp: 998165354996,
          username: "Thomas Harris"
        },
        {
          order_no: "Bb6Aaced-Bd2B-2Ff7-AB8B-3D5e3BDC86BA",
          price: 6621.3,
          status: "success",
          timestamp: 998165354996,
          username: "Thomas Harris"
        },
        {
          order_no: "Bb6Aaced-Bd2B-2Ff7-AB8B-3D5e3BDC86BA",
          price: 6621.3,
          status: "success",
          timestamp: 998165354996,
          username: "Thomas Harris"
        },
        {
          order_no: "Bb6Aaced-Bd2B-2Ff7-AB8B-3D5e3BDC86BA",
          price: 6621.3,
          status: "success",
          timestamp: 998165354996,
          username: "Thomas Harris"
        }
      ];
    }
  }
};
</script>
