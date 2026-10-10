import { MarcoCaso } from "@/components/casos/MarcoCaso";

export default function Layout({ children }: LayoutProps<"/casos/a7-sports">) {
  return <MarcoCaso slug="a7-sports">{children}</MarcoCaso>;
}
