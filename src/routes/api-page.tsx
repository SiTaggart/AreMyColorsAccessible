import { createFileRoute } from "@tanstack/react-router";
import APIPage from "../../components/api-page";

export const Route = createFileRoute("/api-page")({
  component: APIPage,
});
