const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2800);
}

menuButton?.addEventListener("click", function () {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menu?.classList.toggle("is-open", !open);
});

menu?.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menuButton?.setAttribute("aria-expanded", "false");
    menu?.classList.remove("is-open");
  });
});

window.addEventListener("scroll", function () { header?.classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });
document.querySelectorAll("[data-year]").forEach(function (node) { node.textContent = String(new Date().getFullYear()); });

const reveals = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  reveals.forEach(function (node) { observer.observe(node); });
} else {
  reveals.forEach(function (node) { node.classList.add("is-visible"); });
}

document.querySelectorAll("[data-tabs]").forEach(function (group) {
  group.querySelectorAll("[data-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = button.dataset.tab;
      group.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.toggle("is-active", item === button); });
      document.querySelectorAll("[data-tab-panel]").forEach(function (panel) { panel.classList.toggle("is-active", panel.dataset.tabPanel === target); });
    });
  });
});

document.querySelectorAll("form[data-prototype-form]").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    showToast("Prototype interaction입니다. 입력 정보는 저장되거나 전송되지 않습니다.");
  });
});

document.addEventListener("click", function (event) {
  const mock = event.target.closest("[data-mock-action]");
  if (mock) showToast(mock.dataset.mockAction || "현재는 prototype interaction입니다.");
});

const endpoints={"layers":{"method":"GET","path":"/v0/taxonomy/layers","response":{"taxonomyVersion":"0.1-draft","items":[{"id":"L3","name":"AI Engineering Platform / Ops","definition":"Model intelligence를 business capability로 변환하는 engineering layer","examples":["LLMOps","AgentOps","Evaluation","Observability","Security"]},{"id":"L4","name":"Agent Engineering","definition":"목표를 받아 tool과 memory를 사용해 수행하는 system layer","examples":["Planning","Tool-use","Memory","Orchestration"]}],"notice":"Draft taxonomy. Not a proficiency scale."}},"roles":{"method":"GET","path":"/v0/roles?layer=L3","response":{"items":[{"id":"agentops-engineer","name":"AgentOps Engineer","layerIds":["L3"],"capabilityIds":["agent-evaluation","agent-observability","guardrail-operations"]},{"id":"agentops-product-engineer","name":"AgentOps Product Engineer","layerIds":["L3","L5"],"capabilityIds":["agent-runtime","evaluation-platform","product-delivery"]}],"relation":"Layer ↔ Role is many-to-many."}},"talent":{"method":"GET","path":"/v0/talents/tal_sample_001","response":{"id":"tal_sample_001","memberId":"mem_sample_001","primaryRole":{"id":"agent-architect","layerIds":["L2","L3","L4"]},"capabilityClaims":[{"capabilityId":"permission-aware-rag","deliveryLevel":"customer-production","responsibilityScope":"technical-lead","evidenceIds":["ev_sample_101"]}],"availability":{"status":"available-now","engagementTypes":["project","consulting"]},"boundaries":["owner-required","data-access-required"],"sample":true}},"project":{"method":"GET","path":"/v0/projects/prj_sample_001","response":{"id":"prj_sample_001","problem":"권한에 맞는 사내 지식 검색과 근거 답변","requiredLayers":["L2","L3","L4"],"roleRequirements":[{"roleId":"agent-architect","priority":"required"}],"capabilityRequirements":[{"capabilityId":"permission-aware-rag","minimumDeliveryLevel":"customer-production","priority":"required"}],"assets":["documents","sso-api","internal-pm"],"verificationRequired":["sso-api-spec","privacy-policy"],"sample":true}},"match":{"method":"POST","path":"/v0/match-assessments","response":{"id":"ma_sample_001","projectId":"prj_sample_001","talentId":"tal_sample_001","referenceScore":82,"fitRationale":["Required Layer L2/L3/L4 coverage","Permission-aware RAG evidence linked","Availability condition compatible"],"capabilityGaps":["Customer SSO implementation evidence not exposed"],"verificationRequired":["Review evidence ev_sample_101","Confirm security responsibility boundary"],"recommendedNextStep":"30-minute technical fit meeting","limitations":["Sample taxonomy coverage only","No identity, rate, contract, or evidence authenticity verification"]}}};let activeEndpoint="layers";
function renderEndpoint(){const item=endpoints[activeEndpoint];document.getElementById("apiPath").textContent=item.method+" "+item.path;document.getElementById("apiResponse").textContent=JSON.stringify(item.response,null,2);document.querySelectorAll("[data-endpoint]").forEach(function(button){button.classList.toggle("is-active",button.dataset.endpoint===activeEndpoint);});}
document.addEventListener("click",function(event){const button=event.target.closest("[data-endpoint]");if(button){activeEndpoint=button.dataset.endpoint;renderEndpoint();}});document.getElementById("copyJson").addEventListener("click",async function(){try{await navigator.clipboard.writeText(document.getElementById("apiResponse").textContent);showToast("Sample JSON을 Clipboard에 복사했습니다.");}catch(error){showToast("Clipboard 권한을 사용할 수 없습니다.");}});renderEndpoint();
