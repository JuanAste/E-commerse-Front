import { useState } from "react";
import styled from "styled-components";
import imageErr404 from "../../Images/error 404.png";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageButtons = styled.div`
  display: flex;
  flex-direction: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
        border-color:#ccc;
    `
      : `
    border-color:transparent;
    `}
  border-radius: 5px;
  height: 40px;
  padding: 2px;
  cursor: pointer;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="" />
      </BigImageWrapper>
      <ImageButtons>
        {images.length ? (
          images?.map((image) => (
            <ImageButton
              active={image === activeImage}
              key={image}
              onClick={() => setActiveImage(image)}
            >
              <Image src={image || imageErr404.src} alt="" />
            </ImageButton>
          ))
        ) : (
          <Image src={imageErr404.src} alt="" />
        )}
      </ImageButtons>
    </>
  );
}
