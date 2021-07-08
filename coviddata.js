/*
Author: Cameron Brown - https://github.com/CameronMBrown

This web app uses the "Open Covid" API created by Covid-19 Canada Open Data Working Group (CCODWG)
https://opencovid.ca/api/


0 - Alberta
1 - British Columbia
2 - Manitoba
3 - New Brunswick
4 - Newfoundland and Labrador
5 - Northwest Territories
6 - Nova Scotia
7 - Nunavut
8 - Ontario
9 - Prince Edward Island
10 - Quebec
11 - Saskatchewan
12 - Yukon
*/

window.onload = e => {
  //initial API fetch
  fetch('https://api.opencovid.ca/summary')
    .then(data => data.json())
    .then((opencovidAPI) => {
      // grab province data from API response
      const ab = opencovidAPI.summary[0];
      const bc = opencovidAPI.summary[1];
      const mb = opencovidAPI.summary[2];
      const nb = opencovidAPI.summary[3];
      const nl = opencovidAPI.summary[4];
      const nt = opencovidAPI.summary[5];
      const ns = opencovidAPI.summary[6];
      const nv = opencovidAPI.summary[7];
      const on = opencovidAPI.summary[8];
      const pei = opencovidAPI.summary[9];
      const qb = opencovidAPI.summary[10];
      const sk = opencovidAPI.summary[12];
      const yk = opencovidAPI.summary[13];

      // load the rest of DOM elements after data has been loaded to avoid reference errors.
      // get container for province panels
      const panels = document.getElementById("panels");

      // define province panel HTML, include API data
      const alberta = {
        HTML: 
        `<div id="${ab.province}" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/ab.gif" alt="${ab.province}" class="prov-img"></img> 
          </div>
          <div>
          <div class="prov-header">
            <img src="img/ab-flag.png" alt="${ab.province} flag" class="flag"></img>
            <h2 class="prov-title">${ab.province}</h2>
            <span class="updated">updated: ${ab.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(ab.active_cases)}">${ab.active_cases}</div>
              <span>active ${casesPluralizer(ab.active_cases)}</span> 
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${ab.cases}</div>
            <div class="data-num">${ab.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${ab.recovered}</div>
            <div class="data-num">${ab.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${ab.deaths}</div>
            <div class="data-num">${ab.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${ab.testing}</div>
            <div class="data-num">${ab.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${ab.avaccine + ab.cvaccine + ab.dvaccine}</div>
            <div class="data-num">${ab.cumulative_avaccine + ab.cumulative_cvaccine + ab.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: ab
      }

      const britishColumbia = {
        HTML:       
        `<div id="britishcolumbia" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/bc.gif" alt="British Columbia" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/bc-flag.png" alt="British Columbia flag" class="flag"></img>
            <h2 class="prov-title">British Columbia</h2>
            <span class="updated">updated: ${bc.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(bc.active_cases)}">${bc.active_cases}</div>
              <span>active ${casesPluralizer(bc.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${bc.cases}</div>
            <div class="data-num">${bc.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${bc.recovered}</div>
            <div class="data-num">${bc.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${bc.deaths}</div>
            <div class="data-num">${bc.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${bc.testing}</div>
            <div class="data-num">${bc.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${bc.avaccine + bc.cvaccine + bc.dvaccine}</div>
            <div class="data-num">${bc.cumulative_avaccine + bc.cumulative_cvaccine + bc.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: bc
      }

      const manitoba = {
        HTML:       
        `<div id="manitoba" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/mb.gif" alt="Manitoba" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/mb-flag.png" alt="Manitoba flag" class="flag"></img>
            <h2 class="prov-title">Manitoba</h2>
            <span class="updated">updated: ${mb.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(mb.active_cases)}">${mb.active_cases}</div>
              <span>active ${casesPluralizer(mb.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${mb.cases}</div>
            <div class="data-num">${mb.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${mb.recovered}</div>
            <div class="data-num">${mb.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${mb.deaths}</div>
            <div class="data-num">${mb.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${mb.testing}</div>
            <div class="data-num">${mb.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${mb.avaccine + mb.cvaccine + mb.dvaccine}</div>
            <div class="data-num">${mb.cumulative_avaccine + mb.cumulative_cvaccine + mb.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: mb
      }

      const newBrunswick = {
        HTML:
        `<div id="newbrunswick" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/nb.gif" alt="New Brunswick" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/nb-flag.png" alt="New Brunswick flag" class="flag"></img>
            <h2 class="prov-title">New Brunswick</h2>
            <span class="updated">updated: ${nb.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(nb.active_cases)}">${nb.active_cases}</div>
              <span>active ${casesPluralizer(nb.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${nb.cases}</div>
            <div class="data-num">${nb.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${nb.recovered}</div>
            <div class="data-num">${nb.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${nb.deaths}</div>
            <div class="data-num">${nb.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${nb.testing}</div>
            <div class="data-num">${nb.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${nb.avaccine + nb.cvaccine + nb.dvaccine}</div>
            <div class="data-num">${nb.cumulative_avaccine + nb.cumulative_cvaccine + nb.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: nb
      }

      const newfoundlandLabrador = {
        HTML:`<div id="newfoundland" class="prov-cntr">
        <div class="prov-img-cntr">
          <img src="img/nfl.gif" alt="Newfoundland and Labrador" class="prov-img"></img>
        </div>
        <div>
          <div class="prov-header">
            <img src="img/nfl-flag.png" alt="Newfoundland and Labrador flag" class="flag"></img>
            <h2 class="prov-title">Newfoundland and Labrador</h2>
            <span class="updated">updated: ${nl.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(nl.active_cases)}">${nl.active_cases}</div>
              <span>active ${casesPluralizer(nl.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${nl.cases}</div>
            <div class="data-num">${nl.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${nl.recovered}</div>
            <div class="data-num">${nl.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${nl.deaths}</div>
            <div class="data-num">${nl.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${nl.testing}</div>
            <div class="data-num">${nl.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${nl.avaccine + nl.cvaccine + nl.dvaccine}</div>
            <div class="data-num">${nl.cumulative_avaccine + nl.cumulative_cvaccine + nl.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: nl
      }

      const northwestTerritories = {
        HTML: 
        `<div id="northwestterritories" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/nwt.png" alt="Northwest Territories" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/nwt-flag.png" alt="Northwest Territories flag" class="flag"></img>
            <h2 class="prov-title">Northwest Territories</h2>
            <span class="updated">updated: ${nt.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(nt.active_cases)}">${nt.active_cases}</div>
              <span>active ${casesPluralizer(nt.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${nt.cases}</div>
            <div class="data-num">${nt.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${nt.recovered}</div>
            <div class="data-num">${nt.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${nt.deaths}</div>
            <div class="data-num">${nt.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${nt.testing}</div>
            <div class="data-num">${nt.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${nt.avaccine + nt.cvaccine + nt.dvaccine}</div>
            <div class="data-num">${nt.cumulative_avaccine + nt.cumulative_cvaccine + nt.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: nt
      }

      const novaScotia = {      
        HTML: 
        `<div id="novascotia" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/ns.gif" alt="Nova Scotia" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/ns-flag.png" alt="Nova Scotia flag" class="flag"></img>
            <h2 class="prov-title">Nova Scotia</h2>
            <span class="updated">updated: ${ns.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(ns.active_cases)}">${ns.active_cases}</div>
              <span>active ${casesPluralizer(ns.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${ns.cases}</div>
            <div class="data-num">${ns.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${ns.recovered}</div>
            <div class="data-num">${ns.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${ns.deaths}</div>
            <div class="data-num">${ns.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${ns.testing}</div>
            <div class="data-num">${ns.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${ns.avaccine + ns.cvaccine + ns.dvaccine}</div>
            <div class="data-num">${ns.cumulative_avaccine + ns.cumulative_cvaccine + ns.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: ns
      }

      const nunavut = {
        HTML: `<div id="nunavut" class="prov-cntr">
        <div class="prov-img-cntr">
          <img src="img/nu.jpg" alt="Nunavut" class="prov-img"></img>
        </div>
        <div>
          <div class="prov-header">
            <img src="img/nv-flag.png" alt="Nunavut flag" class="flag"></img>
            <h2 class="prov-title">Nunavut</h2>
            <span class="updated">updated: ${nv.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(nv.active_cases)}">${nv.active_cases} </div>
              <span>active ${casesPluralizer(nv.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${nv.cases}</div>
            <div class="data-num">${nv.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${nv.recovered}</div>
            <div class="data-num">${nv.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${nv.deaths}</div>
            <div class="data-num">${nv.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${nv.testing}</div>
            <div class="data-num">${nv.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${nv.avaccine + nv.cvaccine + nv.dvaccine}</div>
            <div class="data-num">${nv.cumulative_avaccine + nv.cumulative_cvaccine + nv.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: nv
      }

      const ontario = {
        HTML: 
        `<div id="ontario" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/ont.gif" alt="ontario" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/ontario-flag.png" alt="ontario flag" class="flag"></img>
            <h2 class="prov-title">Ontario</h2>
            <span class="updated">updated: ${on.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(on.active_cases)}">${on.active_cases} </div>
              <span>active ${casesPluralizer(on.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${on.cases}</div>
            <div class="data-num">${on.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${on.recovered}</div>
            <div class="data-num">${on.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${on.deaths}</div>
            <div class="data-num">${on.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${on.testing}</div>
            <div class="data-num">${on.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${on.avaccine + on.cvaccine + on.dvaccine}</div>
            <div class="data-num">${on.cumulative_avaccine + on.cumulative_cvaccine + on.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: on
      }

      const princeEdwardIsland = {
        HTML: 
        `<div id="princeedwardisland" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/pei.gif" alt="Price Edward Island" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/pei-flag.png" alt="Price Edward Island flag" class="flag"></img>
            <h2 class="prov-title">Prince Edward Island</h2>
            <span class="updated">updated: ${pei.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(pei.active_cases)}">${pei.active_cases} </div>
              <span>active ${casesPluralizer(pei.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${pei.cases}</div>
            <div class="data-num">${pei.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${pei.recovered}</div>
            <div class="data-num">${pei.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${pei.deaths}</div>
            <div class="data-num">${pei.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${pei.testing}</div>
            <div class="data-num">${pei.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${pei.avaccine + pei.cvaccine + pei.dvaccine}</div>
            <div class="data-num">${pei.cumulative_avaccine + pei.cumulative_cvaccine + pei.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: pei
      }

      const quebec = {
        HTML: 
        `<div id="quebec" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/quebec.gif" alt="Quebec" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/quebec-flag.png" alt="Quebec flag" class="flag"></img>
            <h2 class="prov-title">Quebec</h2>
            <span class="updated">updated: ${qb.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(qb.active_cases)}">${qb.active_cases} </div>
              <span>active ${casesPluralizer(qb.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${qb.cases}</div>
            <div class="data-num">${qb.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${qb.recovered}</div>
            <div class="data-num">${qb.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${qb.deaths}</div>
            <div class="data-num">${qb.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${qb.testing}</div>
            <div class="data-num">${qb.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${qb.avaccine + qb.cvaccine + qb.dvaccine}</div>
            <div class="data-num">${qb.cumulative_avaccine + qb.cumulative_cvaccine + qb.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: qb
      }

      const saskatchewan = {
        HTML:
        `<div id="saskatchewan" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/sask.gif" alt="Saskatchewan" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/sk-flag.png" alt="Saskatchewan flag" class="flag"></img>
            <h2 class="prov-title">Saskatchewan</h2>
            <span class="updated">updated: ${sk.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(sk.active_cases)}">${sk.active_cases} </div>
              <span>active ${casesPluralizer(sk.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${sk.cases}</div>
            <div class="data-num">${sk.cumulative_cases}</div>
            <div class="data-title">Recovered</div>
            <div class="data-num">${sk.recovered}</div>
            <div class="data-num">${sk.cumulative_recovered}</div>
            <div class="data-title">Deaths</div>
            <div class="data-num">${sk.deaths}</div>
            <div class="data-num">${sk.cumulative_deaths}</div>
            <div class="data-title">Testing</div>
            <div class="data-num">${sk.testing}</div>
            <div class="data-num">${sk.cumulative_testing}</div>
            <div class="data-title">Vaccination</div>
            <div class="data-num">${sk.avaccine + sk.cvaccine + sk.dvaccine}</div>
            <div class="data-num">${sk.cumulative_avaccine + sk.cumulative_cvaccine + sk.cumulative_dvaccine}</div>
          </div>
        </div>
      </div>`,
      data: sk
      }

      const yukon = {
        HTML: 
        `<div id="yukon" class="prov-cntr">
          <div class="prov-img-cntr">
            <img src="img/yk.gif" alt="Yukon" class="prov-img"></img>
          </div>
          <div>
          <div class="prov-header">
            <img src="img/yk-flag.png" alt="Yukon flag" class="flag"></img>
            <h2 class="prov-title">Yukon</h2>
            <span class="updated">updated: ${yk.date}</span>
            <div class="active-cases">
              <div class="data-num ${greenIfZero(yk.active_cases)}">${yk.active_cases} </div>
              <span>active ${casesPluralizer(yk.active_cases)}</span>
            </div>
          </div>
          <div class="prov-stats">
            <div class="grid-header daily">daily</div>
            <div class="grid-header total">total</div>
            <div class="data-title">Cases</div>
            <div class="data-num">${yk.cases}</div>
            <div class="data-num">${yk.cumulative_cases}</div>

            <div class="data-title">Recovered</div>
            <div class="data-num">${yk.recovered}</div>
            <div class="data-num">${yk.cumulative_recovered}</div>

            <div class="data-title">Deaths</div>
            <div class="data-num">${yk.deaths}</div>
            <div class="data-num">${yk.cumulative_deaths}</div>

            <div class="data-title">Testing</div>
            <div class="data-num">${yk.testing}</div>
            <div class="data-num">${yk.cumulative_testing}</div>

            <div class="data-title">Vaccination</div>
            <div class="data-num">${yk.avaccine + yk.cvaccine + yk.dvaccine}</div>
            <div class="data-num">${yk.cumulative_avaccine + yk.cumulative_cvaccine + yk.cumulative_dvaccine}</div>

          </div>
        </div>
      </div>`,
      data: yk
      }

      // it is helpful to have the HTML panels in an array together for later ordering
      const provinces = [
            alberta, 
            britishColumbia, 
            manitoba, 
            newBrunswick, 
            newfoundlandLabrador, 
            northwestTerritories, 
            novaScotia,
            nunavut,
            ontario,
            princeEdwardIsland,
            quebec,
            saskatchewan,
            yukon
        ];

      // edits 'cases' to 'case' if there is only 1
      function casesPluralizer(num){ return num === 1 ? "case" : "cases" }

      // helps to turn the colour of active cases to green if there are 0
      function greenIfZero(num){ return num === 0 ? "green" : "red" }

      function alphaSort(){
        // arrange the province panels in alphabetical order
        // default sorting method
        // alphabetical order will never change, this can be hardcoded.
        const alphabetical = [
          alberta, 
          britishColumbia, 
          manitoba, 
          newBrunswick, 
          newfoundlandLabrador, 
          northwestTerritories, 
          novaScotia,
          nunavut,
          ontario,
          princeEdwardIsland,
          quebec,
          saskatchewan,
          yukon
        ];

        // append province panels in alphabetical order
        alphabetical.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function activeCases(){
        // sort province panels by number of active cases
        provinces.sort((a, b) => (a.data.active_cases > b.data.active_cases) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function cases(){
        // sort province panels by total number of cases
        provinces.sort((a, b) => (a.data.cumulative_cases > b.data.cumulative_cases) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function recovered(){
        // sort province panels by total number of recoveries
        provinces.sort((a, b) => (a.data.cumulative_recovered > b.data.cumulative_recovered) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function deaths(){
        // sort province panels by total number of deaths
        provinces.sort((a, b) => (a.data.cumulative_deaths > b.data.cumulative_deaths) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function vaccination(){
        // sort province panels by total number of vaccinations
        provinces.sort((a, b) => {
          return ((a.data.cumulative_avaccine + a.data.cumulative_cvaccine + a.data.cumulative_dvaccine) > 
            (b.data.cumulative_avaccine + b.data.cumulative_cvaccine + b.data.cumulative_dvaccine)) ? -1 : 1 ;
        })
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function dailyCases(){
        // sort province panels by number of daily cases
        provinces.sort((a, b) => (a.data.cases > b.data.cases) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function dailyRecovered(){
        // sort province panels by number of daily recoveries
        provinces.sort((a, b) => (a.data.recovered > b.data.recovered) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function dailyDeaths(){
        // sort province panels by number of daily deaths
        provinces.sort((a, b) => (a.data.deaths > b.data.deaths) ? -1 : 1);
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      function dailyVaccinations(){
        // sort province panels by number of daily vaccinations
        provinces.sort((a, b) => {
          return ((a.data.avaccine + a.data.cvaccine + a.data.dvaccine) > 
            (b.data.avaccine + b.data.cvaccine + b.data.dvaccine)) ? -1 : 1 ;
        })
        provinces.forEach((prov) => panels.innerHTML += prov.HTML);
      }

      // display provinces first in (default) alphabetical order
      alphaSort();
      
      const sorter = document.getElementById("sort");
      sorter.addEventListener('change', () => {
        // first, remove exsisting province panels
        panels.innerHTML = "";

        // sort data based on dropdown selection 
        switch (sorter.value){
          case "1": 
            alphaSort();
            break;
          case "2": 
            activeCases();
            break;
          case "3": 
            cases();
            break;
          case "4": 
            recovered();
            break;
          case "5": 
            deaths();
            break;
          case "6": 
            vaccination();
            break;
          case "7": 
            dailyCases();
            break;
          case "8": 
            dailyRecovered();
            break;
          case "9": 
            dailyDeaths();
            break;
          case "10": 
            dailyVaccinations();
            break;
        }
      });
    }) 
} 
