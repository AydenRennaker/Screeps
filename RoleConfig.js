/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('RoleConfig');
 * mod.thing == 'a thing'; // true
 */

var maxEnergyByLevel = {1: 300, 2: 550, 3: 800};
var partCost = {"carry": 50, "work": 100, "move": 50};
var partType = {"carry": CARRY, "move": MOVE}
var ratios = {
  "haul": {"carry": 1, "move": 1},
  "hauler": {"carry": 1, "move": 1},
  "miner": {"work": 2, "carry": 1, "move": 1},

}



module.exports = {
  getConfig: function(spawn, role){
    var roomLevel = Game.spawns[spawn].room.controller.level;
    
    var maxEnergy  = maxEnergyByLevel[roomLevel];
    var config = [];

    var costPerRatio = 0;
    for(var part in ratios[role]){
      costPerRatio += ratios[role][part] * partCost[part];
    }
    var maxRatios = maxEnergy / costPerRatio;

    if(maxRatios > roomLevel){
      maxRatios = roomLevel;
    }

    for(i = 0; i < maxRatios; i++){
      for(var part in ratios[role]){
        for(p = 0; p < ratios[role][part]; p++){
          config.push(partType[part]);
        }
      }
    }



    return config;

  }
};
