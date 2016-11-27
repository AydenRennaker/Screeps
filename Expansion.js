/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Expansion');
 * mod.thing == 'a thing'; // true
 */




module.exports = {

    deployScouts: function(){
      var rooms = Memory.rooms;
      for (var room in rooms){
        if(rooms[room].scouted == undefined && rooms[room].level == undefined){
          var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.target == rooms[room].name);
          if(scouts < 1){
            Game.rooms[rooms[room].Connection].find(FIND_MY_SPAWNS)[0].createCreep([MOVE], undefined, {role: 'scout', target: rooms[room].name});
          }
        }else if(rooms[room].scouted == undefined){
          var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout' && creep.memory.target == rooms[room].name);
          if(scouts < 1){
            Game.rooms[rooms[room].name].find(FIND_MY_SPAWNS)[0].createCreep([MOVE], undefined, {role: 'scout', target: rooms[room].name});
          }
        }
      }
    },

    init: function(){
      if(Memory.rooms == undefined){
        Memory.rooms = {};
        for(var i in Game.spawns){
          var name = Game.spawns[i].room.name;
          addRoom(name);
          findSpawns();
        }

      }
    },



    findRooms: function(){
      var rooms = Memory.rooms;
      for(var i in rooms){

            /*
            var sources = Game.rooms[i].find(FIND_SOURCES);
            Memory.rooms[i].sources = sources;

            Memory.rooms[i].scouted = true;

            var terrain;
            Memory.rooms[i].veins = [];
            for(var s in sources){
              Memory.rooms[i].veins[s] = {};
              var found = false;
              var x = sources[s].pos.x;
              var y = sources[s].pos.y;

              terrain = Game.rooms[i].lookAtArea(y-1,x-1,y+1,x+1, true); // top left bot rig
              for(var t in terrain){
                //console.log(terrain[i].terrain);
                // console.log(target);
                // console.log(terrain[i].terrain);
                // console.log(terrain[i].x + " " + terrain[i].y);
                if(((terrain[t].type == "terrain") && (terrain[t].terrain == "plain" || "swamp")) && !found){
                  //console.log(target);
                                console.log(terrain[t].x + " " + terrain[t].y);

                  //creep.room.createConstructionSite(terrain[t].x,terrain[t].y, STRUCTURE_CONTAINER);

                  Memory.rooms[i].veins[s].contX = terrain[t].x;
                  Memory.rooms[i].veins[s].contY = terrain[t].y;
                  Memory.rooms[i].veins[s].source = sources[s].id;
                  found = true;
                }
              }
            }
            */






        if(rooms[i].spawns != undefined){
          var mainRoom = rooms[i].name;

          var exits = Game.rooms[rooms[i].name].find(FIND_EXIT_TOP);

          if(exits.length > 0){
            var side = rooms[i].RQx + rooms[i].Rx + rooms[i].RQy + (parseInt(rooms[i].Ry) + 1);
            addRoom(side, mainRoom);
          }

          var exits = Game.rooms[rooms[i].name].find(FIND_EXIT_BOTTOM);

          if(exits.length > 0){
            var side = rooms[i].RQx + rooms[i].Rx + rooms[i].RQy + (parseInt(rooms[i].Ry) - 1);
            addRoom(side, mainRoom);
          }

          var exits = Game.rooms[rooms[i].name].find(FIND_EXIT_LEFT);

          if(exits.length > 0){
            var side = rooms[i].RQx + (parseInt(rooms[i].Rx) + 1) + rooms[i].RQy + rooms[i].Ry;
            addRoom(side, mainRoom);
          }

          var exits = Game.rooms[rooms[i].name].find(FIND_EXIT_RIGHT);

          if(exits.length > 0){
            var side = rooms[i].RQx + (parseInt(rooms[i].Rx) - 1) + rooms[i].RQy + rooms[i].Ry;
            addRoom(side, mainRoom);
          }





        }


      }


    }
};

function addRoom(roomName, mainRoom){
  var data = Memory.rooms;
  var coords = roomName.match(/[a-zA-Z]+|[0-9]+/g);


  if(data[roomName] == undefined){
    console.log("Room: " + roomName + " was added to the list.");
    if(mainRoom != undefined){
      data[roomName] = {name: roomName, RQx: coords[0], Rx: coords[1], RQy: coords[2], Ry: coords[3], Connection: mainRoom};
    }else{
      data[roomName] = {name: roomName, RQx: coords[0], Rx: coords[1], RQy: coords[2], Ry: coords[3]};
    }
      Memory.rooms = data;
  }

}

function findSpawns(){
  var data = Memory.rooms;
  for(var r in data){
    console.log(data[r].spawns);
    if(data[r].spawns == undefined){
      data[r].spawns = [];
    }
      var spawns = Game.rooms[r].find(FIND_MY_SPAWNS);
      if(spawns.length > 0){
        data[r].spawns = {}
        for(var i in spawns){
          data[r].spawns[i] = {id: spawns[i].id};
        }
        data[r].status = "claimed";
        data[r].level = Game.rooms[r].controller.level;
      }
  }

}
