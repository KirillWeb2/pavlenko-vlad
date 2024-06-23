import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Store } from "react-notifications-component";

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Неверный формат почты")
        .required("Обязательное поле!"),
      name: Yup.string().required("Обязательное поле!"),
      message: Yup.string().required("Обязательное поле!"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, name, message } = values;
        setIsLoading(true);
        await axios.post("https://pavlenko-server.vercel.app/api/contact", {
          email,
          name,
          message,
        });

        formik.resetForm();
        Store.addNotification({
          title: "Отлично!",
          message: "Мы ответим вам на почту в течении суток",
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
      } catch (error) {
        console.log("ошибка");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  console.log(formik)
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Свяжитесь с нами</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={formik.handleSubmit} noValidate>
              <div class="form my-3">
                <label for="name">Имя</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Напишите своё имя"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div
                    style={{ display: "block" }}
                    className="invalid-feedback"
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div class="form my-3">
                <label for="email">Почта</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
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
              <div class="form  my-3">
                <label for="message">Сообщение</label>
                <textarea
                  rows={5}
                  class="form-control"
                  id="message"
                  placeholder="Текст вашего сообщения"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                {formik.errors.message && formik.touched.message ? (
                  <div
                    style={{ display: "block" }}
                    className="invalid-feedback"
                  >
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                  disabled={isLoading || !formik.isValid}
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
