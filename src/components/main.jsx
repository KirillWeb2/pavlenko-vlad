import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay shadow-custom d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                Изготовка кованых изделий
              </h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Наша компания изготавливает кованые изделия любой сложности и
                гарантирует высокое качество. Мы несем ответственность за каждый
                наш продукт!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
