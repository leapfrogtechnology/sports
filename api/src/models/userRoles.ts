import dynamoose, { Schema } from 'dynamoose';

import TABLES from '../constants/tables';

const schema = new Schema({
  id: { type: Number, required: true, hashKey: true },
  name: { type: String, required: true }
});

export default dynamoose.model(TABLES.USER_ROLES, schema);
