import { useSelector } from "react-redux"; // Correction : Import unique
import { Outlet, Navigate } from "react-router-dom"; // Importation correcte

export default function OnlyAdminPrivateRoute() {
  // Correction : Ajout d'un `return` explicite dans useSelector
  const { currentUser } = useSelector((state) => state.user);
  
  // Vérifie si l'utilisateur est connecté
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
}
