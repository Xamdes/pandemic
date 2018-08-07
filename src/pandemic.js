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
    this.antiVaxxers = 0;
    this.infectedAntiVaxxers = 0;
    this.researchers = 0;
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

    if(this.cure < 100)
    {
      this.cure += (this.researchers*.1);
    }

    //Cure the population every tick
    if(this.cure >= 100)
    {
      this.cure = 100;
      let healthyAmountCured = Math.floor(this.healthy*0.1);
      let infectedAmountCured = Math.floor(this.infected*0.05);

      //Cure Healthy
      if(this.healthy < healthyAmountCured)
      {
        this.cured += this.healthy;
        this.healthy = 0;
      }
      else
      {
        this.cured += healthyAmountCured;
        this.healthy -= healthyAmountCured;
      }

      //Cure Infected
      if(this.infected < infectedAmountCured)
      {
        this.cured += this.infected;
        this.infected = 0;
      }
      else
      {
        this.cured += infectedAmountCured;
        this.infected -= infectedAmountCured;
      }
    }
    else if(this.cure > 8)
    {
      let sabotage = 8+(this.antiVaxxers+this.infectedAntiVaxxers)%25;
      this.cure -= sabotage;
    }
    else
    {
      this.cure = 0;
    }

    //Increase Anti-Vaxxers Movement
    if(this.cure >=25)
    {
      let vaxxersIncrease = GetRandomArbitrary(50,250);

      if(this.healthy > vaxxersIncrease)
      {
        this.antiVaxxers += vaxxersIncrease;
        this.healthy -= vaxxersIncrease;
      }
      else
      {
        this.antiVaxxers += this.healthy;
        this.healthy = 0;
      }

    }

    //Turn Healthy into Infected every tick
    let floorTick = Math.floor(this.infectedPerTick);
    if(this.healthy > floorTick)
    {
      this.healthy -= floorTick;
      this.infected += floorTick;
    }
    else
    {
      this.infected += this.healthy;
      this.healthy = 0;
    }

    //Turn Anti-Vaxxers into Infected Anti-Vaxxers every tick
    floorTick = this.antiVaxxers*0.25;
    if(floorTick < 100)
    {
      floorTick = 100;
    }
    if(this.antiVaxxers > floorTick)
    {
      this.antiVaxxers -= floorTick;
      this.infectedAntiVaxxers += floorTick;
    }
    else
    {
      this.infectedAntiVaxxers += this.antiVaxxers;
      this.antiVaxxers = 0;
    }

    //Start killing 10% infected
    if((this.infected > 250 || this.dead > 0) && this.infected > 0)
    {
      if(this.infected < 25)
      {
        this.infected = 0;
      }
      else
      {
        this.infected -= Math.ceil(this.infected * 0.10);
      }
    }

    //Start killing 10% infected Anti Vaxxers
    if((this.infectedAntiVaxxers > 250 || this.dead > 0) && this.infectedAntiVaxxers > 0)
    {
      if(this.infectedAntiVaxxers < 10)
      {
        this.infectedAntiVaxxers = 0;
      }
      else
      {
        this.infectedAntiVaxxers -= Math.ceil(this.infectedAntiVaxxers * 0.10);
      }
    }

    //Update number of dead
    this.dead = this.totalPopulation - (this.healthy+this.infected+this.cured+this.antiVaxxers+this.infectedAntiVaxxers);

    //Update Infected Per Tick
    this.infectedPerTick *= (1+GetRandomArbitrary(0.1,0.3));
  }

  SetInfectionPerTickAmount(amount)
  {
    this.infectedPerTick = amount;
  }

  ResearchCure()
  {
    let min = 1;
    let max = 3;

    this.cure += GetRandomArbitrary(min,max);
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

  RandomInfection()
  {
    let type = Math.floor(GetRandomArbitrary(1,3));
    this.SetType(type);
  }


  GetHealthy()
  {
    return Math.floor(this.healthy);
  }

  GetInfected()
  {
    return Math.floor(this.infected);
  }

  GetDead()
  {
    return Math.floor(this.dead);
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

  GetReveal()
  {
    return (this.cure >= 50);
  }

  GetType()
  {
    return this.type;
  }

  GetResearchers()
  {
    return Math.floor(this.researchers);
  }

  SetResearchers(value)
  {
    this.researchers = value;
  }

  IncreaseResearchers(value)
  {
    this.researchers += value;
  }

  GetAntiVaxxers()
  {
    return Math.floor(this.antiVaxxers);
  }

  SetAntiVaxxers(value)
  {
    this.antiVaxxers = value;
  }

  IncreaseAntiVaxxers(value)
  {
    this.antiVaxxers += value;
  }

  GetInfectedAntiVaxxers()
  {
    return Math.floor(this.infectedAntiVaxxers);
  }

}

function GetRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
