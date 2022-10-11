import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [countryId, setCountryId] = useState();
  const [cityId, setCityId] = useState();
  const [cash, setCash] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();


  useEffect(() => {
    axios.get('https://localhost:7244/api/Country/GetAllCountry')
      .then(res => {
        setCountry(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleCountryChange(e) {
    setCountryId(e.target.value);
    const selectedCountry = e.target.value;
    axios.get('https://localhost:7244/api/City/GetAllByCountryId/' + selectedCountry)
      .then(res => {
        setCity(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCityChange(e) {
    setCityId(e.target.value);
  }

  function createOrder() {
    let order = {
      cash: cash,
      countryId: countryId,
      cityId: cityId,
      startTime: startTime,
      endTime: endTime
    }

    axios.post('https://localhost:7244/api/Order/CreateOrder', order)
      .then(res => {
        console.log(res);
      }
      )
      .catch(err => {
        console.log(err);
      }
      )

  }


  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-between mb-3">
          <div className="col-9 ">
            <h1 className="d-inline float-left">Seyahet Tarixcesi</h1>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">
                        <h5>Olke</h5>
                        <select className="form-select" defaultValue={"0"} onChange={(e) => handleCountryChange(e)}>
                          <option value="0" disabled>Olke secin</option>
                          {country && country.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.name}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="col-6">
                        <h5>Seher</h5>
                        <select className="form-select" defaultValue={"0"} onChange={(e) => handleCityChange(e)}>
                          <option value="0" disabled>Seher secin</option>
                          {city && city.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.name}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <h5>Baslama tarixi</h5>
                        <input type="date" className="form-control" id="exampleFormControlInput1" onChange={(e) => setStartTime(e.target.value)} />
                      </div>
                      <div className="col-6">
                        <h5>Bitme tarixi</h5>
                        <input type="date" className="form-control" id="exampleFormControlInput1" onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <h5>Istifade olunan mebleg</h5>
                        <input type="number" className="form-control" id="exampleFormControlInput1" onChange={(e) => setCash(e.target.value)} />
                      </div>
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Imtina</button>
                    <button type="button" className="btn btn-primary" onClick={() => createOrder()}>Yaddas</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-4">
            <select className="form-select float-left" defaultValue={"0"}>
              <option value={"0"}>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-3 float-right">
            <div className="row">
              <div className="col-4">
                <select className="form-select float-left" aria-label="Default select example">
                  <option value="0">Gun</option>
                  <option value="1">Qiymet</option>
                </select>
              </div>
              <div className="col-4">
                <select className="form-select float-left" aria-label="Default select example">
                  <option value="0">Artan</option>
                  <option value="1">Azalan</option>
                </select>
              </div>
              <div className="col-4">
                <button>Sirala</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Olke</th>
                  <th scope="col">Seher</th>
                  <th scope="col">Baslangic Tarix</th>
                  <th scope="col">Bitme Tarix</th>
                  <th scope="col">Qiymet</th>
                  <th scope="col">Settings</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="row">
              <p >Olke Sayi</p>
            </div>
            <div className="row">
              <p>Serf olunan gun</p>
            </div>
            <div className="row">
              <p>Serf olunan mebleg</p>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
