var roleConfig = require("RoleConfig");
var roomLevel = {"E47N66": 0};

var haulPop = {"E47N66": 1};

var upgraderPop = {"E47N66": 1};

var upgradersConfig = {0: [WORK,CARRY,CARRY,MOVE,MOVE], 1: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 2: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], 3: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]};


var builderPop = {"E47N66": 1};
var buildersConfig = {0: [WORK,CARRY,CARRY,MOVE,MOVE], 1: [WORK,WORK,CARRY,CARRY,MOVE,MOVE], 2: [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], 3: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]};

var minersConfig = {0: [WORK,CARRY,CARRY,MOVE,MOVE], 1: [WORK,WORK,WORK,CARRY,MOVE], 2: [WORK,WORK,WORK,WORK,CARRY,MOVE]};

var haulersConfig = {0: [CARRY,CARRY,MOVE,MOVE], 1: [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 2: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 3: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]};

var routes = {"E47N66": [
    // {source:"580db5d30763207315f27ebb", dest:"58058b1d02a5ed1a461aab15", count:2}, //48 47 BOT
  ]
}

module.exports = {

    run: function(){


      for(var room in Memory.rooms){
        spawnHaulers(room);
        //layRoads("W49N47");
        spawnMiners(room);
        autoBuilders(room);
      }


      for(var name in Game.spawns) {
           var roomName = Game.spawns[name].room.name;

           spawnUpgraders(roomName);
           spawnHauls(roomName);
           spawnBuilders(roomName);

          for( var i in routes[roomName]){
            var source = routes[roomName][i].source;
            var targetPop = routes[roomName][i].count;
            var trucks = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck' && creep.memory.source == routes[roomName][i].source && creep.memory.dest == routes[roomName][i].dest);

            // var sourceObj = Game.getObjectById(source);
            // if(sourceObj.structureType == STRUCTURE_CONTAINER && sourceObj.structure){
            //   var energy = sourceObj.store.energy;
            //   if(energy > 1300){
            //     targetPop = targetPop + 1;
            //   }
            // }

            if(trucks.length < targetPop) {
                var newName = Game.spawns[name].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'truck', source: routes[roomName][i].source, dest: routes[roomName][i].dest});
                console.log('Spawning new truck: ' + newName);
            }

          }

      }
    }
}

function checkHauls(target){
    var hauls = _.filter(Game.creeps, (creep) => creep.memory.role == 'haul' && creep.memory.target == target);
    return hauls.length;
}

function spawnHauls(roomName){
  if(checkHauls(roomName) < haulPop[roomName]) {


      var newName = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep(roleConfig.getConfig(Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].name, "haul"), undefined, {role: 'haul', target: roomName});
      console.log('Spawning new haul: ' + newName);
  }
}

function spawnMiners(room){
    if(Memory.rooms[room].status != "enemy"){

      for(var i in Memory.rooms[room].veins){
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.target == room && creep.memory.vein == i);

        memSet = {role: 'miner', target: room, vein: i, x: Memory.rooms[room].veins[i].contX, y: Memory.rooms[room].veins[i].contY, source: Memory.rooms[room].veins[i].source};

        var config = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
        console.log(room + " " + roomLevel[room]  );


        //this returns an errr if the room is not visible ie no creeps in room.
        try {
          if(roomLevel[Memory.rooms[room].Connection] == 0){
              config = [WORK,WORK,MOVE];
          }else if(roomLevel[room] == 0){
            config = [WORK,CARRY,MOVE];
          }
          if(roomLevel[Memory.rooms[room].Connection] == 1){
              config = [WORK,WORK,CARRY,MOVE];
          }else if(roomLevel[room] == 1){
            config = [WORK,WORK,CARRY,MOVE];
          }else if(Game.getObjectById(Memory.rooms[room].veins[i].source).energyCapacity == 3000){
            config = [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
          }else{
            config = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
          }
        } catch (e) {

        }


        if(miners.length < 1) {
          var roomName;
          if(Memory.rooms[room].Connection != undefined){
            roomName = Memory.rooms[room].Connection;
          }else{
            roomName = room;
          }
            Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep(config, undefined, memSet);
        }
      }
    }
}

