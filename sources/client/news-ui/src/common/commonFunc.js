const commonFunc = {
  generateFakeData: (pageSize, total, dataFake) => {
    var reponse = {
      data: [],
      total: total,
    };

    for (let index = 0; index < pageSize; index++) {
      const newObject = {
        ...dataFake,
        Id: `${index}`,
        Key: `${index}`,
      };
      reponse.data.push(newObject);
    }
    return reponse;
  },

  /**
   * ÁP dụng cho text search
   * @param {*} func Function cần debounce
   * @param {*} timeout Thời gian delay
   */
  debounce: (func, timeout = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  },
};

export default commonFunc;
