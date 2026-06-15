import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source) => {
  return builder.image(source);
};

export const getSanityImageUrl = (
  image,
  width = 1200,
  height = 800,
  quality = 75
) => {
  if (!image) return "";

  return builder
    .image(image)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .quality(quality)
    .url();
};

export const urlForImage = urlFor;