import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { authRoutes, publicRoutes } from "./routes/routes";
import Context from "./index";
import { checkJWT } from "./http/userApi";
import Confirm from "./components/Confirm";

const App = () => {
  const context = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkJWT()
      .then(() => {
        user.setIsAuth(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (context === null) {
    return <>Loading...</>;
  }

  const { user } = context;

  const renderPages = (isAuth: boolean) => {
    const routes = isAuth ? [...authRoutes, ...publicRoutes] : publicRoutes;
    return (
      <>
        {routes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                {" "}
                <Component user={user} />
              </>
            }
          />
        ))}
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        {renderPages(user.isAuth)}
      </Route>
      <Route path="/confirm/:id" element={<Confirm />} />
    </Routes>
  );
};

export default App;
