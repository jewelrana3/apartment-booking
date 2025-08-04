import Image from "next/image";

const Gallery = ({ gallery }) => {
  const newGallery = [...gallery];
  newGallery.shift();
  return (
    <section className="container">
      <div className="grid grid-cols-2 ">
        <Image
          src={gallery[0]}
          className="h-[400px] object-cover w-full"
          alt="Main Pic"
          width={400}
          height={400}
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {newGallery.map((image) => (
            <Image
              key={image}
              src={image}
              className="  h-full min-h-full w-full min-w-full object-cover"
              alt="Sub Pics"
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
