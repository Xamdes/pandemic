export class Pandemic
{
  constructor(totalPop,type = "Virus")
  {
    this.totalPopulation = totalPop;
    this.healthy = totalPop;
    this.cured = 0;
    this.dead = 0;
    this.infected = 0;
    this.infectedPerTick = 100;
    this.interval;
    this.cure = 0;
    this.type = type;
  }

  StartInfection(seconds = 1)
  {
    const milliseconds = seconds*1000;
    this.interval = setInterval(() => {
      this.InfectionSpread();
    },milliseconds);
  }

  StopInfection()
  {
    clearInterval(this.interval);
  }

  InfectionSpread()
  {
    let floorTick = Math.floor(this.infectedPerTick);
    this.infectedPerTick *= (1+GetRandomArbitrary(0.1,0.3));

    if(this.cure >= 100)
    {
      if(this.healthy < 1000)
      {
        this.cured += this.healthy;
        this.healthy = 0;
      }
      else
      {
        this.cured += 1000;
        this.healthy -= 1000;
      }
      if(this.infected < 1000)
      {
        this.cured += this.infected;
        this.infected = 0;
      }
      else
      {
        this.cured += 1000;
        this.infected -= 1000;
      }
    }
    else if(this.cure > 0)
    {
      if(this.cure > 8)
      {
        this.cure -= 8;
      }
      else
      {
        this.cure = 0;
      }

    }

    if(this.healthy > 0)
    {
      this.healthy -= floorTick;
      this.infected += floorTick;
    }
    else
    {
      this.healthy = 0;
    }

    this.dead = this.totalPopulation - (this.healthy+this.infected+this.cured);
    if((this.infected > 250 || this.dead > 0) && this.infected > 0)
    {
      let goingToDie = Math.ceil(this.infected * 0.05);
      this.infected -= goingToDie;
    }

    this.dead = this.totalPopulation - (this.healthy+this.infected+this.cured);
  }

  SetInfectionPerTickAmount(amount)
  {
    this.infectedPerTick = amount;
  }

  FindCure(guess)
  {
    let min = 1;
    let max = 3;

    if(guess === this.type)
    {
      min = 2;
      max = 4;
    }

    this.cure += GetRandomArbitrary(min,max);
    if(this.cure >= 100)
    {
      this.cure = 100;
    }
  }

  SetType(type)
  {
    switch(type)
    {
    case 1:
      this.type="Virus";
      break;
    case 2:
      this.type="Fungus";
      break;
    case 3:
      this.type="Bacterial";
      break;
    default:
      this.type="Virus";
    }
  }


  GetHealthy()
  {
    return this.healthy;
  }

  GetInfected()
  {
    return this.infected;
  }

  GetDead()
  {
    return this.dead;
  }

  GetTotalPop()
  {
    return this.totalPopulation;
  }

  GetCured()
  {
    return this.cured;
  }

  GetCure()
  {
    return Math.round(this.cure);
  }

}

function GetRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
