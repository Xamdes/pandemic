import {Pandemic} from './pandemic';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const pandemicOne = new Pandemic(6000000000);
pandemicOne.RandomInfection();
pandemicOne.StartInfection();

// const milliseconds = seconds*1000;
// this.interval = setInterval(() => {
//   this.InfectionSpread();
// },milliseconds);

$(function()
{

  setInterval(() => {
    UpdateStatistics();
  },1000);

  $("#search-generic").submit(function(e){
    e.preventDefault();
    pandemicOne.ResearchCure();
    $("#cure").html(pandemicOne.GetCure()+"%");
  });

  $("#hire-researchers").submit(function(e){
    e.preventDefault();
    pandemicOne.IncreaseResearchers(1);
    $("#researchers").html(pandemicOne.GetResearchers());
  });

  $("#fight-vaxxers").submit(function(e){
    e.preventDefault();
  });

  $("#release").submit(function(e){
    e.preventDefault();
  });
});

function UpdateStatistics()
{
  $("#total").html(pandemicOne.GetTotalPop());
  $("#healthy").html(pandemicOne.GetHealthy());
  $("#infected").html(pandemicOne.GetInfected());
  $("#cured").html(pandemicOne.GetCured());
  $("#dead").html(pandemicOne.GetDead());
  $("#anti-vaxxers").html(pandemicOne.GetAntiVaxxers());
  $("#infected-anti-vaxxers").html(pandemicOne.GetInfectedAntiVaxxers());
  $("#researchers").html(pandemicOne.GetResearchers());
  $("#cure").html(pandemicOne.GetCure()+"%");
  if(pandemicOne.GetReveal())
  {
    $("#type").html(pandemicOne.GetType());
  }
  else
  {
    $("#type").html("???");
  }
}
