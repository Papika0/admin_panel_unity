import _ from "lodash";
import * as L from "leaflet";
import proj4 from "proj4";

declare global {
  interface Window {
    handleNavigation: (address_id: number) => void;
  }
}

const getMarkerColor = (status: number): string => {
  switch (status) {
    case 0:
    case 3:
    case 8:
      return "#ff0000"; // red
    case 1:
      return "#f4e022"; // yellow
    case 2:
    case 7:
      return "#4ef037"; // green
    default:
      return "#17202a"; // dark
  }
};
const colorArray = [
  "#f96d00", //Vivid Orange
  "#00bbf0", //Sky Blue
  "#4ef037", //Lime Green
  "#f70776", //Hot Pink
  "#ff0000", //Red
  "#ffe700", //Bright Yellow
  "#e7455f", //Cherry
  "#1eafed", //Blue
  "#c31207", //Dark Red
  "#34857f", //Teal
];
export const getMapMarkerSvg = (status: number): string => {
  let color = getMarkerColor(status);
  //   _.sample(colorArray);

  let deleteSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- White border path -->
  <path d="M10 2V18M2 10H18" stroke="white" stroke-width="6" stroke-linecap="round" />
  <!-- Original cross path -->
  <path d="M10 2V18M2 10H18" stroke="${color}" stroke-width="3" stroke-linecap="round" />
</svg>`;

  const svg = _.includes([0, 1, 2], status)
    ? `
     <svg width="${status === 2 ? 19 : 18}" height="${
        status === 2 ? 19 : 18
      }" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2V18M2 10H18" stroke="${color}" stroke-width="${
        status === 2 ? 4 : 3
      }" stroke-linecap="round" />
      </svg>
    `
    : _.includes([4, 5], status)
    ? deleteSvg
    : `<svg width="18" height="18" viewBox="0 0 18 18" fill="${color}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="6" stroke="${color}" stroke-width="2" fill="${color}"/>
  </svg>`;
  return window.btoa(svg);
};
let oldId = 0;
let color: string = "";
export const getSettlementSvg = (id: number): string => {
  if (id != oldId) {
    color = _.sample(colorArray) ?? "";
  }

  //   _.sample(colorArray);

  const svg = `<svg width="23" height="23" viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg">

    <defs>

    <style>.cls-1{fill:${color};}</style>

    </defs>

    <title>map-pin</title>

    <g id="map-pin-Filled">

    <path id="map-pin-Filled-2" data-name="map-pin-Filled" class="cls-1" d="M6.5,7.5A5.5,5.5,0,1,1,13,12.9V17a1,1,0,0,1-2,0V12.9A5.506,5.506,0,0,1,6.5,7.5Zm8.7,6.81a1,1,0,0,0-.4,1.961C16.983,16.712,18,17.563,18,18c0,.7-2.278,2-6,2s-6-1.3-6-2c0-.437,1.017-1.288,3.2-1.729a1,1,0,0,0-.4-1.961C5.8,14.918,4,16.3,4,18c0,2.626,4.024,4,8,4s8-1.374,8-4C20,16.3,18.2,14.918,15.2,14.31Z"/>

    </g>

    </svg>`;
  oldId = id;
  return window.btoa(svg);
};

export const getClusterSvg = (color: string): string => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="55.066" height="47.691" viewBox="0 0 55.066 47.691">
                <g id="Group_15" data-name="Group 15" transform="translate(-319.467 -83.991)">
                  <g id="Group_14" data-name="Group 14">
                    <path id="Intersection_4" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                    <path id="Intersection_5" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                    <path id="Intersection_6" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                  </g>
                  <g id="Group_13" data-name="Group 13" transform="translate(427.806 461.061) rotate(-120)">
                    <path id="Intersection_4-2" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                    <path id="Intersection_5-2" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                    <path id="Intersection_6-2" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                  </g>
                  <circle id="Ellipse_9" data-name="Ellipse 9" cx="11" cy="11" r="11" transform="translate(336 96)" fill="${color}"/>
                  <g id="Group_12" data-name="Group 12" transform="translate(613.194 -139.96) rotate(120)">
                    <path id="Intersection_4-3" data-name="Intersection 4" d="M12.789,17.143a15,15,0,0,1,20.7,0l-1.6,2.141-.018-.018a12.352,12.352,0,0,0-17.469,0l-.018.018Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.845"/>
                    <path id="Intersection_5-3" data-name="Intersection 5" d="M10.384,13.919a19,19,0,0,1,25.511,0l-2.016,2.7a15.647,15.647,0,0,0-21.479,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.652"/>
                    <path id="Intersection_6-3" data-name="Intersection 6" d="M7.982,10.7a22.978,22.978,0,0,1,30.313,0l-2,2.679a19.652,19.652,0,0,0-26.316,0Z" transform="translate(323.861 78.999)" fill="${color}" opacity="0.453"/>
                  </g>
                </g>
              </svg>
  `;
};

