// Centralized stadium assets and metadata

import grandStadeTanger from "./grand_stade_de_tanger01.jpg";
import grandStadeMarrakesh from "./grand_stade_marrakesh.jpg";
import stadiumConstruction from "./stadium-construction.jpg";
import rabatStadium from "./rabat-stadium.jpg";

export const STADIUM_IMAGES = {
  grandStadeTanger,
  grandStadeMarrakesh,
  stadiumConstruction,
  rabatStadium,
};

export type StadiumId =
  | "grand-stade-tanger"
  | "grand-stade-marrakesh"
  | "new-stadium-casablanca"
  | "grand-stade-rabat"
  | "stade-de-fes"
  | "stade-adrar-agadir";

export interface StadiumMeta {
  id: StadiumId;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  capacity: number;
  image: string;
  status: "Ready" | "Under Construction";
  statusAr: string;
}

export const STADIUMS: StadiumMeta[] = [
  {
    id: "grand-stade-tanger",
    name: "Grand Stade de Tanger",
    nameAr: "الملعب الكبير لطنجة",
    city: "Tangier",
    cityAr: "طنجة",
    capacity: 65000,
    image: STADIUM_IMAGES.grandStadeTanger,
    status: "Ready",
    statusAr: "جاهز",
  },
  {
    id: "grand-stade-marrakesh",
    name: "Grand Stade de Marrakesh",
    nameAr: "الملعب الكبير لمراكش",
    city: "Marrakesh",
    cityAr: "مراكش",
    capacity: 45000,
    image: STADIUM_IMAGES.grandStadeMarrakesh,
    status: "Ready",
    statusAr: "جاهز",
  },
  {
    id: "new-stadium-casablanca",
    name: "New Stadium Benslimane",
    nameAr: "الملعب الجديد لبنسليمان",
    city: "Benslimane",
    cityAr: "بنسليمان",
    capacity: 80000,
    image: STADIUM_IMAGES.stadiumConstruction,
    status: "Under Construction",
    statusAr: "قيد الإنشاء",
  },
  {
    id: "grand-stade-rabat",
    name: "Grand Stade de Rabat",
    nameAr: "الملعب الكبير للرباط",
    city: "Rabat",
    cityAr: "الرباط",
    capacity: 52000,
    image: STADIUM_IMAGES.rabatStadium,
    status: "Ready",
    statusAr: "جاهز",
  },
  {
    id: "stade-de-fes",
    name: "Stade de Fès",
    nameAr: "ملعب فاس",
    city: "Fès",
    cityAr: "فاس",
    capacity: 40000,
    image: STADIUM_IMAGES.stadiumConstruction,
    status: "Under Construction",
    statusAr: "قيد الإنشاء",
  },
  {
    id: "stade-adrar-agadir",
    name: "Stade Adrar",
    nameAr: "ملعب أدرار",
    city: "Agadir",
    cityAr: "أكادير",
    capacity: 45000,
    image: STADIUM_IMAGES.grandStadeMarrakesh,
    status: "Under Construction",
    statusAr: "قيد الإنشاء",
  },
];

export default STADIUMS;
