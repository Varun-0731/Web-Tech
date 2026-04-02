import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserForm from "./UserForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserForm />
  </StrictMode>
);