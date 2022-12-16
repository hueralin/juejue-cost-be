module.exports = {
  /**
   * 计算偏移量
   * @param {*} page_num
   * @param {*} page_size
   * @return 偏移量
   */
  calcPagingOffset(page_num, page_size) {
    return (page_num - 1) * page_size;
  },
  /**
   * 格式化分页数据
   * @param {*} { page_num, page_size, total, list }
   * @return 格式化后的数据
   */
  formatPagingData({ page_num, page_size, total, list }) {
    const total_page = Math.ceil(total / page_size);

    return {
      list,
      page_num,
      page_size,
      total,
      total_page,
      has_prev: page_num > 1 && page_num <= total_page,
      has_next: page_num >= 1 && page_num < total_page,
    };
  },
};
