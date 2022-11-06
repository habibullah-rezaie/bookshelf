import { Resource, createResource } from "src/api/resource";

export type ImgProps = React.ComponentProps<"img"> & {};

function preloadImg(src: string) {
	return new Promise((resolve) => {
		const newImg = document.createElement("img");
		newImg.src = src;
		newImg.onload = (_) => {
			resolve(src);
		};
	});
}

const imageResourceCaches: { [key: string]: Resource<string> } = {};

function Img({ src = "", alt, ...props }: ImgProps) {
	let imgResource = imageResourceCaches[src];
	if (!imgResource) {
		imgResource = createResource(preloadImg(src));
		imageResourceCaches[src] = imgResource;
	}

	return <img src={imgResource.read()} alt={alt} {...props} />;
}

export default Img;
