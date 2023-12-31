import {
  mdiMonitorCellphone,
  mdiFolderOutline,
  mdiShieldCrownOutline,
  mdiCogOutline,
  mdiAdvertisements,
  mdiSaleOutline,
  mdiGoogleCirclesExtended,
} from "@mdi/js";
export const AdminMenu = [
  {
    path: "/admin/products",
    label: "Products",
    name: "product",
    keys: "products",
    icon: mdiMonitorCellphone,
  },
  {
    path: "/admin/category",
    label: "Category",
    name: "category",
    keys: "category",
    icon: mdiFolderOutline,
  },
  {
    path: "/admin/brands",
    label: "Brands",
    name: "brands",
    keys: "brands",
    icon: mdiGoogleCirclesExtended,
  },
  {
    path: "/admin/models",
    label: "Models",
    name: "models",
    keys: "models",
    icon: mdiShieldCrownOutline,
  },
  {
    path: "/admin/sales",
    label: "Sales",
    name: "sales",
    keys: "sales",
    icon: mdiSaleOutline,
  },
];
