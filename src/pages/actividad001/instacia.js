console.log("Actividad 1 - modificada x3");
import "../../style.css";
import javascriptLogo from "../../../javascript.svg";
/*import viteLogo from "../src/fotos/viteLogo"; no funciona*/
import viteLogo from "../../../vite.svg";
// import { setupCounter } from "../src/funciones/counter";
import { showResult } from "../../funciones/ShowResult";

document.querySelector("#ancla").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h2>Calculadora</h2>
    <input type="text" id="numero1" placeholder="inserte numero 1">
    <select id="operacion">
      <option value="suma">+</option>
      <option value="resta">-</option>
      <option value="division">/</option>
      <option value="multip">*</option>
    </select>
    <input type="text" id="numero2" placeholder="inserte numero 2">
    <div class="card">
      <button id="btn-actividad" type="button">Calcular</button>
      <p id="showRes"></p>
    </div>
  </div>
`;

document.getElementById("btn-actividad").addEventListener("click", () => {
  showResult(
    document.querySelector("#showRes"),
    document.getElementById("numero1").value,
    document.getElementById("numero2").value,
    document.getElementById("operacion").value
  );
});
