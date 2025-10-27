import IMetadata from "./metadata";

export default interface IURL {
  originalUrl: string;
  shortenedUrl: string;
  metadata?: IMetadata;
}
