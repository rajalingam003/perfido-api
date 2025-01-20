import { Schema } from 'mongoose';

export const idPropertyPlugin = (schema: Schema) => {
  schema.virtual('id').get(function () {
    return this._id;
  });
};
