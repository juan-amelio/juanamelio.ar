import { MarcoCaso } from "@/components/casos/MarcoCaso";

export default function Layout({ children }: LayoutProps<"/casos/forge-studio">) {
  return <MarcoCaso slug="forge-studio">{children}</MarcoCaso>;
}
