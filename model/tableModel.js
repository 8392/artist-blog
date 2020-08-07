class TableData {
    constructor(data, { currentPage, pageSize }) {
        this.page = {
            currentPage,
            pageSize,
        }
        this.page.tatal = data.count;
        this.tableList = data.rows
    }
}

module.exports = TableData;