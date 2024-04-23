// nxb.services.js
const { ObjectId } = require("mongodb");

class NXBService {
    constructor(client) {
        this.nxbCollection = client.db().collection("nxb");
    }

    extractContactData(payload) {
        const nxb = {
            TENNXB: payload.TENNXB,
            DIACHI: payload.DIACHI,
        };
        Object.keys(nxb).forEach(
            (key) => nxb[key] === undefined && delete nxb[key]
        );
        return nxb;
    }

    async create(payload) {
        const result = await this.nxbCollection.insertOne(payload); 
        return result.insertedId; 
    }

    async find(filter){
        const cursor =await this.nxbCollection.find(filter);
        return await cursor.toArray();
    }
    
    async findByName(name){
        return await this.find({
            TENNXB: {$regex: new RegExp(name), $options:"i"},
        })
    }

    async findById(id){
        return await this.nxbCollection.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }

    async update(id,payload){
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update =  this.extractContactData(payload);
        const result = await this.nxbCollection.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }

    async delete(id){
        const result = await this.nxbCollection.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async findFavorite(){
        return await this.find({favorite: true});   
    }

    async deleteAll(){
        const result= await this.nxbCollection.deleteMany({}) ;
        return result.deletedCount;
    }
}

module.exports = NXBService;
