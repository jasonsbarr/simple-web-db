export class DB {
  constructor(data = {}) {
    if (localStorage.getItem("data")) {
      this.data = JSON.parse(localStorage.getItem("data"));
    } else {
      this.data = data;
    }
  }

  static create(data = {}) {
    return new DB(data);
  }

  /**
   * For getting a DB table, which is an array, by name
   * @param {string} tableName
   * @returns {any[]}
   */
  getTable(tableName) {
    return this.data[tableName];
  }

  /**
   * For getting a meta-field from the DB
   * @param {string} key
   * @returns {any}
   */
  getMeta(key) {
    return this.data[key];
  }

  save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }
}
