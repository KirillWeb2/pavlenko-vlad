import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Store } from "react-notifications-component";
import { clearCart } from "../redux/action";

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Нет изделий в корзине</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Вернуться к выбору
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let subtotal = 0;
    let shipping = 1000.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    const formik = useFormik({
      initialValues: {
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        card_number: "",
        card_period: "",
        card_cvv: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Неверный формат почты")
          .required("Обязательное поле!"),
        firstname: Yup.string().required("Обязательное поле!"),
        lastname: Yup.string().required("Обязательное поле!"),
        address: Yup.string().required("Обязательное поле!"),
        card_number: Yup.string().required("Обязательное поле!"),
        card_period: Yup.string().required("Обязательное поле!"),
        card_cvv: Yup.string()
          .required("Обязательное поле!")
          .max(3, "Не более 3 символов"),
      }),
      onSubmit: async (values) => {
        try {
          const {
            lastname,
            firstname,
            email,
            address,
            card_number,
            card_period,
            card_cvv,
          } = values;
          setIsLoading(true);
          await axios.post("https://pavlenko-server.vercel.app/api/order", {
            lastname,
            firstname,
            email,
            address,
            card_number,
            card_period,
            card_cvv,
          });

          formik.resetForm();
          dispatch(clearCart());
          Store.addNotification({
            title: "Отлично!",
            message: "Заказ создан",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          navigate("/");
        } catch (error) {
          console.log("ошибка");
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      },
    });

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Итог заказа</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Изделий ({totalItems})<span>{Math.round(subtotal)} ₽</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Доставка
                      <span>{shipping} ₽</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Суммарная стоимость</strong>
                      </div>
                      <span>
                        <strong>{Math.round(subtotal + shipping)} ₽</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Заполните данные для заказа</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label for="firstname" className="form-label">
                          *Имя
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Имя"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.firstname && formik.touched.firstname ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.firstname}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastname" className="form-label">
                          *Фамилия
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          placeholder="Фамилия"
                          value={formik.values.lastname}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.lastname && formik.touched.lastname ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.lastname}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          *Почта
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          *Адрес
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Приморский Край, г. Уссурийск. ул. Центральная, д. 2"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.address && formik.touched.address ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.address}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Оплата</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="card_number" className="form-label">
                          *Номер карты
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="card_number"
                          placeholder=""
                          value={formik.values.card_number}
                          onChange={formik.handleChange}
                        />
                        <small className="text-muted">
                          Полный номер, указанный на карте.
                        </small>
                        {formik.errors.card_number &&
                        formik.touched.card_number ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.card_number}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <label for="card_period" className="form-label">
                          *Срок действия
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="card_period"
                          placeholder="05/25"
                          value={formik.values.card_period}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.card_period &&
                        formik.touched.card_period ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.card_period}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-md-3">
                        <label for="card_cvv" className="form-label">
                          *CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="card_cvv"
                          placeholder=""
                          value={formik.values.card_cvv}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.card_cvv && formik.touched.card_cvv ? (
                          <div
                            style={{ display: "block" }}
                            className="invalid-feedback"
                          >
                            {formik.errors.card_cvv}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-primary "
                      type="submit"
                      disabled={!formik.isValid || isLoading}
                    >
                      {isLoading ? "Загрузка..." : "Оформить"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Оформление</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
