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
    let t = this.getTable(table);
    let toAdd;
    if (typeof item === "object" && !Array.isArray(item)) {
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
    this.setTable(table, t);
  }

  getMeta(key) {
    return this._data[key];
  }

  getTable(tableName) {
    return this._data[tableName];
  }

  save() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }

  setMeta(key, item) {
    this._data[key] = item;
    this.save();
  }

  setTable(key, array) {
    this._data[key] = array;
    this.save();
  }

  update(table, finder, updated) {
    let t = this._data[table];
    let i = t.findIndex(finder);
    if (i > -1) {
      let newTable = [...t.slice(0, i), { ...t[i], ...updated }, ...t.slice(i)];
      this.setTable(table, newTable);
    }
  }
}
