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
    "https://upload.wikimedia.org/wikipedia/commons/b/bf/JudithButler2013.jpg"
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
