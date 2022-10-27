const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        phonenumber: {
          type: String,
          required: true
        },
        username: {
          type: String,
          unique: true,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        state: String,
        beta: Boolean,
        usertype: String,
        active: Boolean
      },
      { timestamps: true }
    );

    schema.plugin(uniqueValidator);

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const User = mongoose.model("User", schema);

    return User;
};
