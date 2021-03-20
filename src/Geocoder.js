import React, { useState } from "react";
import Axios from "axios";
import * as turf from "@turf/turf";
import CardDeck from "react-bootstrap/CardDeck";
import Card1 from "./Card";

const Geocoder = (props) => {
  const [code, setCode] = useState("");
  const [codeIntro, setCodeIntro] = useState("");
  const [score, setScore] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [districtPhone, setDistrictPhone] = useState("");
  const [districtPhone1, setDistrictPhone1] = useState("");
  const [districtPhone2, setDistrictPhone2] = useState("");
  const [url, setUrl] = useState(
    "data:image/jpeg;base64,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"
  );
  const [url1, setUrl1] = useState(
    "https://pm1.narvii.com/6949/e9970df290f9d46123aef0dfe5488ff39b4079dcr1-1337-2048v2_hq.jpg"
  );
  const [url2, setUrl2] = useState(
    "data:image/jpeg;base64,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"
  );
  const [rep, setRep] = useState("");
  const [sen, setSen] = useState("");
  const [sen2, setSen2] = useState("");
  const [party, setParty] = useState("");
  const [party1, setParty1] = useState("");
  const [party2, setParty2] = useState("");
  const [repNumber, setRepNumber] = useState("");
  const [senNumber, setSenNumber] = useState("");
  const [senNumber2, setSenNumber2] = useState("");
  const [repTwitter, setRepTwitter] = useState("");
  const [senTwitter, setSenTwitter] = useState("");
  const [senTwitter2, setSenTwitter2] = useState("");

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
      console.log(response);
      const phones = [];
      const urls = [];
      const names = [];
      const dcNumbers = [];
      const twitters = [];
      const bioguide =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].references
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
          setDistrictPhone(closestPhone);
        })
        .catch((error) => {
          console.error(error);
        });
      const photoUrl = "http://localhost:5000/api/moc_urls/" + bioguide;
      Axios.get(photoUrl)
        .then((response) => {
          const link = response.data[0].url;
          setUrl(link);
        })
        .catch((error) => {
          console.error(error);
        });
      const code0 =
        response.results[0].response.results[0].address_components.state +
        "-" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].district_number;
      setCodeIntro(" - ");
      setCode(code0);
      const url0 = "http://localhost:5000/api/LCV_Scores/" + code0;
      Axios.get(url0)
        .then((response) => {
          const district =
            "Lifetime LCV Score: " + response.data.lifetime_rating;
          setScore(district);
        })
        .catch((error) => {
          console.error(error);
        });
      const full_name =
        "Rep. " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].bio.first_name +
        " " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].bio.last_name;
      setRep(full_name);
      const number0 =
        "DC: " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].contact.phone;
      setRepNumber(number0);
      const twitter =
        "@" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].social.twitter;
      setRepTwitter(twitter);
      const party0 =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[0].bio.party;
      setParty(party0);
      //Sen1
      const bioguide1 =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].references
          .bioguide_id;
      const districtUrl1 =
        "http://localhost:5000/api/district_offices/" + bioguide1;
      Axios.get(districtUrl1)
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
          const closestPhone1 = "Local: " + response.data[index].phone;
          setDistrictPhone1(closestPhone1);
        })
        .catch((error) => {
          console.error(error);
        });
      const photoUrl1 = "http://localhost:5000/api/moc_urls/" + bioguide1;
      Axios.get(photoUrl1)
        .then((response) => {
          const link = response.data[0].url;
          setUrl1(link);
        })
        .catch((error) => {
          console.error(error);
        });
      const url1b = "http://localhost:5000/api/senator_scores/" + bioguide1;
      Axios.get(url1b)
        .then((response) => {
          const district =
            "Lifetime LCV Score: " + response.data.lifetime_rating;
          setScore1(district);
        })
        .catch((error) => {
          console.error(error);
        });
      const full_name1 =
        "Sen. " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].bio.first_name +
        " " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].bio.last_name;
      setSen(full_name1);
      const number1 =
        "DC: " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].contact.phone;
      setSenNumber(number1);
      const twitter1 =
        "@" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].social.twitter;
      setSenTwitter(twitter1);
      const party1a =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[1].bio.party;
      setParty1(party1a);
      //Sen2
      const bioguide2 =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].references
          .bioguide_id;
      const districtUrl2 =
        "http://localhost:5000/api/district_offices/" + bioguide2;
      Axios.get(districtUrl2)
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
          const closestPhone2 = "Local: " + response.data[index].phone;
          setDistrictPhone2(closestPhone2);
        })
        .catch((error) => {
          console.error(error);
        });
      const photoUrl2 = "http://localhost:5000/api/moc_urls/" + bioguide2;
      Axios.get(photoUrl2)
        .then((response) => {
          const link = response.data[0].url;
          setUrl2(link);
        })
        .catch((error) => {
          console.error(error);
        });
      const url2b = "http://localhost:5000/api/senator_scores/" + bioguide2;
      Axios.get(url1b)
        .then((response) => {
          const district =
            "Lifetime LCV Score: " + response.data.lifetime_rating;
          setScore2(district);
        })
        .catch((error) => {
          console.error(error);
        });
      const full_name2 =
        "Sen. " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].bio.first_name +
        " " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].bio.last_name;
      setSen2(full_name2);
      const number2 =
        "DC: " +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].contact.phone;
      setSenNumber2(number2);
      const twitter2 =
        "@" +
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].social.twitter;
      setSenTwitter2(twitter2);
      const party2a =
        response.results[0].response.results[0].fields
          .congressional_districts[0].current_legislators[2].bio.party;
      setParty2(party2a);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <div>
      <CardDeck className="m-5">
        <Card1
          party={party}
          codeIntro={codeIntro}
          code={code}
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
          lcvScore={score1}
        />
        <Card1
          party={party2}
          image={url2}
          name={sen2}
          dcNumber={senNumber2}
          localNumber={districtPhone2}
          twitter={senTwitter2}
          lcvScore={score2}
        />
      </CardDeck>
    </div>
  );
};
export default Geocoder;
