const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const orgServiceSchema = new Schema({
  categorie: { type: String, required: false },
  category: { type: String, required: false },
  subCategorie: { type: String, required: false },
  subCategory: { type: String, required: false },
  acronym: { type: String, required: false },
  organisation: { type: String, required: false },
  organization: { type: String, required: false },
  description: { type: String, required: false },
  location: {
    address: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    metro: { type: String, required: false },
  },
  openHours: { type: String, required: false },
  phone1: { type: String, required: false },
  phone2: { type: String, required: false },
  fax: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  notes: { type: String, required: false },
  dateCreated: { type: Date, required: false },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

module.exports = mongoose.model('OrgService', orgServiceSchema);
