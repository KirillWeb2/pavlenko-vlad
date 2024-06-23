import React from "react";
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">О нас</h1>
        <hr />
        <p className="lead text-center">
          Наша компания специализируется на производстве высококачественных
          кованых изделий, воплощая в металле самые смелые и изысканные идеи. Мы
          предлагаем широкий спектр продукции, включая ворота, заборы, перила,
          мебель и декоративные элементы. Сочетая традиционные ремесленные
          техники с современными технологиями, наши мастера создают уникальные
          изделия, которые отличаются прочностью, эстетической
          привлекательностью и долговечностью. Мы гордимся своей репутацией и
          несем полную ответственность за качество каждого произведенного нами
          изделия. Ваши пожелания и требования – наш главный приоритет, и мы
          готовы реализовать проекты любой сложности, чтобы украсить и
          обезопасить ваш дом или бизнес.
        </p>

        <hr className="my-4" />
        <p className="lead text-center">email: hummerstore2024@mail.ru</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.5610379517784!2d131.95207847666987!3d43.802720871095325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5fb2e8143a88b059%3A0x1b40aecddcc85e1e!2sUlitsa%20Lenina%2C%20136%2C%20Ussuriysk%2C%20Primorskiy%20kray%2C%20692525!5e0!3m2!1sen!2sru!4v1719108554143!5m2!1sen!2sru"
          width={"100%"}
          height={450}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
