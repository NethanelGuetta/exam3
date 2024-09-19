//interface
interface Player {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    playerName: string;
}
let teamPlayers: [Player, Player, Player, Player, Player];
function saveToLocalStorage() {
    localStorage.setItem("teamPlayers", JSON.stringify(teamPlayers));
}
//get the array from local storage
function getFromLocalStorage(): Player[] {
    const arr = JSON.parse(localStorage.getItem("teamPlayers") || '""');
    if (!arr) {
        saveToLocalStorage();
        return [];
    }
    return arr;
}
// get a new array and update local storage
function updateLocalStorage(newArr: Player[]) {
    localStorage.setItem("teamPlayers", JSON.stringify(newArr));
}
//input elements 
//team element
const teamContainer = document.getElementById("teamContainer") as HTMLDivElement;
const pgContainer = document.getElementById("PG") as HTMLDivElement;
const pgInfo = document.getElementById("pgInfo") as HTMLDivElement;

const sgContainer = document.getElementById("SG") as HTMLDivElement;
const sgInfo = document.getElementById("sgInfo") as HTMLDivElement;

const sfContainer = document.getElementById("SF") as HTMLDivElement;
const sfInfo = document.getElementById("sfInfo") as HTMLDivElement;

const pfContainer = document.getElementById("PF") as HTMLDivElement;
const pfInfo = document.getElementById("pfInfo") as HTMLDivElement;

const cContainer = document.getElementById("C") as HTMLDivElement;
const cInfo = document.getElementById("cInfo") as HTMLDivElement;

//input elements
let positionInput = document.getElementById("position") as HTMLSelectElement;
let searchBtn = document.getElementById("searchPlayer") as HTMLButtonElement;
let addTeamBtn = document.getElementById("addTeam") as HTMLButtonElement;
let twoInput = document.getElementById("twoPercentRange") as HTMLInputElement;
let twoOutput = document.getElementById("twoValue") as HTMLSpanElement;
twoOutput.textContent = twoInput.value;
twoInput.oninput = function () {
    twoOutput.textContent = twoInput.value;
}
let threeInput = document.getElementById("threePercentRange") as HTMLInputElement;
let threeOutput = document.getElementById("threeValue") as HTMLSpanElement;
threeOutput.textContent = threeInput.value;
threeInput.oninput = function () {
    threeOutput.textContent = threeInput.value;
}
//points input
let pointInput = document.getElementById("pointRange") as HTMLInputElement;
let pointOutput = document.getElementById("pointValue") as HTMLSpanElement;
pointOutput.textContent = pointInput.value;
pointInput.oninput = function () {
    pointOutput.textContent = pointInput.value;
}
//create the request 
searchBtn.addEventListener("click", async () => {
    const requestBody = {
        "position": positionInput.value,
        "twoPercent": parseInt(twoInput.value),
        "threePercent": parseInt(threeInput.value),
        "points": parseInt(pointInput.value)
    }
    await fetcPlayers(requestBody)
})
//api rerquest
async function fetcPlayers(requestBody) {

    try {
        const response = await fetch("https://nbaserver-q21u.onrender.com/api/filter", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error("network error" + response);
        }
        const data = await response.json();
        console.log(data);
        console.log(response);
        renderTable(data);
    } catch (error) {
        console.log(error)
    }
}
//render the table
function renderTable(players: Player[]) {
    const tBody = document.querySelector("#tBody") as HTMLDivElement;
    tBody.textContent = "";

    players.forEach(player => {
        const tr = document.createElement("tr");
        const playerNameTd = document.createElement("td");
        playerNameTd.textContent = player.playerName;
        tr.appendChild(playerNameTd);

        const positionrTd = document.createElement("td");
        positionrTd.textContent = player.position;
        tr.appendChild(positionrTd);

        const pointsTd = document.createElement("td");
        pointsTd.textContent = player.points.toString();
        tr.appendChild(pointsTd);

        const twoTd = document.createElement("td");
        twoTd.textContent = player.twoPercent.toString();
        tr.appendChild(twoTd);

        const threeTd = document.createElement("td");
        threeTd.textContent = player.threePercent.toString();
        tr.appendChild(threeTd);

        const actionTd = document.createElement("td");
        const addPlayerBtn = document.createElement("button");
        const firstName = player.playerName.split(" ");
        addPlayerBtn.textContent = `Add ${firstName[0]} to Current Team`;
        addPlayerBtn.addEventListener("click", () => { addToLocalStorage(player); });
        actionTd.appendChild(addPlayerBtn);
        tr.appendChild(actionTd);

        tBody.append(tr);
    });
}
function addToLocalStorage(player: Player) {
    let oldArr = getFromLocalStorage();
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
    renderTeamPlayers(oldArr)
}
function renderTeamPlayers(players: Player[]) {
    players.forEach(player => {
        const playerDiv = document.createElement("div");
        const nameP = document.createElement("p");
        const nameSpan = document.createElement("span");
        nameSpan.textContent = player.playerName;
        nameP.appendChild(nameSpan);
        playerDiv.appendChild(nameP)

        const threePercentP = document.createElement("p");
        const threePercentSpan = document.createElement("span");
        threePercentSpan.textContent = `Three Precents: ${player.threePercent.toString()}%`;
        threePercentP.appendChild(threePercentSpan);
        playerDiv.appendChild(threePercentP);

        const twoPercentP = document.createElement("p");
        const twoPercentSpan = document.createElement("span");
        twoPercentSpan.textContent = `Twoo Precents: ${player.twoPercent.toString()}%`;
        twoPercentP.appendChild(twoPercentSpan);
        playerDiv.appendChild(twoPercentP);

        const pointPercentP = document.createElement("p");
        const pointSpan = document.createElement("span");
        pointSpan.textContent = `Points: ${player.points.toString()}%`;
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
                sfContainer.appendChild(sfInfo); break;
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
document.addEventListener("DOMContentLoaded", () => {
    let playerArry = getFromLocalStorage();
    renderTeamPlayers(playerArry);    
})
//bonus
interface Teams{
    players:Player[];
}
async function addAteamToApi() {
    let team = localStorage.getItem("teamPlayers");
    // const newTeam:Teams = {
    //     players: team
    // }
    const newTeam = {
        players: team
    }
    console.log(team);
    try {
        const response = await fetch("https://nbaserver-q21u.onrender.com/api/AddTeam", {
            method: "POST",
            body: JSON.stringify(newTeam),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error("network error" + response);
        }
        const data = await response.json();
        console.log(data);
        console.log(response);
        renderTable(data);
    } catch (error) {
        console.log(error)
    }
}

addTeamBtn.addEventListener("click",  () => addAteamToApi() 
);