/* =========================================================
   KHETSETU FARMER COMMUNITY MODULE
   - Farmers form or join a group by crop + village and pool
     their individual quantities into one combined lot.
   - Once a group's pooled quantity is big enough, it becomes
     an attractive bulk listing — companies and other large
     buyers can browse pooled groups and express interest in
     buying the whole lot at once, at a better price than any
     single small farmer could negotiate alone.
   - Illustrative demo data, same pattern as company.js.
   Reuses IMG from script.js (same global script scope) so
   thumbnails/icons stay consistent with the rest of the site.
   ========================================================= */
(function(){

  const CM_ICONS = ["🌾","🤝","🧺","🚜","👨‍🌾","🏘️"];

  const COMMUNITY_DATA = [
    { key:"g1", name:"Nashik Tomato Growers Collective", crop:"tomato", cat:"veg", localPrice:32, askPrice:36,
      targetQty:8000, pooledQty:5200, members:14, village:"Nashik", state:"Maharashtra" },
    { key:"g2", name:"Ludhiana Wheat Farmers Circle", crop:"wheat", cat:"grain", localPrice:26, askPrice:28,
      targetQty:30000, pooledQty:30000, members:22, village:"Ludhiana", state:"Punjab" },
    { key:"g3", name:"Ratnagiri Mango Growers Sangh", crop:"mango", cat:"fruit", localPrice:65, askPrice:70,
      targetQty:6000, pooledQty:2100, members:9, village:"Ratnagiri", state:"Maharashtra" },
    { key:"g4", name:"Agra Potato Kisan Samuh", crop:"potato", cat:"veg", localPrice:18, askPrice:20,
      targetQty:12000, pooledQty:9600, members:18, village:"Agra", state:"Uttar Pradesh" },
    { key:"g5", name:"Karnal Basmati Rice Cooperative", crop:"rice", cat:"grain", localPrice:44, askPrice:48,
      targetQty:20000, pooledQty:20000, members:16, village:"Karnal", state:"Haryana" },
    { key:"g6", name:"Nagpur Onion Farmers Group", crop:"onion", cat:"veg", localPrice:24, askPrice:27,
      targetQty:10000, pooledQty:4300, members:11, village:"Nagpur", state:"Maharashtra" },
    { key:"g7", name:"Solan Spinach Growers Mandal", crop:"spinach", cat:"veg", localPrice:20, askPrice:22,
      targetQty:2500, pooledQty:1800, members:7, village:"Solan", state:"Himachal Pradesh" },
    { key:"g8", name:"Jalgaon Banana Producers Trust", crop:"banana", cat:"fruit", localPrice:40, askPrice:44,
      targetQty:9000, pooledQty:9000, members:20, village:"Jalgaon", state:"Maharashtra" }
  ];

  /* ---------------------------------------------------------
     Internal i18n pack for content this module builds in JS
     (cards, dropdowns, my-lists). Static page chrome (kicker,
     title, filters, form labels) is handled by script.js's own
     dict + data-i18n system, with automatic English fallback
     for any language not covered there. This pack covers
     English + Hindi fully; other languages fall back to
     English here too, so nothing ever renders blank.
     --------------------------------------------------------- */
  const CM_I18N = {
    en:{
      status:{ready:"Ready for buyers",forming:"Still pooling"},
      mandiPrice:"Mandi price", askPrice:"Group ask price", premium:"Above mandi",
      targetLabel:"Target", pooledLabel:"pooled", membersLabel:" members",
      joinBtn:"Join this group →", buyerBtn:"Express interest in this lot →",
      noMatch:"No groups match this filter yet — try widening it.",
      chooseGroup:"— Choose a group —",
      joinEmptyHint:"No groups joined yet — pick a group above and contribute your produce.",
      createEmptyHint:"No groups started yet — start one on the right and nearby farmers can join it.",
      buyerEmptyHint:"No interest sent yet — pick a pooled group above and send your offer.",
      contributedTo:"Contributed to ", statusPendingMember:"Added to pool",
      startedIn:"Started in ", statusForming:"Forming · 1 member so far",
      interestSentTo:"Interest sent to ", statusPendingBuyer:"Awaiting group",
      newGroupTag:"New",
      crop:{tomato:"Tomato",onion:"Onion",potato:"Potato",mango:"Mango",banana:"Banana",wheat:"Wheat",rice:"Rice",spinach:"Spinach",grapes:"Grapes"}
    },
    hi:{
      status:{ready:"खरीदारों के लिए तैयार",forming:"अभी जुट रही है"},
      mandiPrice:"मंडी मूल्य", askPrice:"समूह मूल्य", premium:"मंडी से अधिक",
      targetLabel:"लक्ष्य", pooledLabel:"जुटी हुई", membersLabel:" सदस्य",
      joinBtn:"इस समूह में शामिल हों →", buyerBtn:"इस लॉट में रुचि दिखाएं →",
      noMatch:"इस फ़िल्टर से कोई समूह मेल नहीं खाता — दायरा बढ़ाकर देखें।",
      chooseGroup:"— एक समूह चुनें —",
      joinEmptyHint:"अभी तक कोई समूह नहीं जुड़ा — ऊपर से एक समूह चुनें और अपनी उपज जोड़ें।",
      createEmptyHint:"अभी तक कोई समूह शुरू नहीं हुआ — दाईं ओर एक शुरू करें, पास के किसान इसमें शामिल हो सकेंगे।",
      buyerEmptyHint:"अभी तक कोई रुचि नहीं भेजी — ऊपर से एक जुटा हुआ समूह चुनें और अपना प्रस्ताव भेजें।",
      contributedTo:"योगदान दिया — ", statusPendingMember:"पूल में जोड़ा गया",
      startedIn:"में शुरू किया गया", statusForming:"जुट रहा है · अभी 1 सदस्य",
      interestSentTo:"रुचि भेजी गई — ", statusPendingBuyer:"समूह की प्रतीक्षा में",
      newGroupTag:"नया",
      crop:{tomato:"टमाटर",onion:"प्याज़",potato:"आलू",mango:"आम",banana:"केला",wheat:"गेहूँ",rice:"चावल",spinach:"पालक",grapes:"अंगूर"}
    }
  };

  function cmLang(){
    var l = (typeof currentLang !== 'undefined' && CM_I18N[currentLang]) ? currentLang : 'en';
    return CM_I18N[l];
  }
  function cropName(key, fallback){
    const pack = cmLang();
    return (pack.crop && pack.crop[key]) || fallback || key;
  }

  let myCreated = [];    // groups started this session (same shape as COMMUNITY_DATA)
  let myJoined = [];     // { groupKey, name, cropKey, qty }
  let myInterests = [];  // { groupKey, name, cropKey, qty, price }
  let createSeq = 1;
  let currentRole = 'join'; // 'join' | 'create' | 'buyer'

  function allGroups(){
    // Newly started groups show up first, ahead of the seed data.
    return myCreated.concat(COMMUNITY_DATA);
  }

  function progressPct(g){
    return Math.min(100, Math.round((g.pooledQty / g.targetQty) * 100));
  }
  function groupStatus(g){
    return g.pooledQty >= g.targetQty ? 'ready' : 'forming';
  }
  function premiumPct(g){
    return Math.round(((g.askPrice - g.localPrice) / g.localPrice) * 100);
  }

  function hashStr(s){
    let h = 0;
    for(let i=0;i<s.length;i++){ h = (h<<5) - h + s.charCodeAt(i); h |= 0; }
    return h;
  }

  function renderGrid(){
    const grid = document.getElementById('cmGrid');
    if(!grid) return;
    const pack = cmLang();
    const catEl = document.getElementById('cmCatFilter');
    const statusEl = document.getElementById('cmStatusFilter');
    const sortEl = document.getElementById('cmSortFilter');
    const cat = catEl ? catEl.value : 'all';
    const statusFilter = statusEl ? statusEl.value : 'all';
    const sortMode = sortEl ? sortEl.value : 'progress';

    let list = allGroups().filter(g => (cat === 'all' || g.cat === cat) && (statusFilter === 'all' || groupStatus(g) === statusFilter));
    list = list.slice();
    if(sortMode === 'members') list.sort((a,b)=> b.members - a.members);
    else if(sortMode === 'priceHigh') list.sort((a,b)=> b.askPrice - a.askPrice);
    else if(sortMode === 'priceLow') list.sort((a,b)=> a.askPrice - b.askPrice);
    else list.sort((a,b)=> progressPct(b) - progressPct(a));

    if(!list.length){
      grid.innerHTML = `<div class="empty-note">${pack.noMatch}</div>`;
      return;
    }

    const btnLabel = currentRole === 'buyer' ? pack.buyerBtn : pack.joinBtn;

    grid.innerHTML = list.map(g=>{
      const name = cropName(g.crop, g.crop);
      const icon = CM_ICONS[Math.abs(hashStr(g.name)) % CM_ICONS.length];
      const st = groupStatus(g);
      const pct = progressPct(g);
      const prem = premiumPct(g);
      return `
      <div class="cm-card">
        <div class="cm-card-head">
          ${g._isNew ? `<span class="cm-new-tag">${pack.newGroupTag}</span>` : ''}
          <div class="cm-card-icon">${icon}</div>
          <div class="cm-card-head-txt">
            <div class="cm-group-name">${g.name}</div>
            <div class="cm-group-loc">📍 ${g.village}, ${g.state}</div>
          </div>
        </div>
        <div class="cm-card-body">
          <span class="cm-badge cm-${st}">${pack.status[st]}</span>
          <h4>${name}</h4>
          <div class="cm-target-sub">${pack.targetLabel}: <b>${g.targetQty.toLocaleString('en-IN')} kg</b></div>
          <div class="cm-meter"><div class="cm-meter-fill ${st === 'forming' ? 'cm-forming-fill' : ''}" style="width:${pct}%"></div></div>
          <div class="cm-meter-label">${g.pooledQty.toLocaleString('en-IN')} kg ${pack.pooledLabel} · ${pct}%</div>
          <div class="cm-price-row">
            <div><span class="l">${pack.mandiPrice}</span><span class="v">₹${g.localPrice}/kg</span></div>
            <div><span class="l">${pack.askPrice}</span><span class="v up">₹${g.askPrice}/kg</span></div>
            <div><span class="l">${pack.premium}</span><span class="v up">+${prem}%</span></div>
          </div>
          <div class="cm-chip-row">
            <span class="cm-loc-chip">📍 ${g.village}</span>
            <span class="cm-member-chip">👥 ${g.members}${pack.membersLabel}</span>
          </div>
          <button type="button" class="mini-btn cm-join-btn" data-grp="${g.key}">${btnLabel}</button>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.cm-join-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        if(currentRole === 'buyer'){
          const buyerBtn = document.getElementById('cmRoleBuyerBtn');
          if(buyerBtn) buyerBtn.click();
          const sel = document.getElementById('cmBuyerGroupSelect');
          if(sel){ sel.value = btn.dataset.grp; syncBuyerSuggestedPrice(); }
          const form = document.getElementById('cmBuyerForm');
          if(form) form.scrollIntoView({ behavior:'smooth', block:'center' });
        } else {
          const joinBtn = document.getElementById('cmRoleJoinBtn');
          if(joinBtn) joinBtn.click();
          const sel = document.getElementById('cmGroupSelect');
          if(sel){ sel.value = btn.dataset.grp; }
          const form = document.getElementById('cmJoinForm');
          if(form) form.scrollIntoView({ behavior:'smooth', block:'center' });
        }
      });
    });
  }

  function groupOptionLabel(g){
    const name = cropName(g.crop, g.crop);
    const pct = progressPct(g);
    return `${g.name} — ${name} (${pct}% pooled)`;
  }

  function populateGroupSelects(){
    const pack = cmLang();
    [ {id:'cmGroupSelect'}, {id:'cmBuyerGroupSelect'} ].forEach(cfg=>{
      const sel = document.getElementById(cfg.id);
      if(!sel) return;
      const prevValue = sel.value;
      const opts = allGroups().map(g => `<option value="${g.key}">${groupOptionLabel(g)}</option>`).join('');
      sel.innerHTML = `<option value="" disabled ${prevValue ? '' : 'selected'}>${pack.chooseGroup}</option>` + opts;
      if(prevValue) sel.value = prevValue;
    });
  }

  function populateCreateCropSelect(){
    const sel = document.getElementById('cmCreateCrop');
    if(!sel) return;
    const prevValue = sel.value;
    const keys = ["tomato","onion","potato","mango","banana","wheat","rice","spinach","grapes"];
    sel.innerHTML = keys.map(k=>`<option value="${k}">${cropName(k,k)}</option>`).join('');
    if(prevValue) sel.value = prevValue;
  }

  function syncBuyerSuggestedPrice(){
    const sel = document.getElementById('cmBuyerGroupSelect');
    const priceEl = document.getElementById('cmBuyerPrice');
    if(!sel || !priceEl || !sel.value) return;
    const g = allGroups().find(x=>x.key === sel.value);
    if(g) priceEl.value = g.askPrice;
  }

  function renderMyJoined(){
    const list = document.getElementById('cmMyJoined');
    if(!list) return;
    const pack = cmLang();
    if(!myJoined.length){
      list.innerHTML = `<div class="cm-empty-hint">${pack.joinEmptyHint}</div>`;
      return;
    }
    list.innerHTML = myJoined.map(r=>`
      <div class="cm-listing">
        <div class="cm-listing-main">
          <b>${cropName(r.cropKey, r.cropKey)}</b> · ${r.qty}kg
          <div class="cm-listing-sub">${pack.contributedTo}${r.name}</div>
        </div>
        <span class="cm-status pending">${pack.statusPendingMember}</span>
      </div>
    `).join('');
  }

  function renderMyCreated(){
    const list = document.getElementById('cmMyCreated');
    if(!list) return;
    const pack = cmLang();
    if(!myCreated.length){
      list.innerHTML = `<div class="cm-empty-hint">${pack.createEmptyHint}</div>`;
      return;
    }
    list.innerHTML = myCreated.map(g=>`
      <div class="cm-listing">
        <div class="cm-listing-main">
          <b>${g.name}</b> · ${cropName(g.crop, g.crop)} · ${g.targetQty.toLocaleString('en-IN')}kg ${pack.targetLabel.toLowerCase()}
          <div class="cm-listing-sub">${pack.startedIn}${g.village}, ${g.state}</div>
        </div>
        <span class="cm-status">${pack.statusForming}</span>
      </div>
    `).join('');
  }

  function renderMyInterests(){
    const list = document.getElementById('cmMyInterests');
    if(!list) return;
    const pack = cmLang();
    if(!myInterests.length){
      list.innerHTML = `<div class="cm-empty-hint">${pack.buyerEmptyHint}</div>`;
      return;
    }
    list.innerHTML = myInterests.map(r=>`
      <div class="cm-listing">
        <div class="cm-listing-main">
          <b>${cropName(r.cropKey, r.cropKey)}</b> · ${r.qty}kg · ₹${r.price}/kg
          <div class="cm-listing-sub">${pack.interestSentTo}${r.name}</div>
        </div>
        <span class="cm-status pending">${pack.statusPendingBuyer}</span>
      </div>
    `).join('');
  }

  function handleJoinSubmit(e){
    e.preventDefault();
    const sel = document.getElementById('cmGroupSelect');
    const qtyEl = document.getElementById('cmJoinQty');
    const g = allGroups().find(x => x.key === (sel && sel.value));
    const qty = qtyEl ? Number(qtyEl.value) : 0;
    if(!g || !qty) return;

    g.pooledQty += qty;
    g.members += 1;
    myJoined.unshift({ groupKey:g.key, name:g.name, cropKey:g.crop, qty });

    renderGrid();
    populateGroupSelects();
    renderMyJoined();

    const msg = document.getElementById('cmJoinMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  function handleCreateSubmit(e){
    e.preventDefault();
    const nameEl = document.getElementById('cmCreateName');
    const cropEl = document.getElementById('cmCreateCrop');
    const villageEl = document.getElementById('cmCreateVillage');
    const targetEl = document.getElementById('cmCreateTarget');
    const qtyEl = document.getElementById('cmCreateQty');
    const priceEl = document.getElementById('cmCreatePrice');
    const cropKey = cropEl ? cropEl.value : '';
    const base = COMMUNITY_DATA.find(x=>x.crop === cropKey);
    if(!nameEl.value || !cropKey || !villageEl.value || !targetEl.value || !qtyEl.value || !priceEl.value) return;

    myCreated.unshift({
      key: 'mygrp' + (createSeq++),
      name: nameEl.value,
      crop: cropKey,
      cat: base ? base.cat : 'veg',
      localPrice: base ? base.localPrice : Number(priceEl.value),
      askPrice: Number(priceEl.value),
      targetQty: Number(targetEl.value),
      pooledQty: Number(qtyEl.value),
      members: 1,
      village: villageEl.value,
      state: '',
      _isNew: true
    });

    renderGrid();
    populateGroupSelects();
    renderMyCreated();

    const msg = document.getElementById('cmCreateMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  function handleBuyerSubmit(e){
    e.preventDefault();
    const sel = document.getElementById('cmBuyerGroupSelect');
    const qtyEl = document.getElementById('cmBuyerQty');
    const priceEl = document.getElementById('cmBuyerPrice');
    const g = allGroups().find(x => x.key === (sel && sel.value));
    const qty = qtyEl ? qtyEl.value : '';
    const price = priceEl ? priceEl.value : '';
    if(!g || !qty || !price) return;

    myInterests.unshift({ groupKey:g.key, name:g.name, cropKey:g.crop, qty, price });
    renderMyInterests();

    const msg = document.getElementById('cmBuyerMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  function setRole(role){
    currentRole = role;
    const map = {
      join:   { btn:'cmRoleJoinBtn',   panel:'cmJoinPanel' },
      create: { btn:'cmRoleCreateBtn', panel:'cmCreatePanel' },
      buyer:  { btn:'cmRoleBuyerBtn',  panel:'cmBuyerPanel' }
    };
    Object.keys(map).forEach(r=>{
      const btnEl = document.getElementById(map[r].btn);
      const panelEl = document.getElementById(map[r].panel);
      if(btnEl) btnEl.classList.toggle('active', r === role);
      if(panelEl) panelEl.classList.toggle('active', r === role);
    });
    renderGrid();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    populateGroupSelects();
    populateCreateCropSelect();
    renderGrid();
    renderMyJoined();
    renderMyCreated();
    renderMyInterests();
    setRole('join');

    ['cmCatFilter','cmStatusFilter','cmSortFilter'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.addEventListener('change', renderGrid);
    });

    const buyerSelect = document.getElementById('cmBuyerGroupSelect');
    if(buyerSelect) buyerSelect.addEventListener('change', syncBuyerSuggestedPrice);

    const joinForm = document.getElementById('cmJoinForm');
    if(joinForm) joinForm.addEventListener('submit', handleJoinSubmit);

    const createForm = document.getElementById('cmCreateForm');
    if(createForm) createForm.addEventListener('submit', handleCreateSubmit);

    const buyerForm = document.getElementById('cmBuyerForm');
    if(buyerForm) buyerForm.addEventListener('submit', handleBuyerSubmit);

    const joinBtn = document.getElementById('cmRoleJoinBtn');
    const createBtn = document.getElementById('cmRoleCreateBtn');
    const buyerBtn = document.getElementById('cmRoleBuyerBtn');
    if(joinBtn) joinBtn.addEventListener('click', ()=> setRole('join'));
    if(createBtn) createBtn.addEventListener('click', ()=> setRole('create'));
    if(buyerBtn) buyerBtn.addEventListener('click', ()=> setRole('buyer'));
  });

  // Kept for parity with the other page modules — gotoPage() calls
  // this if present when the Community page tab is shown.
  window.ksCommunityPageShown = function(){};

  // Called by script.js's applyLang() whenever the site language
  // changes, so the group grid, dropdowns, and "my" lists — all
  // built dynamically in JS — re-render in the new language.
  window.ksCommunityRefreshLang = function(){
    populateGroupSelects();
    populateCreateCropSelect();
    renderGrid();
    renderMyJoined();
    renderMyCreated();
    renderMyInterests();
  };

})();
