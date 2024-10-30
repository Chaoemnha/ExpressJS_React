
const { ObjectId } = require('mongodb');

class BaseModel {
    constructor(name) {
        this.collection = process.app.db.collection(name);
    }

    async new(dataInput) {
        this.setDataRaw(dataInput);
        const result = await this.collection.insertOne(this.getDataRaw());
        return result;
    }

    async edit(_id, dataInput) {
        this.setDataRaw(dataInput);
        const { _id: unusedId, ...updateData } = this.getDataRaw(); // Loại bỏ trường _id
        const result = await this.collection.updateOne({ _id: new ObjectId(_id) }, { $set: updateData })
        return result;
    }

    async delete(_id) {
        const result = await this.collection.deleteMany({ _id: new ObjectId(_id) });
        return result;
    }

    async getAll() {
        const results = await this.collection.find({}).toArray();
        return results;
    }
}

module.exports = BaseModel;