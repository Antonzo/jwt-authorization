class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id; // _id is a special field in MongoDB
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;