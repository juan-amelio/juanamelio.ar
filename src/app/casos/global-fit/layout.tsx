import { MarcoCaso } from "@/components/casos/MarcoCaso";

export default function Layout({ children }: LayoutProps<"/casos/global-fit">) {
  return <MarcoCaso slug="global-fit">{children}</MarcoCaso>;
}
