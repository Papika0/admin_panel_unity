export const yesNo = (value: boolean): string => {
  if (value === null) return "არ შეივსო";
  return value ? "დიახ" : "არა";
};

export const healthStatus = (value: number | null): string => {
  switch (value) {
    case 1:
      return "საერთოდ არა";
    case 2:
      return "ნაწილობრივ";
    case 3:
      return "მნიშვნელოვნად";
    case 4:
      return "სრულად";
    default:
      return "--";
  }
};

type AllowedIcon = "PlusIcon" | "CircleIcon" | "MapPinIcon";
interface BuildingStatus {
  id: number;
  name: string;
  color: string;
  icon: AllowedIcon;
  iconColor: string;
  show: boolean;
}
export const buildingStatus: BuildingStatus[] = [
  {
    id: 0,
    name: "საწყისი",
    color: "bg-danger",
    icon: "PlusIcon",
    iconColor: "text-danger",
    show: true,
  },
  {
    id: 1,
    name: "დაწყებული",
    color: "bg-warning",
    icon: "PlusIcon",
    iconColor: "text-warning",
    show: true,
  },
  {
    id: 2,
    name: "დასრულებული",
    color: "bg-success",
    icon: "PlusIcon",
    iconColor: "text-success",
    show: true,
  },
  {
    id: 3,
    name: "უკანდაბრუნებული",
    color: "bg-danger",
    icon: "CircleIcon",
    iconColor: "text-danger",
    show: true,
  },
  {
    id: 4,
    name: "მოთხოვნა წაშლაზე",
    color: "bg-gray-500",
    icon: "PlusIcon",
    iconColor: "text-dark",
    show: true,
  },
  {
    id: 5,
    name: "წაშლილი",
    color: "bg-dark",
    icon: "PlusIcon",
    iconColor: "text-dark",
    show: true,
  },
  {
    id: 7,
    name: "არასაცხოვრებელი",
    color: "bg-success",
    icon: "CircleIcon",
    iconColor: "text-success",
    show: true,
  },
  {
    id: 9,
    name: "მოთხოვნა წაშლაზე",
    color: "bg-gray-500",
    icon: "PlusIcon",
    iconColor: "text-dark",
    show: false,
  },
];

export const buildingStatusName = (id: number): string => {
  if (id == 8) {
    id = 3;
  }
  const status = buildingStatus.find((status) => status.id == id);
  return status ? status.name : "";
};

export const buildingStatusColor = (id: number): string => {
  if (id == 8) {
    id = 3;
  }
  const status = buildingStatus.find((status) => status.id == id);
  return status ? status.color : "";
};

export const questionnaireStatus = [
  { id: 15, name: "ყველა", color: "warning" },
  { id: 1, name: "დასრულებული", color: "bg-primary" },
  { id: 7, name: "განმეორებითი ვიზიტი", color: "bg-pending" },
  { id: 0, name: "დაუსრულებელი", color: "bg-yellow-300" },
  { id: 4, name: "დადასტურებული", color: "bg-success" },
  { id: 2, name: "უარყოფილი", color: "bg-danger" },
  { id: 5, name: "მოთხოვნა წაშლაზე", color: "bg-gray-500" },
  { id: 6, name: "წაშლილი", color: "bg-dark" },
  { id: 8, name: "მუდმივად ცხოვრობს მოსახლეობა", color: "bg-pending" },
  { id: 9, name: "არაძირითადი საცხოვრებელი", color: "bg-pending" },
  { id: 10, name: "არ ცხოვრობს მოსახლეობა", color: "bg-pending" },
  { id: 32, name: "თვითრეგისტრაცია", color: "bg-pending" },
  // { id: 3, name: "უკანდაბრუნებული", color: 'danger' },
  // { id: 11, name: "დაუდგენელი", color: "bg-pending" },
];

export const questionnaireStatusFilter = [
  { id: 15, name: "ყველა" },
  { id: 8, name: "დაუსრულებელი" },
  { id: 1, name: "დასრულებული" },
  { id: 2, name: "უარყოფილი" },
  { id: 4, name: "დადასტურებული" },
  { id: 5, name: "მოთხოვნა წაშლაზე" },
  { id: 6, name: "წაშლილი" },
  { id: 7, name: "განმეორებითი ვიზიტი" },
];

export const dwellingType = [
  { id: 0, name: "ყველა" },
  { id: 1, name: "ინდივიდუალური სახლი" },
  {
    id: 2,
    name: 'იზოლირებული (ცალკე) ბინა (მრავალბინიან შენობაში ან "იტალიურ ეზოში")',
  },
  {
    id: 3,
    name: "საცხოვრებლად გამოყენებული არასაცხოვრისი (სკოლა, კაპიტალური ავტოფარეხი, საწარმო და ა.შ)",
  },
  { id: 4, name: "სხვაგვარი საცხოვრისი (კარავი, გემი, ნავი და ა.შ)" },
  { id: 5, name: "სასტუმრო, დასასვენებელი სახლი" },
  {
    id: 6,
    name: "საერთო საცხოვრებელი (მუშა-მოსამსახურეთა, სტუდენტთა და მოსწავლეთა საერთო საცხოვრებელი)",
  },
  {
    id: 7,
    name: "ინსტიტუციური დაწესებულება (ხანდაზმულთა და შეზღუდული შესაძლებლობების მქონე პირთა, ჩვილ ბავშვთა ან საბავშვო სახლში, ობოლ და მშობლების მზრუნველობას მოკლებულ ბავშვთა სკოლა-ინტერნატში და სხვა მსგავს დაწესებულებებში)",
  },
  { id: 8, name: "ეკლესია, მონასტერი" },
  { id: 9, name: "უსახლკარო" },
];

export const dwellingStatus = [
  { id: 0, name: "ყველა" },
  { id: 1, name: "მუდმივად ცხოვრობს მოსახლეობა" },
  { id: 2, name: "არაძირითადი საცხოვრებელი" },
  { id: 3, name: "არ ცხოვრობს მოსახლეობა" },
];

export const questionnaireStatusName = (id: number): string => {
  const status = questionnaireStatus.find((status) => status.id == id);
  return status ? status.name : "";
};

export const questionnaireStatusColor = (id: number): string => {
  const status = questionnaireStatus.find((status) => status.id == id);
  return status ? status.color : "";
};

export const surveyType = [
  { id: 5, name: "ყველა" },
  { id: 0, name: "CAWI", color: "bg-primary" },
  { id: 1, name: "CAPI", color: "bg-pending" },
  { id: 2, name: "CAPI (შევსებულია სხვა აღმწერის მიერ)", color: "bg-warning" },
];

export const surveyTypeByFilter = [
  { id: 5, name: "ყველა" },
  { id: 3, name: "CAWI", color: "bg-primary" },
  { id: 1, name: "CAPI", color: "bg-pending" },
];
