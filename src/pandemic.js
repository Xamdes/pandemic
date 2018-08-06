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
  }

  StartInfection(occurance = 1)
  {
    const seconds = occurance*1000;
    let infection = this.InfectionSpread();
    setInterval(function(){infection;}, seconds);
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