function spawnHaulers(room){
    if(Memory.rooms[room].status != "enemy"){
      for(var i in Memory.rooms[room].veins){
        var roomName;
        if(Memory.rooms[room].Connection != undefined){
          roomName = Memory.rooms[room].Connection;
        }else{
          roomName = room;
        }


        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.target == room && creep.memory.contX == Memory.rooms[room].veins[i].contX && creep.memory.contY == Memory.rooms[room].veins[i].contY && creep.memory.dest == roomName);

        var config = [CARRY,CARRY,MOVE,MOVE]
        var memSet =  {role: 'hauler', target: room, contX: Memory.rooms[room].veins[i].contX, contY: Memory.rooms[room].veins[i].contY, dest: roomName};

        var contX = Memory.rooms[room].veins[i].contX;
        var contY = Memory.rooms[room].veins[i].contY;

        var targetPop = 1;

        try {
          var cont = Game.rooms[room].lookForAt(LOOK_STRUCTURES, contX, contY);
          var energy = cont[0].store.energy;

          if(energy == 2000){
            targetPop = targetPop + 3;
            console.log("Boosting Creeps to Handle HIGH Capacity in: " + room);
          }else if(energy > 1500){
            targetPop = targetPop + 2;
          }else if(energy > 1000){
            targetPop = targetPop + 1;
          }else if(energy < 300){
              targetPop = targetPop - 1;
          }
        } catch (e) {

        }
        // var targetPop;
        // if(Game.getObjectById(Memory.rooms[room].veins[i].source).energyCapacity == 3000 && (room != "W48N47" || "W48N48")){
        //   targetPop = 3;
        // }else{
        //   targetPop = 2;
        // }
        if(haulers.length < targetPop) {

            Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep(config, undefined, memSet);
        }
      }
    }
}

function layRoads(room){
  for(var i in Memory.rooms[room].veins){
    var contX = Memory.rooms[room].veins[i].contX;
    var contY = Memory.rooms[room].veins[i].contY;
    var start = new RoomPosition(contX, contY, room);
    var end = new RoomPosition(48, 9, room);

    console.log(room);
    console.log(Memory.rooms[room].Connection);
    //var end = Game.map.findRoute(room, Memory.rooms[room].Connection);

      try {
        var myRoom = Game.rooms[room];
        var path = myRoom.findPath(start, end, {ignorecreeps: true});
        console.log(path[0]);
        for(var i in path){
          myRoom.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
        }
      } catch (e) {

      }
  }
}

function autoBuilders(room){
  try {
      var sites = Game.rooms[room].find(FIND_CONSTRUCTION_SITES);
      var repair = Game.rooms[room].find(FIND_STRUCTURES, {
          filter: object => object.hits < object.hitsMax && (object.structureType != (STRUCTURE_WALL || STRUCTURE_RAMPART))
      });
      var totalSites = (sites.length + repair.length);
      if(Memory.delayRun == 10){
        console.log("There are " + totalSites + " construction sites in " + room);
      }

      if(totalSites > 3){

        var targetPop = 1;
        if(totalSites > 50){
          targetPop = 2
        }else if(totalSites > 30){
          targetPop = 1;
        }

        if(room == "W49N48" && targetPop > 1){
          targetPop = 1;
        }
        if(room == "W48N46"){
          targetPop = 0;
        }
        if(room == "W48N47"){
          targetPop = 0;
        }


        var roomName;
        if(Memory.rooms[room].Connection != undefined){
          roomName = Memory.rooms[room].Connection;
        }else{
          roomName = room;
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.target == room);
        if(builders.length < targetPop){
          Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder', target: room});
        }

      }

  } catch (e) {

  }
}

function spawnUpgraders(roomName){

      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.target == roomName);

      if(upgraders.length < upgraderPop[roomName]) {
          var newName = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep(upgradersConfig[roomLevel[roomName]], undefined, {role: 'upgrader', target: roomName});
          console.log('Spawning new upgrader: ' + newName);
      }
}

function spawnBuilders(roomName){

      var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.target == roomName);

      if(builders.length < builderPop[roomName]) {
          var newName = Game.rooms[roomName].find(FIND_MY_SPAWNS)[0].createCreep(buildersConfig[roomLevel[roomName]], undefined, {role: 'builder', target: roomName});
          console.log('Spawning new builder: ' + newName);
      }
}
