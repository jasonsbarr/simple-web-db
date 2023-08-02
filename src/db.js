import { createId } from "@paralleldrive/cuid2";

export class DB {
  constructor(data = {}) {
    if (localStorage.getItem("data")) {
      this._data = JSON.parse(localStorage.getItem("data"), (key, value) => {
        if (key.toLowerCase().includes("date")) {
          return new Date(value);
        }
        return value;
      });
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
      toAdd = {
        ...item,
        id: createId(),
        createdDate: new Date(),
        updatedDate: new Date(),
      };
    } else {
      toAdd = {
        value: item,
        id: createId(),
        createdDate: new Date(),
        updatedDate: new Date(),
      };
    }
    t.push(toAdd);
    this.save();
  }

  delete(table, pred) {
    let t = this.getTable(table);
    t = t.filter((item) => !pred(item));
    this.setTable(table, t);
  }

  get(table, finder) {
    return this._data[table].find(finder);
  }

  getMeta(key) {
    return this._data[key];
  }

  getTable(tableName) {
    return this._data[tableName];
  }

  save() {
    localStorage.setItem("data", JSON.stringify(this._data));
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
      let newTable = [
        ...t.slice(0, i),
        { ...t[i], ...updated, updatedDate: new Date() },
        ...t.slice(i),
      ];
      this.setTable(table, newTable);
    }
  }
}
