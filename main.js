var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleTruck = require('role.truck');
var roleHaul = require('role.haul');
var roleMelee = require('role.melee');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');
var roleHarvester = require('role.harvester');
var roleMinecart = require('role.minecart');
var roleColonist = require('role.colonist');
var RoomManager = require('RoomManager');
var TowerManager = require('TowerManager');
var Expansion = require('Expansion');

//var towers = require('tower');

module.exports.loop = function () {

    RoomManager.run();
    TowerManager.run();

    // var start = new RoomPosition(31, 15, "W48N48");
    // var end = new RoomPosition(44, 43, "W48N48");
    //
    //
    //   try {
    //     var myRoom = Game.rooms["W48N48"];
    //     var path = myRoom.findPath(start, end, {ignorecreeps: true});
    //     console.log(path[0]);
    //     for(var i in path){
    //       myRoom.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
    //     }
    //   } catch (e) {
    //
    //   }

    // var target = "W53N52";
    // Memory.rooms[target].scouted = true;
    // var terrain;
    // Memory.rooms[target].veins = [];
    // var sources = Game.rooms[target].find(FIND_SOURCES);
    // for(var s in sources){
    //   Memory.rooms[target].veins[s] = {};
    //   var found = false;
    //   var x = sources[s].pos.x;
    //   var y = sources[s].pos.y;
    //
    //   terrain = Game.rooms[target].lookAtArea(y-1,x-1,y+1,x+1, true); // top left bot rig
    //   for(var i in terrain){
    //     if(((terrain[i].type == "terrain") && (terrain[i].terrain == "plain" || terrain[i].terrain == "swamp")) && !found){
    //       console.log(target);
    //                     console.log(terrain[i].x + " " + terrain[i].y);
    //
    //       Game.rooms[target].createConstructionSite(terrain[i].x,terrain[i].y, STRUCTURE_CONTAINER);
    //
    //       Memory.rooms[target].veins[s].contX = terrain[i].x;
    //       Memory.rooms[target].veins[s].contY = terrain[i].y;
    //       Memory.rooms[target].veins[s].source = sources[s].id;
    //       found = true;
    //     }
    //   }
    // }

    //Memory.rooms = undefined;
    Expansion.init();
    Expansion.findRooms();
    Expansion.deployScouts();
    //Expansion.findRooms();

    //var sources = Game.room["W49N47"].find(FIND_SOURCES);
    //console.log(sources);
    // var sites = Game.rooms["W47N47"].find(FIND_CONSTRUCTION_SITES);
    // for(var i in sites){
    //   sites[i].remove();
    // }
    /*
    var start = new RoomPosition(1, 19, "W47N47");
    var end = new RoomPosition(26, 35, "W47N47");
    var path = start.findPathTo(end, {maxOps: 200});
    console.log(path);

    for(var i in path){
      var loc = new RoomPosition(path[i].x, path[i].y, "W47N47");
      loc.createConstructionSite(STRUCTURE_ROAD);
    }
    */
    //Game.market.createOrder(ORDER_SELL, RESOURCE_UTRIUM, .85, 100000, "W48N47");
    // console.log(Game.market.credits);
    // var targetRoom = "W48N47";
    // var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY &&
	  //    order.type == ORDER_BUY &&
    // Game.market.calcTransactionCost(5000, targetRoom, order.roomName) < 10000);
    // orders.sort((a,b) => b.price - a.price);
    // for(var i in orders){
    //   console.log(orders[i].id);
    //   console.log(orders[i].price);
    //   console.log(orders[i].roomName);
    //   console.log(Game.market.calcTransactionCost(10000, 'W48N47', orders[i].roomName));
    //   console.log(orders[i].remainingAmount);
    // }
    //
    //Game.market.deal()
     //var cost = Game.market.calcTransactionCost(50000, 'W48N47', "W48N48");
     //console.log(cost);
    // if(Game.getObjectById("580d26fd8e7ef04e4da04656").store[RESOURCE_ENERGY] > 10000){
    //     var deal = Game.market.deal('580fd2e9ade5e7f710d67bdc', 10000, "W48N47");
    //     console.log(deal);
    // }
    //

    // var linkFrom = Game.getObjectById("580a88090e1a2b6564385373"); // 48 47 left
    //
    // var linkTo = Game.getObjectById("580a543dc9d47b0e3a3422cc"); // 48 47 center
    //
    // if(linkFrom.energy >= 600){
    //     linkFrom.transferEnergy(linkTo);
    // }
    //
    // var linkFrom = Game.getObjectById("581096382538b4027143fea2"); // 48 47 top
    //
    // if(linkFrom.energy >= 600){
    //     linkFrom.transferEnergy(linkTo);
    // }
    //
    // var linkFrom = Game.getObjectById("5810b37ee6439dce1a0ae951"); // 48 48 center
    //
    // var linkTo = Game.getObjectById("58111a4c6046cb3f0c812454"); // 48 47 bot
    // var linkTo2 = Game.getObjectById("58168b2c443acf155eae16b2");
    //
    // if(linkTo2.energy <= 200 && linkFrom.energy == 800){
    //     linkFrom.transferEnergy(linkTo2);
    // }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'truck') {
            roleTruck.run(creep);
        }
        if(creep.memory.role == 'haul') {
            roleHaul.run(creep);
        }
        if(creep.memory.role == 'melee') {
            roleMelee.run(creep);
            //creep.memory.flag = "Flag2";
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'scout') {
            roleScout.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'minecart') {
            roleMinecart.run(creep);
        }
        if(creep.memory.role == 'colonist') {
            roleColonist.run(creep);
        }
    }
    var colonists = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonist' && (creep.memory.target == "W53N52" || creep.memory.target == "W51N50" || creep.memory.target == "W53N50"));

    if(colonists.length < 0) {
        var newName = Game.spawns['W48N48a'].createCreep([WORK,WORK,WORK,CARRY,CARRY, MOVE, MOVE, MOVE,MOVE,MOVE], undefined, {role: 'colonist', target: "W51N50"});
        //console.log('Spawning new melee: ' + newName);
    }


    var invaders = false;

        for(var name in Game.rooms) {
            var hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0){
                var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee' && creep.memory.target == name);

                if(melees.length < 2) {
                    var invaders = true;
                  //  var newName = Game.spawns['Centr'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, RANGED_ATTACK,MOVE,MOVE], undefined, {role: 'melee', target: name});
                    //console.log('Spawning new melee: ' + newName);
                }
            }

        }

    if(Game.spawns['E47N66a'].canCreateCreep([CLAIM]) == OK && !invaders) {

        for(var name in Game.flags){

            var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee' && creep.memory.flag == name);

            var targetPop = 1;
            if(name == "Flag2"){
              targetPop = 0;
            }

            if(melees.length < targetPop) {
                var newName = Game.spawns['Centr'].createCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, MOVE], undefined, {role: 'melee', flag: name});
                console.log('Spawning new melee: ' + newName);
            }
        }

                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.target == "W48N47" && creep.memory.x == 45 && creep.memory.y == 42 && creep.memory.source == "577b95494cfed2873076227f");

                if(harvesters.length < 0) {
                    var newName = Game.spawns['Centr'].createCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], undefined, {role: 'harvester', target: "W48N47", x: 45, y:42, source: "577b95494cfed2873076227f"});
                    //console.log('Spawning new melee: ' + newName);
                }

                var minecarts = _.filter(Game.creeps, (creep) => creep.memory.role == 'minecart' && creep.memory.target == "W48N47" && creep.memory.x == 45 && creep.memory.y == 42);

                if(minecarts.length < 0) {
                    var newName = Game.spawns['Centr'].createCreep([CARRY,MOVE], undefined, {role: 'minecart', target: "W48N47", x: 45, y:42});
                    //console.log('Spawning new melee: ' + newName);
                }



        var target = "W47N46";

        if(false){
            var melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee' && creep.memory.target == target);

            if(melees.length < 5) {
                var newName = Game.spawns['Centr'].createCreep([TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE, MOVE, MOVE, MOVE], undefined, {role: 'melee', target: target});
                console.log('Spawning new melee: ' + newName);
            }
        }


    }

    Memory.delayRun = Memory.delayRun + 1;
    if(Memory.delayRun > 20){
        Memory.delayRun = 0;
        //population counter
        /*
        var curMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;
        var curTrucks = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck').length;

        var maxMiner = 0;
        for( var i in veins ){
            maxMiner = maxMiner + (veins[i].slots * veins[i].mult);
        }

        var maxTruck = 0;
        for( var i in routes ){
            maxTruck = maxTruck + (routes[i].count);
        }

        console.log("Miners: " + curMiners + "/" + maxMiner + " Trucks: " + curTrucks  + "/" + maxTruck);
        */

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }

        for(var name in Game.rooms) {
            if(Game.rooms[name].energyAvailable > 0){
                console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
            }

        }
    }


}
