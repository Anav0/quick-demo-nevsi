export class StorageService {
  save(key: string, object: object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  load(key: string) {
    return localStorage.getItem(key);
  }
}
