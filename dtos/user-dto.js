module.exports = class UserDto {
   email;
   nickName;
   id;
   isActivated;

   constructor(model) {
       this.email = model.email;
       this.nickName = model.nickName;
       this.id = model.id;
       this.isActivated = model.isActivated;
   }
}