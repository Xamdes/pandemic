export class Pandemic
{
  constructor(totalPop)
  {
    this.totalPopulation = totalPop;
    this.normal = totalPop;
    this.cured = 0;
    this.dead = 0;
    this.infected = 0;
    this.infectedPerTick = 10;
    this.interval;
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
    let tempNormal = this.normal;
    let infectedTick = this.infectedPerTick;
    let tempInfected = this.infected;

    tempNormal -= infectedTick;
    tempInfected += infectedTick;
    this.normal = tempNormal;
    this.infected = tempInfected;
  }

  SetInfectionAmount(amount)
  {
    this.infectedPerTick = amount;
  }

  GetNormal()
  {
    return this.normal;
  }

  GetInfected()
  {
    return this.infected;
  }

  GetTotalPop()
  {
    return this.totalPopulation;
  }

}
