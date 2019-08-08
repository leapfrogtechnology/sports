import dynamoose, { Schema } from 'dynamoose';

import TABLES from '../constants/tables';

const schema = new Schema({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  profilePictureUrl: String,
  emsEmployeeId: { type: Number, required: true },
  status: { type: String, required: true }
});

export default dynamoose.model(TABLES.EMPLOYEES, schema);