window.handleNavigation = function (address_id: number) {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/auth/questionnaire-list`;
  localStorage.setItem("address_id", String(address_id));
  // Perform any additional logic here if needed
  window.open(url, "_blank");
};
export const getPopUpContent = (point: any): string => {
  const wgs84 = "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs";
  const [longitude, latitude] = proj4(wgs84, "EPSG:4326", [point.x, point.y]);

  const statusArray = [1, 2, 3, 4, 5, 8, 9, 10];

  return `<b>თქვენ დააჭირეთ წერტილზე</b>
        <br>
        <b>აღმწერი:</b> ${point.full_name} 
        <br>
        <b>ID:</b> ${point.house_code}
        <br>
        <b>შენობის ID:</b> ${point.house_id}
        ${
          point.location_name
            ? `<br><b>დასახლება:</b> ${point.location_name}`
            : ""
        }
        <br>
        ${
          point.status === 7
            ? `<b>არასაცხოვრისის ტიპი:</b> ${point.is_housing}`
            : ""
        }
        <br>
        <b>კოორდინატი:</b> <a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="_blank">ლინკი</a>
    
  
        <br>
        ${
          statusArray.includes(point.status)
            ? `<b>ტიპი:</b> ${point.dwelling_type_name}`
            : ""
        }
        <br>
        ${
            point.dwelling_type_id === 1
            ? `<b>საცხოვრისის სტატუსი:</b> ${point.dwelling_status_name}`
            : ""
        }
        <br>
        <br>
         ${
           statusArray.includes(point.status) && point.has_questionnaire
             ? `<b><a href="#" onclick="window.handleNavigation(${point.address_id})">კითხვარებზე გადასვლა</a></b>`
             : ""
         }
        
    `;
};
export const legendHtml = `
            <div id="map-legend" style="position: relative; width: 200px; padding: 5px; border: 1px solid #ccc; background-color: white; border-radius: 3px; cursor: pointer;">
              <div id="selected-option" style="padding: 5px; display: flex; justify-content: space-between; align-items: center;">
                ლეგენდა
                <span id="arrow-icon" style="transition: transform 0.3s ease;">&#9660;</span>
              </div>
              <div id="dropdown-options" style="display: none; position: absolute; bottom: 100%; left: 0; width: 100%; background: white; border: 1px solid #ccc; border-radius: 3px; z-index: 1000;">
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                <span>საწყისი</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                <span>დაწყებული</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="Yellow" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">
                <span>დასრულებული</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">
                <span>წაშლილი</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">
                <span>დაბრუნებული</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">
                <span>არასაცხოვრებელი</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
                </div>
              
              </div>
            </div>
            `;
// <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">სააღწერო</div>
// <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">საზედაამხედველო</div>
// <div class="dropdown-option" style="padding: 5px; cursor: pointer; font-weight: bold;display: flex; justify-content: space-between; align-items: center;">მუნიციპალიტერი</div>

export const createCustomIcon = (color: string) => {
  const svg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="${color}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="6" stroke="${color}" stroke-width="1" fill="${color}"/>
          </svg>`;
  return L.divIcon({
    html: svg,
    className: "custom-icon custom-icon-z-index",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};
