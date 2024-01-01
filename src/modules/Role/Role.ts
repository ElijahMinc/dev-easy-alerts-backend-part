import { model, Schema } from "mongoose";

import { Roles } from "../../constants";

const Role = new Schema({
   value: {
      type: String, 
      unique: true, 
      default: Roles.ADMIN
   },
});


export default model('Role', Role);