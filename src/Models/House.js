export class House {
  constructor(data = {}){
this.id = data.id
this.year = data.year 
this.price = data.price 
this.imgUrl = data.imgUrl
this.sqFt = data.sqFt
this.creatorId = data.creatorId
this.creator = data.creator || {}
  }
}