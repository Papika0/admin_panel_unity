import { type Menu } from "@/stores/menu";

const menu: Array<Menu | "divider"> = [
  {
    icon: "Home",
    pageName: "dashboard-overview-1",
    title: "მთავარი",
  },
  {
    icon: "FileTextIcon",
    pageName: "translations-editor",
    title: "ტექსტები",
  },
  {
    icon: "LayersIcon",
    pageName: "projects",
    title: "პროექტები",
  },
];

export default menu;
