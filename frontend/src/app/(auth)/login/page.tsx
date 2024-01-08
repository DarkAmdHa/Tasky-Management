import LoginForm from "@/app/ui/Forms/LoginForm";
import axios from "axios";
import { cookies as SSS, headers } from "next/headers";

export default function page() {
  return <LoginForm />;
}
