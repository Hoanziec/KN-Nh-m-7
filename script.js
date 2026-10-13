const alerts=[
 {type:"trash",icon:"🗑️",title:"Rác thải tập trung",place:"Quận 12",level:"Cao",cls:"high",text:"Phát hiện lượng rác tập trung lớn tại khu vực công cộng."},
 {type:"air",icon:"🌫️",title:"Ô nhiễm không khí",place:"Gò Vấp",level:"Trung bình",cls:"medium",text:"Chất lượng không khí tại khu vực đang ở mức cần chú ý."},
 {type:"water",icon:"💧",title:"Nguồn nước",place:"Bình Thạnh",level:"Đã xử lý",cls:"done",text:"Khu vực đã được tiếp nhận và xử lý theo báo cáo cộng đồng."},
 {type:"noise",icon:"🔊",title:"Tiếng ồn",place:"Thủ Đức",level:"Cao",cls:"high",text:"Ghi nhận tiếng ồn kéo dài tại khu dân cư."},
 {type:"trash",icon:"♻️",title:"Điểm rác tự phát",place:"Tân Bình",level:"Trung bình",cls:"medium",text:"Cần cộng đồng cùng báo cáo và hạn chế xả rác."},
 {type:"air",icon:"🌱",title:"Không khí",place:"Phú Nhuận",level:"Đã xử lý",cls:"done",text:"Điểm cảnh báo đã được cập nhật trạng thái xử lý."}
];
const list=document.getElementById("alertList");
function renderAlerts(filter="all"){
 list.innerHTML="";
 alerts.filter(a=>filter==="all"||a.type===filter).forEach((a,i)=>{
   list.innerHTML+=`<article class="card"><div class="card-top"><span class="type-icon">${a.icon}</span><span class="level ${a.cls}">${a.level}</span></div><h3>${a.title}</h3><b>📍 ${a.place}</b><p>${a.text}</p><span class="link" onclick="showToast('Đang xem chi tiết cảnh báo #${String(i+1).padStart(3,'0')}')">Xem chi tiết →</span></article>`;
 });
}
renderAlerts();
document.getElementById("filter").addEventListener("change",e=>renderAlerts(e.target.value));
document.querySelectorAll(".pin").forEach(p=>p.addEventListener("click",()=>showToast(p.dataset.info)));
document.getElementById("reportForm").addEventListener("submit",e=>{
 e.preventDefault();
 const type=document.getElementById("type").value, location=document.getElementById("location").value;
 if(!type||!location)return;
 document.getElementById("totalReports").textContent=Number(document.getElementById("totalReports").textContent)+1;
 const id=String(Date.now()).slice(-3);
 document.getElementById("reportTable").insertAdjacentHTML("afterbegin",`<tr><td>#${id}</td><td>${type}</td><td>${location}</td><td><span class="tag warn">Trung bình</span></td><td>Chưa xử lý</td></tr>`);
 e.target.reset();
 showToast("✅ Báo cáo đã được tiếp nhận!");
});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2800)}
const menuBtn=document.getElementById("menuBtn"), nav=document.getElementById("navMenu");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));