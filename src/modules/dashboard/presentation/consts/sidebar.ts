import { Store, Settings, Home, Users } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    title: "Tienda",
    icon: Store,
    children: [{ title: "Productos", href: "/store/products" }],
  },
  // {
  //   title: "Clientes",
  //   href: "/customers",
  //   icon: Users,
  // },
  {
    title: "Ajustes",
    icon: Settings,
    children: [
      { title: "Marcas", href: "/setting/brands" },
      { title: "Categorías", href: "/setting/categories" },
    ],
  },
];
