import React from "react";
import '../../styles/carrusel-imagenes.css';

export const Carrusel = () => {
  const images = [
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727543941/D23FBC35-C386-47C9-AD69-6E2AFF1443D2-1024x604_wif9av.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544124/20221219_154917_0000_sg8hyu.png",
    "https://i0.wp.com/www.pachaindah.com/html/locales-eventos-lima.jpg?resize=798%2C442&ssl=1",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544187/9323706488_7c288a9659_b_urc1pd.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544212/Alberto-Granados-hablando-frente-al-publico-de-la-plenaria-en-Microsoft-Envision-AI-Connection-1200x630_yaiokc.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544276/Evento-corporativo-e1661944165280-1900x1069_iui3cl.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544334/evento-corporativo-imgpost_fdtstd.jpg",
    "https://i0.wp.com/www.pachaindah.com/html/locales-eventos-lima.jpg?resize=798%2C442&ssl=1",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544276/Evento-corporativo-e1661944165280-1900x1069_iui3cl.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544187/9323706488_7c288a9659_b_urc1pd.jpg",
    "https://res.cloudinary.com/da2fsfcsn/image/upload/v1727544212/Alberto-Granados-hablando-frente-al-publico-de-la-plenaria-en-Microsoft-Envision-AI-Connection-1200x630_yaiokc.jpg"
  ];
  let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      strech: 0,
      depth: 300,
      modifier: 1,
      slideShadow: true,
    },
    loop: true,
  })
  return (
    <div className="swiper mySwiper my-3">
      {images.length > 0 && (
        <div className="swiper-wrapper">
          {images.map((image, index) => (
            <div className="swiper-slide" key={index}>
              <img className="img-carrusel" src={image} alt={`image-${index}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};