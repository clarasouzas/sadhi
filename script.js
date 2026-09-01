
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
  const toast = (message, targetId="appToast") => {
    const el=document.getElementById(targetId); if(!el)return;
    el.querySelector(".toast-body").textContent=message;
    bootstrap.Toast.getOrCreateInstance(el,{delay:2600}).show();
  };

  const loginForm=document.getElementById("loginForm");
  if(loginForm){
    document.getElementById("togglePassword").addEventListener("click",()=>{
      const p=document.getElementById("password"), i=document.querySelector("#togglePassword i");
      p.type=p.type==="password"?"text":"password"; i.className=p.type==="password"?"bi bi-eye":"bi bi-eye-slash";
    });
    loginForm.addEventListener("submit",e=>{e.preventDefault(); location.href="pages/dashboard.html";});
    document.getElementById("suapBtn").addEventListener("click",()=>toast("A autenticação SUAP será integrada ao backend.","loginToast"));
    document.getElementById("forgot").addEventListener("click",e=>{e.preventDefault();toast("A recuperação de senha será integrada ao backend.","loginToast")});
  }

  const semester=document.getElementById("semesterSelect");
  if(semester){
    document.getElementById("selectSemester").onclick=()=>toast(`Semestre ${semester.value} selecionado.`);
    document.getElementById("clearSemester").onclick=()=>{semester.selectedIndex=0;toast("Seleção restaurada.");};
  }

  const search=document.getElementById("teacherSearch");
  if(search){
    const rows=[...document.querySelectorAll("#historyBody tr")];
    search.addEventListener("input",()=>{const q=search.value.toLowerCase();rows.forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?"":"none");});
    document.getElementById("clearHistory").onclick=()=>{search.value="";rows.forEach(r=>r.style.display="");toast("Filtros limpos.");};
    document.getElementById("exportHistory").onclick=()=>toast("Relatório preparado para exportação.");
    document.querySelectorAll(".history-btn").forEach(btn=>btn.onclick=()=>{
      document.getElementById("historyModalBody").innerHTML=`<div class="p-2"><h6 class="fw-bold">${btn.dataset.name}</h6><div class="list-group list-group-flush"><div class="list-group-item px-0 d-flex justify-content-between">2025.2 <span class="badge-soft">Sexta-feira</span></div><div class="list-group-item px-0 d-flex justify-content-between">2025.1 <span class="badge-soft">Segunda-feira</span></div><div class="list-group-item px-0 d-flex justify-content-between">2024.2 <span class="badge-soft">Quarta-feira</span></div></div></div>`;
      bootstrap.Modal.getOrCreateInstance(document.getElementById("historyModal")).show();
    });
  }

  const scheduleTitle=document.getElementById("scheduleTitle");
  if(scheduleTitle){
    document.querySelectorAll(".schedule-tabs button").forEach(btn=>btn.onclick=()=>{
      document.querySelectorAll(".schedule-tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
      const names={pessoas:"Alison Costa",turmas:"INFO 14 M",disciplinas:"Programação Web",dependencias:"Laboratório 01"};
      scheduleTitle.textContent=names[btn.dataset.tab];
      toast(`Visualização alterada para: ${btn.textContent}.`);
    });
    document.getElementById("clearSchedule").onclick=()=>toast("Filtros de horário limpos.");
    document.getElementById("searchSchedule").onclick=()=>toast("Horários atualizados.");
    document.getElementById("printSchedule").onclick=()=>window.print();
    document.querySelectorAll(".class").forEach(c=>c.onclick=()=>toast(`Aula: ${c.textContent.replace(/\s+/g," ").trim()}.`));
  }

  function tableSearch(inputId,bodyId){
    const input=document.getElementById(inputId),body=document.getElementById(bodyId); if(!input)return;
    input.addEventListener("input",()=>{const q=input.value.toLowerCase();body.querySelectorAll("tr").forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?"":"none")});
  }
  tableSearch("disciplineSearch","disciplineBody"); tableSearch("classSearch","classBody");

  const disciplineForm=document.getElementById("disciplineForm");
  if(disciplineForm){
    disciplineForm.onsubmit=e=>{e.preventDefault();const code=document.getElementById("newCode").value,name=document.getElementById("newName").value,hours=document.getElementById("newHours").value;document.getElementById("disciplineBody").insertAdjacentHTML("afterbegin",`<tr><td>${code}</td><td><strong>${name}</strong></td><td>Informática</td><td>${hours}</td><td><button class="btn btn-sm btn-outline-secondary edit-row">Editar</button></td></tr>`);bootstrap.Modal.getInstance(document.getElementById("disciplineModal")).hide();disciplineForm.reset();toast("Disciplina cadastrada com sucesso.");};
    document.getElementById("clearDiscipline").onclick=()=>{document.getElementById("disciplineSearch").value="";document.querySelectorAll("#disciplineBody tr").forEach(r=>r.style.display="");toast("Filtros limpos.")};
    document.getElementById("disciplineBody").addEventListener("click",e=>{if(e.target.classList.contains("edit-row"))toast("Modo de edição disponível para integração com o backend.");});
  }
  const classForm=document.getElementById("classForm");
  if(classForm){
    classForm.onsubmit=e=>{e.preventDefault();const code=document.getElementById("classCode").value,name=document.getElementById("className").value,period=document.getElementById("classPeriod").value;document.getElementById("classBody").insertAdjacentHTML("afterbegin",`<tr><td>${code}</td><td><strong>${name}</strong></td><td>Informática</td><td>${period}</td><td><button class="btn btn-sm btn-outline-success view-class">Ver detalhes</button></td></tr>`);bootstrap.Modal.getInstance(document.getElementById("classModal")).hide();classForm.reset();toast("Turma cadastrada com sucesso.");};
    document.getElementById("clearClass").onclick=()=>{document.getElementById("classSearch").value="";document.querySelectorAll("#classBody tr").forEach(r=>r.style.display="");toast("Filtros limpos.")};
    document.getElementById("classBody").addEventListener("click",e=>{if(e.target.classList.contains("view-class"))toast("Detalhes da turma selecionada.");});
  }
});
const campusSelect = document.getElementById("campusSelect");

if (campusSelect) {

    campusSelect.addEventListener("change", () => {

        const campusNames = {
            "spp": "São Paulo do Potengi",
            "santa-cruz": "Santa Cruz",
            "natal": "Natal",
            "zona-norte": "Zona Norte"
        };

        const campus = campusNames[campusSelect.value];

        toast(`Campus alterado para ${campus}.`);

    });

}