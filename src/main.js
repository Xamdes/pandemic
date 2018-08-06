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
    $("#total").html(pandemicOne.GetTotalPop());
    $("#healthy").html(pandemicOne.GetHealthy());
    $("#infected").html(pandemicOne.GetInfected());
    $("#cured").html(pandemicOne.GetCured());
    $("#dead").html(pandemicOne.GetDead());
    $("#cure").html(pandemicOne.GetCure()+"%");
    if(pandemicOne.GetReveal())
    {
      $("#type").html(pandemicOne.GetType());
    }
    else
    {
      $("#type").html("???");
    }
  },1000);

  $("#search-generic").submit(function(e){
    e.preventDefault();
    pandemicOne.FindCure();
    $("#cure").html(pandemicOne.GetCure()+"%");
  });

  $("#search-virus").submit(function(e){
    e.preventDefault();
    pandemicOne.FindCure("Virus");
    $("#cure").html(pandemicOne.GetCure()+"%");
  });

  $("#search-fungal").submit(function(e){
    e.preventDefault();
    pandemicOne.FindCure("Fungal");
    $("#cure").html(pandemicOne.GetCure()+"%");
  });

  $("#search-bacterial").submit(function(e){
    e.preventDefault();
    pandemicOne.FindCure("Bacterial");
    $("#cure").html(pandemicOne.GetCure()+"%");
  });
});
