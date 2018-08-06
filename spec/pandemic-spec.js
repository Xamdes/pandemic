import {Pandemic} from './../src/pandemic';
describe('Pandemic', function()
{
  let newPandemic;

  beforeEach(function() {
    jasmine.clock().install();
    newPandemic = new Pandemic(1000);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should show how beforeEach() works', function() {
    expect(newPandemic.GetTotalPop()).toEqual(1000);
  });

  it('test starting infection', function() {
    newPandemic.StartInfection();
    jasmine.clock().tick(1001);
    expect(newPandemic.GetInfected()).toEqual(10);
    expect(newPandemic.GetHealthy()).toEqual(990);
  });

  it('test ending infection', function() {
    newPandemic.StartInfection();
    jasmine.clock().tick(10001);
    expect(newPandemic.GetInfected()).toEqual(100);
    expect(newPandemic.GetHealthy()).toEqual(900);
    newPandemic.StopInfection();
    jasmine.clock().tick(10001);
    expect(newPandemic.GetInfected()).toEqual(100);
    expect(newPandemic.GetHealthy()).toEqual(900);
  });

});
