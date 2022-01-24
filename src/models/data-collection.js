'use strict';

class DataCollections {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({where: {id}});
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne({where: {id}})
      .then((record)=>{
        return record.update(data);
      });
  }

  delete(id) {
    return this.model.destroy({where:{id}});
  }
}

module.exports = DataCollections;