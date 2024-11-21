import { useSelector } from "react-redux"; // Correction : Import unique
import { Outlet, Navigate } from "react-router-dom"; // Importation correcte

export default function PrivateRoute() {
  // Correction : Ajout d'un `return` explicite dans useSelector
  const { currentUser } = useSelector((state) => state.user);

  // Vérifie si l'utilisateur est connecté
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
