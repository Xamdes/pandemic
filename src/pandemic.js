export class Pandemic
{
  constructor(totalPop,type = "Virus")
  {
    this.totalPopulation = totalPop;
    this.healthy = totalPop;
    this.cured = 0;
    this.dead = 0;
    this.infected = 0;
    this.infectedPerTick = 10;
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
    let tempHealthy = this.healthy;
    let tempInfected = this.infected;
    let infectedTick = this.infectedPerTick;
    let tempDead = this.dead;
    let floorTick = Math.floor(infectedTick);
    infectedTick *= (1+GetRandomArbitrary(0.1,0.3));

    if(this.cure >= 100)
    {
      if(tempHealthy < 1000)
      {
        this.cured += tempHealthy;
        tempHealthy = 0;
      }
      else
      {
        this.cured += 1000;
        tempHealthy -= 1000;
      }
      if(tempInfected < 1000)
      {
        this.cured += tempInfected;
        tempInfected = 0;
      }
      else
      {
        this.cured += 1000;
        tempInfected -= 1000;
      }
    }

    if(tempHealthy > 0)
    {
      tempHealthy -= floorTick;
      tempInfected += floorTick;
    }
    else
    {
      tempHealthy = 0;
    }

    if((tempInfected > 250 || tempDead > 0) && tempInfected > 0)
    {
      let goingToDie = Math.ceil(tempInfected * 0.05);
      tempInfected -= goingToDie;
    }

    this.healthy = tempHealthy;
    this.infected = tempInfected;
    this.dead = this.totalPopulation - (this.healthy+this.infected+this.cured);
    this.infectedPerTick = infectedTick;
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
