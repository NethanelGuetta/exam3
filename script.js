var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var teamPlayers;
function saveToLocalStorage() {
    localStorage.setItem("teamPlayers", JSON.stringify(teamPlayers));
}
//get the array from local storage
function getFromLocalStorage() {
    var arr = JSON.parse(localStorage.getItem("teamPlayers") || '""');
    if (!arr) {
        // saveToLocalStorage();
        return [];
    }
    return arr;
}
// get a new array and update local storage
function updateLocalStorage(newArr) {
    localStorage.setItem("teamPlayers", JSON.stringify(newArr));
}
//input elements 
//team element
var teamContainer = document.getElementById("teamContainer");
var pgContainer = document.getElementById("PG");
var pgInfo = document.getElementById("pgInfo");
var sgContainer = document.getElementById("SG");
var sgInfo = document.getElementById("sgInfo");
var sfContainer = document.getElementById("SF");
var sfInfo = document.getElementById("sfInfo");
var pfContainer = document.getElementById("PF");
var pfInfo = document.getElementById("pfInfo");
var cContainer = document.getElementById("C");
var cInfo = document.getElementById("cInfo");
//input elements
var positionInput = document.getElementById("position");
var searchBtn = document.getElementById("searchPlayer");
var twoInput = document.getElementById("twoPercentRange");
var twoOutput = document.getElementById("twoValue");
twoOutput.textContent = twoInput.value;
twoInput.oninput = function () {
    twoOutput.textContent = twoInput.value;
};
var threeInput = document.getElementById("threePercentRange");
var threeOutput = document.getElementById("threeValue");
threeOutput.textContent = threeInput.value;
threeInput.oninput = function () {
    threeOutput.textContent = threeInput.value;
};
//points input
var pointInput = document.getElementById("pointRange");
var pointOutput = document.getElementById("pointValue");
pointOutput.textContent = pointInput.value;
pointInput.oninput = function () {
    pointOutput.textContent = pointInput.value;
};
//create the request 
searchBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var requestBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestBody = {
                    "position": positionInput.value,
                    "twoPercent": parseInt(twoInput.value),
                    "threePercent": parseInt(threeInput.value),
                    "points": parseInt(pointInput.value)
                };
                return [4 /*yield*/, fetcPlayers(requestBody)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//api rerquest
function fetcPlayers(requestBody) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://nbaserver-q21u.onrender.com/api/filter", {
                            method: "POST",
                            body: JSON.stringify(requestBody),
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("network error" + response);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    console.log(response);
                    renderTable(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//render the table
function renderTable(players) {
    var tBody = document.querySelector("#tBody");
    tBody.textContent = "";
    players.forEach(function (player) {
        var tr = document.createElement("tr");
        var playerNameTd = document.createElement("td");
        playerNameTd.textContent = player.playerName;
        tr.appendChild(playerNameTd);
        var positionrTd = document.createElement("td");
        positionrTd.textContent = player.position;
        tr.appendChild(positionrTd);
        var pointsTd = document.createElement("td");
        pointsTd.textContent = player.points.toString();
        tr.appendChild(pointsTd);
        var twoTd = document.createElement("td");
        twoTd.textContent = player.twoPercent.toString();
        tr.appendChild(twoTd);
        var threeTd = document.createElement("td");
        threeTd.textContent = player.threePercent.toString();
        tr.appendChild(threeTd);
        var actionTd = document.createElement("td");
        var addPlayerBtn = document.createElement("button");
        var firstName = player.playerName.split(" ");
        addPlayerBtn.textContent = "Add ".concat(firstName[0], " to Current Team");
        addPlayerBtn.addEventListener("click", function () { addToLocalStorage(player); });
        actionTd.appendChild(addPlayerBtn);
        tr.appendChild(actionTd);
        tBody.append(tr);
    });
}
function addToLocalStorage(player) {
    var oldArr = getFromLocalStorage();
    switch (player.position) {
        case "PG":
            oldArr[0] = player;
            break;
        case "SG":
            oldArr[1] = player;
            break;
        case "SF":
            oldArr[2] = player;
            break;
        case "PF":
            oldArr[3] = player;
            break;
        case "C":
            oldArr[4] = player;
            break;
    }
    updateLocalStorage(oldArr);
    renderTeamPlayers(oldArr);
}
function renderTeamPlayers(players) {
    players.forEach(function (player) {
        var playerDiv = document.createElement("div");
        var nameP = document.createElement("p");
        var nameSpan = document.createElement("span");
        nameSpan.textContent = player.playerName;
        nameP.appendChild(nameSpan);
        playerDiv.appendChild(nameP);
        var threePercentP = document.createElement("p");
        var threePercentSpan = document.createElement("span");
        threePercentSpan.textContent = "Three Precents: ".concat(player.threePercent.toString(), "%");
        threePercentP.appendChild(threePercentSpan);
        playerDiv.appendChild(threePercentP);
        var twoPercentP = document.createElement("p");
        var twoPercentSpan = document.createElement("span");
        twoPercentSpan.textContent = "Twoo Precents: ".concat(player.twoPercent.toString(), "%");
        twoPercentP.appendChild(twoPercentSpan);
        playerDiv.appendChild(twoPercentP);
        var pointPercentP = document.createElement("p");
        var pointSpan = document.createElement("span");
        pointSpan.textContent = "Points: ".concat(player.points.toString(), "%");
        pointPercentP.appendChild(pointSpan);
        playerDiv.appendChild(pointPercentP);
        switch (player.position) {
            case "PG":
                pgInfo.textContent = "";
                pgInfo.appendChild(playerDiv);
                pgContainer.appendChild(pgInfo);
                break;
            case "SG":
                sgInfo.textContent = "";
                sgInfo.appendChild(playerDiv);
                sgContainer.appendChild(sgInfo);
                break;
            case "SF":
                sfInfo.textContent = "";
                sfInfo.appendChild(playerDiv);
                sfContainer.appendChild(sfInfo);
                break;
            case "PF":
                pfInfo.textContent = "";
                pfInfo.appendChild(playerDiv);
                pfContainer.appendChild(pfInfo);
                break;
            case "C":
                cInfo.textContent = "";
                cInfo.appendChild(playerDiv);
                cContainer.appendChild(cInfo);
                break;
        }
    });
}
