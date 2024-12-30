import { FilterQuery, SortOrder } from 'mongoose';

class QueryBuilder<T> {
  private query: FilterQuery<T> = {};
  private sort: Record<string, SortOrder> = {};

  constructor(private queryParams: Record<string, any>) {}

  buildQuery() {
    this.handleSearch();
    this.handleFilter();
    this.handleSort();
    return { query: this.query, sort: this.sort };
  }

  private handleSearch() {
    const search = this.queryParams.search;
    if (search) {
      this.query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ] as FilterQuery<T>[];
    }
  }

  private handleFilter() {
    const filter = this.queryParams.filter;
    if (filter) {
      // Explicitly casting `this.query` to include the `author` property
      (this.query as any).author = filter;
    }
  }

  private handleSort() {
    const sortBy = this.queryParams.sortBy;
    const sortOrder = this.queryParams.sortOrder === 'desc' ? -1 : 1;

    if (sortBy) {
      this.sort[sortBy] = sortOrder;
    }
  }
}

export default QueryBuilder;
