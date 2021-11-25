import React, { useState } from "react";
import { Row, Card, CardTitle, FormGroup, Label, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "redux/actions";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import { Field, Form, Formik } from "formik";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
const Register = ({ history, registerUserAction }) => {
  const [email] = useState("");
  const [password] = useState("");
  const [fullname] = useState("");
  const initialValues = { email, password, fullname };

  const onUserRegister = (values) => {
    console.log("values", values);
    registerUserAction(values, history);
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.fullname" />
                    </Label>
                    <Field className="form-control" name="fullname" />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
                    <Button color="primary" className="btn-shadow" size="lg">
                      <IntlMessages id="user.register-button" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
