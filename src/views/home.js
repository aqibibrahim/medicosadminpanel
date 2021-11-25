import React from "react";

const Home = ({ loading, error }) => {
  //dispatch
  // const dispatch = useDispatch();

  // const onFormSubmitHandler = (values) => {
  //   //auth api
  //   console.log(values);
  //   const api = axios.post(
  //     '/admin-auth/login',
  //     values
  //   );

  //   api
  //     .then((resp) => {
  //       if (resp.data) dispatch(loginUser(data, history));
  //     })
  //     .catch((err) => dispatch(loginUser(data, history)));
  // };

  return <div>home</div>;
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Home);
