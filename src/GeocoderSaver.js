import React, { useState } from "react";
import Axios from "axios";
import * as turf from "@turf/turf";
import Card1 from "./Card";
import CardDeck from "react-bootstrap/CardDeck";

const Geocoder = (props) => {
  const [code, setCode] = useState("");
  const [score, setScore] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [rep, setRep] = useState("");
  const [repNumber, setRepNumber] = useState("");
  const [repTwitter, setRepTwitter] = useState("");
  const [sen, setSen] = useState("");
  const [senNumber, setSenNumber] = useState("");
  const [senTwitter, setSenTwitter] = useState("");
  const [sen2, setSen2] = useState("");
  const [senNumber2, setSenNumber2] = useState("");
  const [senTwitter2, setSenTwitter2] = useState("");
  const [districtPhone, setDistrictPhone] = useState("");
  const [districtPhone1, setDistrictPhone1] = useState("");
  const [districtPhone2, setDistrictPhone2] = useState("");
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [party, setParty] = useState("");
  const [party1, setParty1] = useState("");
  const [party2, setParty2] = useState("");

  const Geocodio = require("geocodio-library-node");
  const geocoder = new Geocodio("969a6aee40baa3635b639a39a56959064b02e14")
    .geocode(
      [
        {
          street: props.street,
          city: props.city,
          state: props.state,
          postal_code: props.zip_code,
        },
      ],
      ["cd"]
    )
    .then((response) => {
      const phones = [];
      const urls = [];
      const names = [];
      const dcNumbers = [];
      const twitters = [];
      for (var y = 0; y < 3; y++) {
        const bioguide =
          response.results[0].response.results[0].fields
            .congressional_districts[0].current_legislators[y].references
            .bioguide_id;
        const homeLat = response.results[0].response.results[0].location.lat;
        const homeLon = response.results[0].response.results[0].location.lng;
        const districtUrl =
          "http://localhost:5000/api/district_offices/" + bioguide;
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
            const closestPhone = "Local: " + response.data[index].phone;
            phones.push(closestPhone);
            const closestPhone0 = phones[0];
            const closestPhone1 = phones[1];
            const closestPhone2 = phones[2];
            setDistrictPhone(closestPhone0);
            setDistrictPhone1(closestPhone1);
            setDistrictPhone2(closestPhone2);
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
            setUrl(link0);
            setUrl1(link1);
            setUrl2(link2);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      const code =
        response.results[0].response.results[0].address_components.state +
        "-" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].district_number;
      setCode(code);
      const url = "http://localhost:5000/api/LCV_Scores/" + code;
      Axios.get(url).then((response) => {
        const district = "Lifetime LCV Score: " + response.data.lifetime_rating;
        setScore(district);
      });
      const link0 = urls[0];
      const link1 = urls[1];
      const link2 = urls[2];
      setUrl(link0);
      setUrl1(link1);
      setUrl2(link2);
      const name =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[y].bio.first_name +
        " " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[y].bio.last_name;
      names.push(name);
      const rep = "Rep. " + names[0];
      const sen = "Sen. " + names[1];
      const sen2 = "Sen. " + names[2];
      setRep(rep);
      setSen(sen);
      setSen2(sen2);
      const number =
        "DC: " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[y].contact.phone;
      dcNumbers.push(number);
      const number0 = "Rep. " + dcNumbers[0];
      const number1 = "Sen. " + dcNumbers[1];
      const number2 = "Sen. " + dcNumbers[2];
      setRepNumber(number0);
      setSenNumber(number1);
      setSenNumber2(number2);
      const twitter =
        "@" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[y].social.twitter;
      twitters.push(twitter);
      const twitter0 = "Rep. " + twitters[0];
      const twitter1 = "Sen. " + twitters[1];
      const twitter2 = "Sen. " + twitters[2];
      setRepTwitter(twitter0);
      setSenTwitter(twitter1);
      setSenTwitter2(twitter2);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <div>
      <CardDeck className="m-5">
        <Card1
          party={party}
          image={url}
          name={rep}
          dcNumber={repNumber}
          localNumber={districtPhone}
          twitter={repTwitter}
          lcvScore={score}
        />
        <Card1
          party={party1}
          image={url1}
          name={sen}
          dcNumber={senNumber}
          localNumber={districtPhone1}
          twitter={senTwitter}
          lcvScore={score}
        />
        <Card1
          party={party2}
          image={url2}
          name={sen2}
          dcNumber={senNumber2}
          localNumber={districtPhone2}
          twitter={senTwitter2}
          lcvScore={score}
        />
      </CardDeck>
    </div>
  );
};
export default Geocoder;
