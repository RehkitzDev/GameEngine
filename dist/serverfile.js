// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"core\\AssetFactory.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AssetFactory {
    constructor(scene) {
        this.meshAssets = new Map();
        this.init(scene);
    }
    init(scene) {
        scene.meshes.forEach(mesh => {
            if (!this.meshAssets.has(mesh.name)) this.meshAssets.set(mesh.name, mesh);
        });
    }
    CreateMeshInstance(objectName, meshAssetName) {
        if (this.meshAssets.has(meshAssetName)) {
            let mesh = this.meshAssets.get(meshAssetName).createInstance(objectName);
            mesh.setEnabled(true);
            return mesh;
        }
        return null;
    }
}
exports.AssetFactory = AssetFactory;
},{}],"core\\GameObjectManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameObjectManager {
    constructor(assetFactory) {
        this.assetFactory = assetFactory;
        this.gameObjects = new Array();
        this.networkedGameObjects = new Map();
        this.connectedPlayers = new Map();
    }
    getFreePlayerId() {
        for (let i = 0; i < 65535; i++) if (!this.connectedPlayers.has(i)) return i;
        return -1;
    }
    getFreeGameObjectId() {
        for (let i = 0; i < 65535; i++) if (!this.networkedGameObjects.has(i)) return i;
        return -1;
    }
    addNetworkedGameObject(gameObject) {
        if (!this.networkedGameObjects.has(gameObject.getId())) this.networkedGameObjects.set(gameObject.getId(), gameObject);
    }
    addOfflineGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
    removeNetworkedGameObject(gameObject) {
        if (this.networkedGameObjects.has(gameObject.getId())) {
            gameObject.getMesh().dispose();
            this.networkedGameObjects.delete(gameObject.getId());
        }
    }
    removeGameObject(gameObject) {
        gameObject.getMesh().dispose();
        this.gameObjects = this.gameObjects.filter(g => g != gameObject);
    }
    update(deletaTime) {
        this.gameObjects.forEach(gameObject => {
            gameObject.Update(deletaTime);
        });
        this.networkedGameObjects.forEach((gameObject, id) => {
            gameObject.Update(deletaTime);
        });
    }
}
exports.GameObjectManager = GameObjectManager;
},{}],"core\\REngine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const babylonjs_1 = require("babylonjs");
const AssetFactory_1 = require("./AssetFactory");
const GameObjectManager_1 = require("./GameObjectManager");
class REngine {
    constructor(babylonEngine, ws) {
        this.babylonEngine = babylonEngine;
        this.webSocket = ws;
        this.scene = new babylonjs_1.Scene(this.babylonEngine);
        this.assetManager = new babylonjs_1.AssetsManager(this.scene);
        this.assetFactory = null;
        this.gameObjectManager = null;
        this.assetManager.onFinish = tasks => {
            this.init();
        };
    }
    getDeltaTime() {
        return this.babylonEngine.getDeltaTime() / 1000;
    }
    getAssetManager() {
        return this.assetManager;
    }
    getAssetFactory() {
        return this.assetFactory;
    }
    getGameObjectManager() {
        return this.gameObjectManager;
    }
    Update(deltaTime) {
        this.gameObjectManager.update(deltaTime);
    }
    init() {
        this.assetFactory = new AssetFactory_1.AssetFactory(this.scene);
        this.gameObjectManager = new GameObjectManager_1.GameObjectManager(this.assetFactory);
        this.webSocket.connect();
        this.scene.onBeforeRenderObservable.add(() => {
            this.Update(this.getDeltaTime());
        });
        if (!(this.babylonEngine instanceof babylonjs_1.NullEngine)) this.babylonEngine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}
exports.REngine = REngine;
},{"./AssetFactory":"core\\AssetFactory.ts","./GameObjectManager":"core\\GameObjectManager.ts"}],"core\\networking\\RWebSocket.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class RWebSocket {}
exports.RWebSocket = RWebSocket;
},{}],"server\\networking\\WebSocketServer.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws = __importStar(require("ws"));
const RWebSocket_1 = require("../../core/networking/RWebSocket");
class WebSocketServer extends RWebSocket_1.RWebSocket {
    constructor(port, gameObjectManager) {
        super();
        this.wsServer = null;
        this.port = port;
        this.gameObjectManager = gameObjectManager;
    }
    connect() {
        this.wsServer = new ws.Server({ port: this.port });
        this.wsServer.on("listening", () => {
            console.log("websocket listening on port " + this.port);
        });
        this.wsServer.addListener("connection", this.onPlayerConnection);
    }
    onPlayerConnection(ws) {
        console.log("websocket connection");
        console.log(ws);
        //ws.addEventListener("message")
    }
    onPlayerMessage() {}
}
exports.WebSocketServer = WebSocketServer;
},{"../../core/networking/RWebSocket":"core\\networking\\RWebSocket.ts"}],"server\\RServer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const REngine_1 = require("../core/REngine");
const babylonjs_1 = require("babylonjs");
const WebSocketServer_1 = require("./networking/WebSocketServer");
class RServer extends REngine_1.REngine {
    constructor(port) {
        super(new babylonjs_1.NullEngine(), new WebSocketServer_1.WebSocketServer(port));
        console.log("success");
    }
}
exports.RServer = RServer;
},{"../core/REngine":"core\\REngine.ts","./networking/WebSocketServer":"server\\networking\\WebSocketServer.ts"}],"serverfile.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RServer_1 = require("./server/RServer");
let rserver = new RServer_1.RServer(1337);
rserver.getAssetManager().load();
//README: "parcel --target=node dist/serverfile.js" BEI NODE ENV
},{"./server/RServer":"server\\RServer.ts"}]},{},["serverfile.ts"], null)
//# sourceMappingURL=/serverfile.map