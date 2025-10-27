import mongoose from "mongoose";
import IURL from "../interfaces/url";
import IMetadata from "../interfaces/metadata";

const MetadataSchema = new mongoose.Schema<IMetadata>({
  site_name: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  title: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  image: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  image_alt: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  video: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  audio: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  url: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
})

const URLSchema = new mongoose.Schema<IURL>({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  shortenedUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  metadata: {
    type: MetadataSchema,
    required: false,
    unique: false
  }
}, { timestamps: true, collection: "urls" });

const URLModel = mongoose.model<IURL>("URL", URLSchema);

export default URLModel;
