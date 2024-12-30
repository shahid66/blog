"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(queryParams) {
        this.queryParams = queryParams;
        this.query = {};
        this.sort = {};
    }
    buildQuery() {
        this.handleSearch();
        this.handleFilter();
        this.handleSort();
        return { query: this.query, sort: this.sort };
    }
    handleSearch() {
        const search = this.queryParams.search;
        if (search) {
            this.query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }
    }
    handleFilter() {
        const filter = this.queryParams.filter;
        if (filter) {
            // Explicitly casting `this.query` to include the `author` property
            this.query.author = filter;
        }
    }
    handleSort() {
        const sortBy = this.queryParams.sortBy;
        const sortOrder = this.queryParams.sortOrder === 'desc' ? -1 : 1;
        if (sortBy) {
            this.sort[sortBy] = sortOrder;
        }
    }
}
exports.default = QueryBuilder;
