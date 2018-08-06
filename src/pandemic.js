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
    this.reveal = false;
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
      let healthyAmountCured = Math.floor(this.healthy*0.1);
      let infectedAmountCured = Math.floor(this.infected*0.05);

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

      this.cure -= 8;
    }
    else
    {
      this.cure = 0;
    }

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

    if((this.infected > 250 || this.dead > 0) && this.infected > 0)
    {
      let currentDeathPerTick = Math.ceil(this.infected * 0.10);

      this.infected -= currentDeathPerTick;
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
    if(this.cure >= 50)
    {
      this.reveal = true;
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

  RandomInfection()
  {
    let type = Math.floor(GetRandomArbitrary(1,3));
    this.SetType(type);
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

  GetReveal()
  {
    return this.reveal;
  }

  GetType()
  {
    return this.type;
  }

}

function GetRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
