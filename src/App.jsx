import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Login } from "./components/Login";
import { Todos } from "./components/Todos";
import { AuthProvider } from "./contexts/AuthProvider";
import { TodosProvider } from "./contexts/TodosProvider";

function App() {
  return (
    <AuthProvider>
      <TodosProvider>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Todos} />
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
      </TodosProvider>
    </AuthProvider>
  );
}

export default App;
