import { createId } from "@paralleldrive/cuid2";

export class DB {
  constructor(data = {}) {
    if (localStorage.getItem("data")) {
      this._data = JSON.parse(localStorage.getItem("data"));
    } else {
      this._data = data;
    }
  }

  static create(data = {}) {
    return new DB(data);
  }

  get data() {
    return this._data;
  }

  add(table, item) {
    const t = this.getTable(table);
    let toAdd;
    if (typeof item === "object") {
      toAdd = { ...item, id: createId() };
    } else {
      toAdd = { value: item, id: createId() };
    }
    t.push(toAdd);
    this.save();
  }

  delete(table, pred) {
    let t = this.getTable(table);
    t = t.filter((item) => !pred(item));
    this._data[table] = t;
    this.save();
  }

  /**
   * For getting a meta-field from the DB
   * @param {string} key
   * @returns {any}
   */
  getMeta(key) {
    return this.data[key];
  }

  /**
   * For getting a DB table, which is an array, by name
   * @param {string} tableName
   * @returns {any[]}
   */
  getTable(tableName) {
    return this.data[tableName];
  }

  save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }

  setMeta(key, item) {
    this.data[key] = item;
    this.save();
  }

  setTable(key, array) {
    this.data[key] = array;
    this.save();
  }
}
