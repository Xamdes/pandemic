import {Pandemic} from './../src/pandemic';
describe('Temp', function()
{
  var newPandemic;

  beforeEach(function() {
    jasmine.clock().install();
    newPandemic = new Pandemic(1000);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should show how beforeEach() works', function() {
    console.log(newPandemic.GetTotalPop());
    expect(newPandemic.GetTotalPop()).toEqual(1000);
  });

  it('sample test', function() {
    newPandemic.StartInfection();
    jasmine.clock().tick(1001);
    expect(newPandemic.GetInfected()).toEqual(10);
    expect(newPandemic.GetNormal()).toEqual(990);
  });

});
