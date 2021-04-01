let data;
const btnTop = document.querySelector('#goTop');
const xhr=new XMLHttpRequest();
const selectZone=document.querySelector('.search select');
const viewpointTitle=document.querySelector('.viewpoint h2');
const viewpointList=document.querySelector('.viewpoint ul');
const hotDistrict=document.querySelector('.hotDistrict_btn');

selectZone.addEventListener('change',setViewpointList);
hotDistrict.addEventListener('click',gethotDistrict);
window.addEventListener('scroll', btnReveal);
btnTop.addEventListener('click', TopscrollTo);

xhr.open("get","https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json",true);
xhr.send(null);
xhr.onload= function(){
    data = JSON.parse(xhr.responseText).result.records;
    setZoneList();
    setListContent();
}

//讀取所有行政區名稱
function setZoneList(){
    let zoneList=[];
    let selectStr=`<option value="all" selected disabled>--請選擇行政區--</option>`;
  
    for(let i=0;i<data.length;i++){
          if(zoneList.indexOf(data[i].Zone)===-1){
            zoneList.push(data[i].Zone);
          }
      }
    for(let i=0;i<zoneList.length;i++){
      selectStr+=`<option>${zoneList[i]}</option>`
    };
    selectZone.innerHTML=selectStr;
};


//點擊行政區->渲染景點列表
function setViewpointList(event){
    let selectedZone=event.target.value;
    viewpointTitle.innerHTML=selectedZone;
    setListContent(selectedZone);
}

//點擊熱門行政區->渲染景點列表
function gethotDistrict(event){
    let selectedZone=event.target.innerHTML;
    viewpointTitle.innerHTML=selectedZone;
    selectZone.value=selectedZone;
    setListContent(selectedZone);
}
//渲染景點列表
function setListContent(zone="all"){
    let listAry=[];
    let listStr='';
    for(let i=0;i<data.length;i++){
      
        if(zone==="all"){
          listAry.push(data[i]);
        }
        else if(data[i].Zone===zone){
          listAry.push(data[i]);
        };
    };
    for(let i=0;i<listAry.length;i++){
      let {Picture1,Name,Zone,Opentime,Add,Tel,Ticketinfo}=listAry[i];
      listStr+=`<li>
        <div class="list_header" style="background-image:url(${Picture1})">
          <h3>${Name}</h3>
          <h4>${Zone}</h4>
        </div>
        <ul class="list_body">
          <li><i class="far fa-clock"></i>${Opentime}</li>
          <li><i class="fas fa-map-marker-alt"></i>${Add}</li>
          <li><i class="fas fa-mobile-alt"></i>${Tel}</li>
        </ul>
        <span class="list_tag"><i class="fas fa-tag"></i>${Ticketinfo}</span>
      </li>`
    };
  
    viewpointList.innerHTML=listStr;
}

//回到上放按鈕：控制顯示
function btnReveal(){
  if (window.scrollY <= 300) {
      btnTop.classList.add('d-none');
    } else {
      btnTop.classList.remove('d-none');
    } 
};

function TopscrollTo() {
  window.scrollTo({ 
    top: 0, 
    behavior: "smooth" 
  });

  }

