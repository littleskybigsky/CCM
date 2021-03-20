import React, { useState } from "react";
import Axios from "axios";
import * as turf from "@turf/turf";

const phones = [];
const urls = [];
const bioguides = ["M000133", "N000002", "P000603"];
for (var y = 0; y < 3; y++) {
  const bioguide = bioguides[y];
  const homeLat = 37.8044;
  const homeLon = -122.2712;
  const districtUrl = "http://localhost:5000/api/district_offices/" + bioguide;
  Axios.get(districtUrl)
    .then((response) => {
      var lats = [];
      var lons = [];
      const latList = response.data;
      for (var i = 0; i < latList.length; i++) {
        const lat = latList[i].latitude;
        lats.push(lat);
        const lon = latList[i].longitude;
        lons.push(lon);
      }
      const distances = [];
      for (var x = 0; x < latList.length; x++) {
        const from = turf.point([homeLat, homeLon]);
        const to = turf.point([lats[x], lons[x]]);
        const options = { units: "miles" };
        const hello = turf.distance(from, to, options);
        distances.push(hello);
      }
      const index = distances.indexOf(Math.min(...distances));
      const closestPhone = response.data[index].phone;
      phones.push(closestPhone);
      const closestPhone0 = phones[0];
      const closestPhone1 = phones[1];
      const closestPhone2 = phones[2];
      console.log(closestPhone0);
      console.log(closestPhone1);
      console.log(closestPhone2);
    })
    .catch((error) => {
      console.error(error);
    });
  const photoUrl = "http://localhost:5000/api/moc_urls/" + bioguide;
  Axios.get(photoUrl)
    .then((response) => {
      const link = response.data[0].url;
      urls.push(link);
      const link0 = urls[0];
      const link1 = urls[1];
      const link2 = urls[2];
      console.log(link0);
      console.log(link1);
      console.log(link2);
    })
    .catch((error) => {
      console.error(error);
    });
}
