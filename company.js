/* =========================================================
   KHETSETU COMPANY REQUIREMENTS MODULE
   - Shows live produce requirements posted by companies
     (illustrative demo data): crop wanted, quantity, price
     offered vs today's mandi rate, location, deadline and
     any quality/paperwork terms.
   - Farmers can respond directly to a requirement with a
     quantity + price offer — no mandi or middleman involved.
   - Companies can post a new requirement, which immediately
     appears in the grid for farmers to respond to.
   Reuses IMG from script.js (same global script scope) so
   thumbnails/icons stay consistent with the rest of the site.
   ========================================================= */
(function(){

  const CB_ICONS = ["🏭","🏢","🧃","🍞","🥫","🏬"];

  const COMPANY_DATA = [
    { key:"c1", company:"FreshHarvest AgroFoods", crop:"tomato", cat:"veg", localPrice:32, offerPrice:38,
      qtyNeeded:5000, fulfilled:35, location:"Nashik, Maharashtra", deadline:"25 Sep 2026", urgency:"high", verified:true,
      terms:["Grade A","FSSAI Certified","Payment on delivery"] },
    { key:"c2", company:"Golden Grain Mills", crop:"wheat", cat:"grain", localPrice:26, offerPrice:29,
      qtyNeeded:20000, fulfilled:60, location:"Ludhiana, Punjab", deadline:"10 Oct 2026", urgency:"medium", verified:true,
      terms:["FSSAI Quality Certificate","Bulk packaging"] },
    { key:"c3", company:"SunRipe Beverages Co.", crop:"mango", cat:"fruit", localPrice:65, offerPrice:74,
      qtyNeeded:8000, fulfilled:20, location:"Ratnagiri, Maharashtra", deadline:"5 Oct 2026", urgency:"high", verified:true,
      terms:["Export Grade A","Residue Testing"] },
    { key:"c4", company:"Namkeen Snacks Ltd", crop:"potato", cat:"veg", localPrice:18, offerPrice:21,
      qtyNeeded:15000, fulfilled:45, location:"Agra, Uttar Pradesh", deadline:"1 Oct 2026", urgency:"medium", verified:false,
      terms:["Standard Grade","Cold-chain Packaging"] },
    { key:"c5", company:"Basmati Exports India", crop:"rice", cat:"grain", localPrice:44, offerPrice:50,
      qtyNeeded:25000, fulfilled:15, location:"Karnal, Haryana", deadline:"15 Oct 2026", urgency:"high", verified:true,
      terms:["Basmati Certification","Fumigation Certificate"] },
    { key:"c6", company:"GreenLeaf Foods", crop:"spinach", cat:"veg", localPrice:20, offerPrice:24,
      qtyNeeded:3000, fulfilled:70, location:"Solan, Himachal Pradesh", deadline:"18 Sep 2026", urgency:"low", verified:false,
      terms:["Standard Grade","Same-day pickup"] },
    { key:"c7", company:"Vine & Co. Winery", crop:"grapes", cat:"fruit", localPrice:58, offerPrice:66,
      qtyNeeded:6000, fulfilled:50, location:"Nashik, Maharashtra", deadline:"28 Sep 2026", urgency:"medium", verified:true,
      terms:["Grade A","Residue Testing"] },
    { key:"c8", company:"Tropical Fresh Exports", crop:"banana", cat:"fruit", localPrice:40, offerPrice:46,
      qtyNeeded:10000, fulfilled:55, location:"Jalgaon, Maharashtra", deadline:"22 Sep 2026", urgency:"low", verified:true,
      terms:["Standard Grade","Cold-chain Packaging"] },
    { key:"c9", company:"Purity Onion Processors", crop:"onion", cat:"veg", localPrice:24, offerPrice:29,
      qtyNeeded:18000, fulfilled:25, location:"Nagpur, Maharashtra", deadline:"30 Sep 2026", urgency:"high", verified:false,
      terms:["Grade A","Bulk packaging"] }
  ];

  const URGENCY_SCORE = { high:88, medium:56, low:28 };

  /* ---------------------------------------------------------
     PLATFORM FEES — same model as the Export module: a small,
     explicit website commission plus a farmer-union commission,
     both deducted only from a completed farmer↔company deal and
     shown as separate line items before the farmer responds.
     --------------------------------------------------------- */
  const WEBSITE_FEE_PCT = 2;
  const UNION_FEE_PCT = 1;

  function feesFor(gross){
    const platformFee = +(gross * WEBSITE_FEE_PCT / 100).toFixed(2);
    const unionFee = +(gross * UNION_FEE_PCT / 100).toFixed(2);
    const net = +(gross - platformFee - unionFee).toFixed(2);
    return { platformFee, unionFee, net };
  }

  /* ---------------------------------------------------------
     Internal i18n pack for content this module builds in JS
     (cards, dropdowns, my-lists). Static page chrome (kicker,
     title, filters, form labels) is handled by script.js's own
     dict + data-i18n system, with automatic English fallback
     for any language not covered there. This pack covers
     English + Hindi fully; other languages fall back to
     English here too, so nothing ever renders blank.
     --------------------------------------------------------- */
  const CB_I18N = {
    en:{
      urgency:{high:"Urgent need",medium:"Open need",low:"Ongoing need"},
      mandiPrice:"Mandi price", offerPrice:"Offer price", premium:"Above mandi",
      platformFee:"Website commission (2%)", unionFee:"Farmer union commission (1%)", youReceive:"You receive",
      feeNote:"A small, transparent commission funds the platform and your farmer union — deducted only on a completed deal, shown before you respond.",
      qtyNeeded:"Needed", fulfilledLabel:"already offered by farmers",
      termsNeeded:"Terms", offerBtn:"Offer to supply this crop →",
      noMatch:"No requirements match this filter yet — try widening it.",
      chooseReq:"— Choose a requirement —",
      respondEmptyHint:"No responses sent yet — pick a requirement above and send your offer.",
      postedEmptyHint:"No requirements posted yet — post one on the left and farmers will see it right away.",
      responseSentTo:"Offer sent to ", est:"Your offer", statusPending:"Awaiting company",
      postedFor:"Posted for ", statusOpen:"Open · 0 responses yet",
      verifiedTag:"Verified buyer",
      gradeWord:"Terms", newReqTag:"New",
      crop:{tomato:"Tomato",onion:"Onion",potato:"Potato",mango:"Mango",banana:"Banana",wheat:"Wheat",rice:"Rice",spinach:"Spinach",grapes:"Grapes"},
      termI18n:{"Grade A":"Grade A","FSSAI Certified":"FSSAI Certified","Payment on delivery":"Payment on delivery",
        "FSSAI Quality Certificate":"FSSAI Quality Certificate","Bulk packaging":"Bulk packaging",
        "Export Grade A":"Export Grade A","Residue Testing":"Residue Testing",
        "Standard Grade":"Standard Grade","Cold-chain Packaging":"Cold-chain Packaging",
        "Basmati Certification":"Basmati Certification","Fumigation Certificate":"Fumigation Certificate",
        "Same-day pickup":"Same-day pickup"}
    },
    hi:{
      urgency:{high:"तत्काल आवश्यकता",medium:"खुली आवश्यकता",low:"निरंतर आवश्यकता"},
      mandiPrice:"मंडी मूल्य", offerPrice:"प्रस्तावित मूल्य", premium:"मंडी से अधिक",
      platformFee:"वेबसाइट कमीशन (2%)", unionFee:"किसान संघ कमीशन (1%)", youReceive:"आपको मिलेगा",
      feeNote:"एक छोटा, पारदर्शी कमीशन प्लेटफ़ॉर्म और आपके किसान संघ को चलाने में मदद करता है — केवल पूरे हुए सौदे पर लिया जाता है, जवाब देने से पहले ही दिखाया जाता है।",
      qtyNeeded:"आवश्यक मात्रा", fulfilledLabel:"किसानों द्वारा पहले से प्रस्तावित",
      termsNeeded:"शर्तें", offerBtn:"यह फ़सल आपूर्ति करने की पेशकश करें →",
      noMatch:"इस फ़िल्टर से कोई आवश्यकता मेल नहीं खाती — दायरा बढ़ाकर देखें।",
      chooseReq:"— एक आवश्यकता चुनें —",
      respondEmptyHint:"अभी तक कोई प्रस्ताव नहीं भेजा — ऊपर से एक आवश्यकता चुनें और अपना प्रस्ताव भेजें।",
      postedEmptyHint:"अभी तक कोई आवश्यकता पोस्ट नहीं हुई — बाईं ओर एक पोस्ट करें, किसान इसे तुरंत देखेंगे।",
      responseSentTo:"प्रस्ताव भेजा गया — ", est:"आपका प्रस्ताव", statusPending:"कंपनी की प्रतीक्षा में",
      postedFor:"के लिए पोस्ट की गई", statusOpen:"खुली · अभी तक 0 प्रतिक्रियाएं",
      verifiedTag:"सत्यापित खरीदार",
      gradeWord:"शर्तें", newReqTag:"नई",
      crop:{tomato:"टमाटर",onion:"प्याज़",potato:"आलू",mango:"आम",banana:"केला",wheat:"गेहूँ",rice:"चावल",spinach:"पालक",grapes:"अंगूर"},
      termI18n:{"Grade A":"ग्रेड A","FSSAI Certified":"FSSAI प्रमाणित","Payment on delivery":"डिलीवरी पर भुगतान",
        "FSSAI Quality Certificate":"FSSAI गुणवत्ता प्रमाणपत्र","Bulk packaging":"थोक पैकेजिंग",
        "Export Grade A":"निर्यात ग्रेड A","Residue Testing":"अवशेष परीक्षण",
        "Standard Grade":"मानक ग्रेड","Cold-chain Packaging":"कोल्ड-चेन पैकेजिंग",
        "Basmati Certification":"बासमती प्रमाणीकरण","Fumigation Certificate":"धूमन प्रमाणपत्र",
        "Same-day pickup":"उसी दिन पिकअप"}
    }
  };

  function cbLang(){
    var l = (typeof currentLang !== 'undefined' && CB_I18N[currentLang]) ? currentLang : 'en';
    return CB_I18N[l];
  }
  function termName(t){
    const pack = cbLang();
    return (pack.termI18n && pack.termI18n[t]) || t;
  }
  function cropName(key, fallback){
    const pack = cbLang();
    return (pack.crop && pack.crop[key]) || fallback || key;
  }

  let myPosted = [];     // requirements posted by "companies" this session: same shape as COMPANY_DATA
  let myResponses = [];  // { reqKey, company, cropKey, qty, price }
  let postedSeq = 1;
  let responseSeq = 1;

  function allRequirements(){
    // Newly posted requirements show up first, ahead of the seed data.
    return myPosted.concat(COMPANY_DATA);
  }

  function premiumPct(d){
    return Math.round(((d.offerPrice - d.localPrice) / d.localPrice) * 100);
  }

  function renderGrid(){
    const grid = document.getElementById('cbGrid');
    if(!grid) return;
    const pack = cbLang();
    const catEl = document.getElementById('cbCatFilter');
    const urgEl = document.getElementById('cbUrgencyFilter');
    const sortEl = document.getElementById('cbSortFilter');
    const cat = catEl ? catEl.value : 'all';
    const level = urgEl ? urgEl.value : 'all';
    const sortMode = sortEl ? sortEl.value : 'urgency';

    let list = allRequirements().filter(d => (cat === 'all' || d.cat === cat) && (level === 'all' || d.urgency === level));
    list = list.slice();
    if(sortMode === 'priceHigh') list.sort((a,b)=> b.offerPrice - a.offerPrice);
    else if(sortMode === 'priceLow') list.sort((a,b)=> a.offerPrice - b.offerPrice);
    else list.sort((a,b)=> URGENCY_SCORE[b.urgency] - URGENCY_SCORE[a.urgency]);

    if(!list.length){
      grid.innerHTML = `<div class="empty-note">${pack.noMatch}</div>`;
      return;
    }

    grid.innerHTML = list.map(d=>{
      const name = cropName(d.crop, d.crop);
      const icon = CB_ICONS[Math.abs(hashStr(d.company)) % CB_ICONS.length];
      const termChips = d.terms.map(t=>`<span class="cb-req-chip">${termName(t)}</span>`).join('');
      const prem = premiumPct(d);
      const fees = feesFor(d.offerPrice);
      return `
      <div class="cb-card">
        <div class="cb-card-head">
          ${d.verified ? `<span class="cb-verified">✓ ${pack.verifiedTag}</span>` : (d._isNew ? `<span class="cb-verified">${pack.newReqTag}</span>` : '')}
          <div class="cb-card-icon">${icon}</div>
          <div class="cb-card-head-txt">
            <div class="cb-company-name">${d.company}</div>
            <div class="cb-company-loc">📍 ${d.location}</div>
          </div>
        </div>
        <div class="cb-card-body">
          <span class="cb-badge cb-${d.urgency}">${pack.urgency[d.urgency]}</span>
          <h4>${name}</h4>
          <div class="cb-need-sub"><b>${d.qtyNeeded.toLocaleString('en-IN')} kg</b> ${pack.qtyNeeded.toLowerCase()}</div>
          <div class="cb-meter"><div class="cb-meter-fill" style="width:${Math.min(100,d.fulfilled)}%"></div></div>
          <div class="cb-meter-label">${d.fulfilled}% ${pack.fulfilledLabel}</div>
          <div class="cb-price-row">
            <div><span class="l">${pack.mandiPrice}</span><span class="v">₹${d.localPrice}/kg</span></div>
            <div><span class="l">${pack.offerPrice}</span><span class="v up">₹${d.offerPrice}/kg</span></div>
            <div><span class="l">${pack.premium}</span><span class="v up">+${prem}%</span></div>
          </div>
          <div class="cb-fee-box">
            <div class="cb-fee-row"><span>${pack.platformFee}</span><span class="cb-fee-amt">−₹${fees.platformFee}/kg</span></div>
            <div class="cb-fee-row"><span>${pack.unionFee}</span><span class="cb-fee-amt">−₹${fees.unionFee}/kg</span></div>
            <div class="cb-net-row"><span>${pack.youReceive}</span><span class="cb-net-amt">₹${fees.net}/kg</span></div>
            <div class="cb-fee-note">${pack.feeNote}</div>
          </div>
          <div class="cb-chip-row">
            <span class="cb-loc-chip">📍 ${d.location}</span>
            <span class="cb-deadline-chip">⏳ ${d.deadline}</span>
          </div>
          <div class="cb-chip-row">${termChips}</div>
          <button type="button" class="mini-btn cb-offer-btn" data-req="${d.key}">${pack.offerBtn}</button>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.cb-offer-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        // Make sure we're on the farmer side of the toggle, then
        // preselect this requirement in the response form.
        const farmerBtn = document.getElementById('cbRoleFarmerBtn');
        if(farmerBtn) farmerBtn.click();
        const sel = document.getElementById('cbReqSelect');
        if(sel){ sel.value = btn.dataset.req; syncSuggestedPrice(); }
        const form = document.getElementById('cbRespondForm');
        if(form) form.scrollIntoView({ behavior:'smooth', block:'center' });
      });
    });
  }

  function hashStr(s){
    let h = 0;
    for(let i=0;i<s.length;i++){ h = (h<<5) - h + s.charCodeAt(i); h |= 0; }
    return h;
  }

  function populateReqSelect(){
    const sel = document.getElementById('cbReqSelect');
    if(!sel) return;
    const pack = cbLang();
    const prevValue = sel.value;
    const opts = allRequirements().map(d=>{
      const name = cropName(d.crop, d.crop);
      return `<option value="${d.key}">${d.company} — ${name} (₹${d.offerPrice}/kg)</option>`;
    }).join('');
    sel.innerHTML = `<option value="" disabled ${prevValue ? '' : 'selected'}>${pack.chooseReq}</option>` + opts;
    if(prevValue) sel.value = prevValue;
  }

  function syncSuggestedPrice(){
    const sel = document.getElementById('cbReqSelect');
    const priceEl = document.getElementById('cbYourPrice');
    if(!sel || !priceEl || !sel.value) return;
    const d = allRequirements().find(x=>x.key === sel.value);
    if(d) priceEl.value = d.offerPrice;
    updatePriceHint();
  }

  // Live "you'll receive ₹x/kg" hint under the Your Price field,
  // so the commission is visible the moment the farmer types a price.
  function updatePriceHint(){
    const priceEl = document.getElementById('cbYourPrice');
    const hintEl = document.getElementById('cbYourPriceHint');
    if(!priceEl || !hintEl) return;
    const val = Number(priceEl.value);
    if(!val){ hintEl.textContent = ''; return; }
    const pack = cbLang();
    const fees = feesFor(val);
    hintEl.textContent = `${pack.platformFee} + ${pack.unionFee} → ${pack.youReceive}: ₹${fees.net}/kg`;
  }

  function renderMyResponses(){
    const list = document.getElementById('cbMyResponses');
    if(!list) return;
    const pack = cbLang();
    if(!myResponses.length){
      list.innerHTML = `<div class="cb-empty-hint">${pack.respondEmptyHint}</div>`;
      return;
    }
    list.innerHTML = myResponses.map(r=>{
      const fees = feesFor(Number(r.price) || 0);
      return `
      <div class="cb-listing">
        <div class="cb-listing-main">
          <b>${cropName(r.cropKey, r.cropKey)}</b> · ${r.qty}kg · ${pack.est}: ₹${r.price}/kg · <b>${pack.youReceive}: ₹${fees.net}/kg</b>
          <div class="cb-listing-sub">${pack.responseSentTo}${r.company}</div>
        </div>
        <span class="cb-status pending">${pack.statusPending}</span>
      </div>
    `;}).join('');
  }

  function renderMyPosted(){
    const list = document.getElementById('cbMyPosted');
    if(!list) return;
    const pack = cbLang();
    if(!myPosted.length){
      list.innerHTML = `<div class="cb-empty-hint">${pack.postedEmptyHint}</div>`;
      return;
    }
    list.innerHTML = myPosted.map(p=>`
      <div class="cb-listing">
        <div class="cb-listing-main">
          <b>${cropName(p.crop, p.crop)}</b> · ${p.qtyNeeded.toLocaleString('en-IN')}kg · ₹${p.offerPrice}/kg
          <div class="cb-listing-sub">${pack.postedFor}${p.location}</div>
        </div>
        <span class="cb-status">${pack.statusOpen}</span>
      </div>
    `).join('');
  }

  function handleRespondSubmit(e){
    e.preventDefault();
    const sel = document.getElementById('cbReqSelect');
    const qtyEl = document.getElementById('cbSupplyQty');
    const priceEl = document.getElementById('cbYourPrice');
    const d = allRequirements().find(x => x.key === (sel && sel.value));
    const qty = qtyEl ? qtyEl.value : '';
    const price = priceEl ? priceEl.value : '';
    if(!d || !qty || !price) return;

    myResponses.unshift({ id: responseSeq++, reqKey:d.key, company:d.company, cropKey:d.crop, qty, price });
    renderMyResponses();

    const msg = document.getElementById('cbRespondMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  function handlePostSubmit(e){
    e.preventDefault();
    const nameEl = document.getElementById('cbCompanyName');
    const cropEl = document.getElementById('cbCropNeeded');
    const qtyEl = document.getElementById('cbQtyNeeded');
    const priceEl = document.getElementById('cbOfferPriceInput');
    const locEl = document.getElementById('cbLocationInput');
    const dateEl = document.getElementById('cbDeadlineInput');
    const cropKey = cropEl ? cropEl.value : '';
    const base = COMPANY_DATA.find(x=>x.crop === cropKey);
    if(!nameEl.value || !cropKey || !qtyEl.value || !priceEl.value || !locEl.value) return;

    myPosted.unshift({
      key: 'my' + (postedSeq++),
      company: nameEl.value,
      crop: cropKey,
      cat: base ? base.cat : 'veg',
      localPrice: base ? base.localPrice : Number(priceEl.value),
      offerPrice: Number(priceEl.value),
      qtyNeeded: Number(qtyEl.value),
      fulfilled: 0,
      location: locEl.value,
      deadline: dateEl.value || '—',
      urgency: 'medium',
      verified: false,
      terms: ["Standard Grade"],
      _isNew: true
    });

    renderGrid();
    populateReqSelect();
    renderMyPosted();

    const msg = document.getElementById('cbPostMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  function populateCropNeededSelect(){
    const sel = document.getElementById('cbCropNeeded');
    if(!sel) return;
    const pack = cbLang();
    const prevValue = sel.value;
    const keys = ["tomato","onion","potato","mango","banana","wheat","rice","spinach","grapes"];
    sel.innerHTML = keys.map(k=>`<option value="${k}">${cropName(k,k)}</option>`).join('');
    if(prevValue) sel.value = prevValue;
  }

  function setRole(role){
    const farmerBtn = document.getElementById('cbRoleFarmerBtn');
    const companyBtn = document.getElementById('cbRoleCompanyBtn');
    const farmerPanel = document.getElementById('cbFarmerPanel');
    const companyPanel = document.getElementById('cbCompanyPanel');
    if(!farmerBtn || !companyBtn || !farmerPanel || !companyPanel) return;
    const isFarmer = role === 'farmer';
    farmerBtn.classList.toggle('active', isFarmer);
    companyBtn.classList.toggle('active', !isFarmer);
    farmerPanel.classList.toggle('active', isFarmer);
    companyPanel.classList.toggle('active', !isFarmer);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    populateReqSelect();
    populateCropNeededSelect();
    renderGrid();
    renderMyResponses();
    renderMyPosted();
    setRole('farmer');

    ['cbCatFilter','cbUrgencyFilter','cbSortFilter'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.addEventListener('change', renderGrid);
    });

    const reqSelect = document.getElementById('cbReqSelect');
    if(reqSelect) reqSelect.addEventListener('change', syncSuggestedPrice);

    const priceInput = document.getElementById('cbYourPrice');
    if(priceInput) priceInput.addEventListener('input', updatePriceHint);

    const respondForm = document.getElementById('cbRespondForm');
    if(respondForm) respondForm.addEventListener('submit', handleRespondSubmit);

    const postForm = document.getElementById('cbPostForm');
    if(postForm) postForm.addEventListener('submit', handlePostSubmit);

    const farmerBtn = document.getElementById('cbRoleFarmerBtn');
    const companyBtn = document.getElementById('cbRoleCompanyBtn');
    if(farmerBtn) farmerBtn.addEventListener('click', ()=> setRole('farmer'));
    if(companyBtn) companyBtn.addEventListener('click', ()=> setRole('company'));
  });

  // Kept for parity with the other page modules — gotoPage() calls
  // this if present when the Company page tab is shown.
  window.ksCompanyPageShown = function(){};

  // Called by script.js's applyLang() whenever the site language
  // changes, so the requirements grid, dropdowns, and "my" lists —
  // all built dynamically in JS — re-render in the new language.
  window.ksCompanyRefreshLang = function(){
    populateReqSelect();
    populateCropNeededSelect();
    renderGrid();
    renderMyResponses();
    renderMyPosted();
    updatePriceHint();
  };

})();
