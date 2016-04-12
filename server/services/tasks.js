import shortid from 'shortid';

export default class Tasks {

  static list = {};

  static create(name, type) {
    let id = shortid.generate();
    Tasks.list[id] = {
      name: name,
      type: type,
      percent: 0,
      status: false
    };
    return id;
  }

  static run(id) {
    Tasks.list[id].status = true;
  }

  static stop() {
    Tasks.list[id].status = false;
  }
}
