const { ObjectId } = require("mongodb");

class TheoDoiMuonSachService {
    constructor(client) {
        this.TheoDoiMuonSach = client.db().collection("TheoDoiMuonSach");
    }

    extractContactData(payload) {
        const muonSach = {
            MADOCGIA: payload.MADOCGIA,
            MASACH: payload.MASACH,
            NGAYMUON: payload.NGAYMUON,
            NGAYTRA: payload.NGAYTRA,
            TRANGTHAI:payload.TRANGTHAI
        };
        Object.keys(muonSach).forEach(
            (key) => muonSach[key] === undefined && delete muonSach[key]
        );
        return muonSach;
    }

    async create(payload) {
        const muonSach = this.extractContactData(payload);
        muonSach.NGAYMUON = new Date().toLocaleString();
        muonSach.NGAYTRA = null; 
        muonSach.TRANGTHAI = 0;
        const result = await this.TheoDoiMuonSach.insertOne(muonSach); 
        return result.insertedId;
    }
    
    async find(filter){
        const cursor = await this.TheoDoiMuonSach.find(filter);
        return await cursor.toArray();
    }

    async findById(id){
        return await this.TheoDoiMuonSach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }
   async duyet(id) {
        const muonSach= { };
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(muonSach);
       update.TRANGTHAI = 1;
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async tra(id, payload) {
        const muonSach= { };
         
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(muonSach);
        update.NGAYTRA =  new Date().toLocaleString();
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }
    async update(id,payload){
        const filter ={
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update =  this.extractContactData(payload);
        const result = await this.TheoDoiMuonSach.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument:"after"}
        );
        return result;
    }

}

module.exports = TheoDoiMuonSachService;
