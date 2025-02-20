import { type Menu } from "@/stores/menu";

const menu: Array<Menu | "divider"> = [
  {
    icon: "Home",
    pageName: "dashboard-overview-1",
    title: "მთავარი",
    categories: [2, 3, 4, 5, 6],
  },
  {
    icon: "UsersIcon",
    pageName: "users-layout",
    title: "აღმწერები",
    categories: [2],
  },
  {
    icon: "UsersIcon",
    pageName: "users-layout",
    title: "ზედამხედველები",
    categories: [3, 4, 5],
  },
  {
    icon: "MapIcon",
    pageName: "observer-map",
    title: "რუკა",
    categories: [2, 3, 4, 5, 6],
  },
  // ზედა რგოლი
  {
    icon: "UsersIcon",
    pageName: "personnel",
    title: "პერსონალი",
    categories: [4],
  },
  {
    icon: "Trash2Icon",
    pageName: "delete-house",
    title: "შენობების წაშლა",
    categories: [3],
  },
  {
    icon: "RepeatIcon",
    pageName: "questionaire-transfer",
    title: "კითხვარების გადატანა",
    categories: [3],
  },
  {
    icon: "DatabaseIcon",
    pageName: "questionnaire-level-control",
    title: "ხარისხის კონტროლი",
    categories: [2],
  },

  // {
  //   icon: "GridIcon",
  //   pageName: "region-info",
  //   title: "ინფორმაცია",
  //   categories: [6],
  // },
  {
    icon: "PieChartIcon",
    pageName: "admin-charts",
    title: "გრაფიკები",
    categories: [6],
  },
  {
    icon: "UserPlusIcon",
    pageName: "add-user",
    title: "იუზერის დამატება",
    categories: [6],
  },
  {
    icon: "SearchIcon",
    pageName: "search-respodent",
    title: "რესპოდენტის ძებნა",
    categories: [6],
  },
  {
    icon: "DatabaseIcon",
    pageName: "questionnaire-control",
    title: "ხარისხის კონტროლი",
    categories: [3, 4, 5, 6],
  },

  {
    icon: "GridIcon",
    pageName: "information",
    title: "ინფორმაცია",
    categories: [6, 5, 4, 3, 2],
  },
  {
    icon: "MonitorIcon",
    pageName: "self-registration",
    title: "თვითრეგისტრაცია",
    categories: [6],
  },
  {
    icon: "HardDriveIcon",
    pageName: "restore-base",
    title: "ბაზის აღდგენა",
    categories: [4, 5, 6],
  },
  // {
  //   icon: "GlobeIcon",
  //   pageName: "settlements-information",
  //   title: "დასახლებები",
  //   categories: [5, 6],
  // },
  {
    icon: "DownloadIcon",
    pageName: "export-daily-report",
    title: "ჩამოტვირთვა",
    categories: [4],
  },
];

export default menu;
