const STORAGE_KEY = "H5_COLLECTIONS_KEY";
const localStorage = window.localStorage;

function getLocalDBInstance() {
  let db;
  try {
    const localDBString: string = localStorage.getItem(STORAGE_KEY) || "{}";
    db = JSON.parse(localDBString);
  } catch (error) {
    console.error("fetch local db instance fail");
  }
  return db;
}

function sync(db = {}) {
  try {
    const localDBString = JSON.stringify(db);
    localStorage.setItem(STORAGE_KEY, localDBString);
  } catch (error) {
    console.error("parse local db fail");
  }
}

export function setItem(key: number | string, value: unknown): void {
  try {
    const db = getLocalDBInstance() || {};
    db[key] = value;
    sync(db);
  } catch (error) {
    console.error("storage setItem fail");
  }
}

export function removeItem(key: number | string): boolean {
  try {
    const db = getLocalDBInstance();
    if (db) {
      delete db[key];
    }
    sync(db);
    return true;
  } catch (error) {
    console.error(error, "storage removeItem fail");
    return false;
  }
}

export function getItem(key: number | string): any {
  let result;
  try {
    const db = getLocalDBInstance();
    result = db[key];
  } catch (error) {
    console.log("local db key 不存在");
  }
  return result;
}
