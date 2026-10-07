/* =========================================================
   KHETSETU DELIVERY MODULE
   - Lets a buyer order produce straight from the Marketplace
     for home delivery, instead of visiting a mandi.
   - Reuses the SAME `produce` array already defined in
     script.js (name, price, image, category, farmer/location)
     as the single source of truth for crop/vegetable details —
     nothing here re-defines or duplicates that data.
   - "Add to cart" buttons live on the Marketplace produce cards
     (see script.js renderProduce()); this module owns the cart,
     the delivery-address checkout form, and "My orders" history.
   ========================================================= */
(function(){

  const DELIVERY_FEE = 25;              // flat illustrative delivery fee
  const FREE_DELIVERY_ABOVE = 500;       // waived above this subtotal

  let cart = [];        // { name, price, img, farmer, cat, qty }
  let myOrders = [];     // { id, items:[...], subtotal, deliveryFee, total, address, placedAt }
  let orderSeq = 1;

  /* ---------------------------------------------------------
     LANGUAGE PACK — every string this module builds dynamically
     in JS (cart rows, order rows, empty states, confirmation).
     Static page text (kicker, title, form field labels) is
     handled by script.js's own `dict` + data-i18n system, same
     split used by the Export and Weather modules.
     --------------------------------------------------------- */
  const DL_I18N = {
    en:{ qty:"Qty", remove:"Remove", each:"each",
      emptyCartTitle:"Your cart is empty.",
      emptyCartCta:"Browse the Marketplace →",
      subtotal:"Subtotal", deliveryFee:"Delivery fee", freeDelivery:"Free",
      total:"Total", freeDeliveryHint:"Free delivery on orders over ₹{amt}",
      orderIdLabel:"Order #", placedOn:"Placed", statusConfirmed:"Confirmed",
      estDelivery:"Est. delivery", etaText:"2–3 days",
      noOrders:"No orders yet — items you order will appear here.",
      orderedFrom:"From", itemsWord:"items", itemWord:"item",
      fillRequired:"Please fill in your name, phone, address and pincode before placing the order." },
    hi:{ qty:"मात्रा", remove:"हटाएं", each:"प्रति यूनिट",
      emptyCartTitle:"आपकी कार्ट खाली है।",
      emptyCartCta:"मार्केटप्लेस देखें →",
      subtotal:"उप-योग", deliveryFee:"डिलीवरी शुल्क", freeDelivery:"मुफ़्त",
      total:"कुल", freeDeliveryHint:"₹{amt} से अधिक के ऑर्डर पर मुफ़्त डिलीवरी",
      orderIdLabel:"ऑर्डर #", placedOn:"दिया गया", statusConfirmed:"पुष्ट",
      estDelivery:"अनुमानित डिलीवरी", etaText:"2–3 दिन",
      noOrders:"अभी तक कोई ऑर्डर नहीं — आपके ऑर्डर यहाँ दिखेंगे।",
      orderedFrom:"से", itemsWord:"वस्तुएं", itemWord:"वस्तु",
      fillRequired:"ऑर्डर देने से पहले कृपया अपना नाम, फ़ोन, पता और पिनकोड भरें।" },
    te:{ qty:"పరిమాణం", remove:"తీసివేయండి", each:"ఒక్కొక్కటి",
      emptyCartTitle:"మీ కార్ట్ ఖాళీగా ఉంది.",
      emptyCartCta:"మార్కెట్‌ప్లేస్ చూడండి →",
      subtotal:"ఉప-మొత్తం", deliveryFee:"డెలివరీ ఛార్జీ", freeDelivery:"ఉచితం",
      total:"మొత్తం", freeDeliveryHint:"₹{amt} కంటే ఎక్కువ ఆర్డర్లపై ఉచిత డెలివరీ",
      orderIdLabel:"ఆర్డర్ #", placedOn:"ఇవ్వబడింది", statusConfirmed:"నిర్ధారించబడింది",
      estDelivery:"అంచనా డెలివరీ", etaText:"2–3 రోజులు",
      noOrders:"ఇంకా ఆర్డర్లు లేవు — మీ ఆర్డర్లు ఇక్కడ కనిపిస్తాయి.",
      orderedFrom:"నుండి", itemsWord:"వస్తువులు", itemWord:"వస్తువు",
      fillRequired:"ఆర్డర్ చేసే ముందు దయచేసి మీ పేరు, ఫోన్, చిరునామా మరియు పిన్‌కోడ్ నమోదు చేయండి." },
    ta:{ qty:"அளவு", remove:"அகற்று", each:"ஒன்றுக்கு",
      emptyCartTitle:"உங்கள் கார்ட் காலியாக உள்ளது.",
      emptyCartCta:"மார்க்கெட்பிளேஸைப் பார்க்கவும் →",
      subtotal:"துணைத்தொகை", deliveryFee:"டெலிவரி கட்டணம்", freeDelivery:"இலவசம்",
      total:"மொத்தம்", freeDeliveryHint:"₹{amt}க்கு மேல் ஆர்டர்களுக்கு இலவச டெலிவரி",
      orderIdLabel:"ஆர்டர் #", placedOn:"வைக்கப்பட்டது", statusConfirmed:"உறுதிசெய்யப்பட்டது",
      estDelivery:"மதிப்பிடப்பட்ட டெலிவரி", etaText:"2–3 நாட்கள்",
      noOrders:"இதுவரை ஆர்டர்கள் இல்லை — உங்கள் ஆர்டர்கள் இங்கே தோன்றும்.",
      orderedFrom:"இருந்து", itemsWord:"பொருட்கள்", itemWord:"பொருள்",
      fillRequired:"ஆர்டர் செய்யும் முன் உங்கள் பெயர், தொலைபேசி, முகவரி மற்றும் பின்கோடை நிரப்பவும்." },
    ml:{ qty:"അളവ്", remove:"നീക്കം ചെയ്യുക", each:"ഓരോന്നിനും",
      emptyCartTitle:"നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്.",
      emptyCartCta:"മാർക്കറ്റ്‌പ്ലേസ് കാണുക →",
      subtotal:"ഉപ-ആകെത്തുക", deliveryFee:"ഡെലിവറി ചാർജ്", freeDelivery:"സൗജന്യം",
      total:"ആകെത്തുക", freeDeliveryHint:"₹{amt}-ൽ കൂടുതലുള്ള ഓർഡറുകൾക്ക് സൗജന്യ ഡെലിവറി",
      orderIdLabel:"ഓർഡർ #", placedOn:"നൽകിയത്", statusConfirmed:"സ്ഥിരീകരിച്ചു",
      estDelivery:"ഏകദേശ ഡെലിവറി", etaText:"2–3 ദിവസം",
      noOrders:"ഇതുവരെ ഓർഡറുകൾ ഇല്ല — നിങ്ങളുടെ ഓർഡറുകൾ ഇവിടെ ദൃശ്യമാകും.",
      orderedFrom:"നിന്ന്", itemsWord:"ഇനങ്ങൾ", itemWord:"ഇനം",
      fillRequired:"ഓർഡർ ചെയ്യുന്നതിന് മുമ്പ് നിങ്ങളുടെ പേര്, ഫോൺ, വിലാസം, പിൻകോഡ് എന്നിവ പൂരിപ്പിക്കുക." },
    kn:{ qty:"ಪ್ರಮಾಣ", remove:"ತೆಗೆದುಹಾಕಿ", each:"ಪ್ರತಿಯೊಂದಕ್ಕೂ",
      emptyCartTitle:"ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ.",
      emptyCartCta:"ಮಾರುಕಟ್ಟೆ ವೀಕ್ಷಿಸಿ →",
      subtotal:"ಉಪ-ಮೊತ್ತ", deliveryFee:"ವಿತರಣಾ ಶುಲ್ಕ", freeDelivery:"ಉಚಿತ",
      total:"ಒಟ್ಟು", freeDeliveryHint:"₹{amt}ಗಿಂತ ಹೆಚ್ಚಿನ ಆರ್ಡರ್‌ಗಳಿಗೆ ಉಚಿತ ವಿತರಣೆ",
      orderIdLabel:"ಆರ್ಡರ್ #", placedOn:"ಇಡಲಾಗಿದೆ", statusConfirmed:"ದೃಢಪಡಿಸಲಾಗಿದೆ",
      estDelivery:"ಅಂದಾಜು ವಿತರಣೆ", etaText:"2–3 ದಿನಗಳು",
      noOrders:"ಇನ್ನೂ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ — ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
      orderedFrom:"ಇಂದ", itemsWord:"ವಸ್ತುಗಳು", itemWord:"ವಸ್ತು",
      fillRequired:"ಆರ್ಡರ್ ಮಾಡುವ ಮೊದಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು, ಫೋನ್, ವಿಳಾಸ ಮತ್ತು ಪಿನ್‌ಕೋಡ್ ಭರ್ತಿ ಮಾಡಿ." }
  };
  function dlLang(){
    var l = (typeof currentLang !== 'undefined' && DL_I18N[currentLang]) ? currentLang : 'en';
    return DL_I18N[l];
  }
  function mainPack(){
    return (typeof dict !== 'undefined' && dict[currentLang]) ? dict[currentLang] : (typeof dict !== 'undefined' ? dict.en : {});
  }

  /* ---------------------------------------------------------
     CART
     --------------------------------------------------------- */
  function findCartIndex(name){ return cart.findIndex(c => c.name === name); }

  // Called from the Marketplace "Add to cart" button (script.js).
  // `item` is a produce-array entry, so name/price/img/cat/farmer
  // all come straight from the Marketplace's own data.
  window.ksAddToCart = function(item){
    if(!item) return;
    const idx = findCartIndex(item.name);
    if(idx >= 0) cart[idx].qty += 1;
    else cart.push({ name:item.name, price:item.price, img:item.img, farmer:item.farmer, cat:item.cat, qty:1 });
    updateCartBadge();
    renderCart();
    flashAdded(item.name);
  };

  function flashAdded(name){
    const toast = document.getElementById('dlAddToast');
    if(!toast) return;
    toast.textContent = '✓ ' + name;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(()=> toast.classList.remove('show'), 1800);
  }

  function updateCartBadge(){
    const badge = document.getElementById('cartCountBadge');
    if(!badge) return;
    const count = cart.reduce((s,c)=> s + c.qty, 0);
    if(count > 0){ badge.textContent = count; badge.style.display = 'inline-flex'; }
    else { badge.style.display = 'none'; }
  }

  function changeQty(name, delta){
    const idx = findCartIndex(name);
    if(idx < 0) return;
    cart[idx].qty += delta;
    if(cart[idx].qty <= 0) cart.splice(idx,1);
    updateCartBadge();
    renderCart();
  }

  function removeItem(name){
    const idx = findCartIndex(name);
    if(idx >= 0) cart.splice(idx,1);
    updateCartBadge();
    renderCart();
  }

  function cartSubtotal(){ return cart.reduce((s,c)=> s + c.price*c.qty, 0); }
  function currentDeliveryFee(){ return cart.length && cartSubtotal() < FREE_DELIVERY_ABOVE ? DELIVERY_FEE : 0; }

  function renderCart(){
    const list = document.getElementById('dlCartList');
    const summary = document.getElementById('dlSummary');
    if(!list) return;
    const pack = dlLang();

    if(!cart.length){
      list.innerHTML = `<div class="dl-empty">
        <div>${pack.emptyCartTitle}</div>
        <button type="button" class="mini-btn" data-goto="marketplace" style="margin-top:10px;">${pack.emptyCartCta}</button>
      </div>`;
      list.querySelectorAll('[data-goto]').forEach(btn=>{
        btn.addEventListener('click', ()=> gotoPage(btn.dataset.goto));
      });
      if(summary) summary.style.display = 'none';
      return;
    }

    if(summary) summary.style.display = '';

    list.innerHTML = cart.map(c=>`
      <div class="dl-cart-row">
        <img src="${c.img||''}" alt="${c.name}" loading="lazy">
        <div class="dl-cart-main">
          <b>${c.name}</b>
          <div class="dl-cart-sub">${c.farmer||''}</div>
          <div class="dl-cart-sub">₹${c.price} ${pack.each}</div>
        </div>
        <div class="dl-qty-stepper">
          <button type="button" class="dl-qty-btn" data-act="minus" data-name="${encodeURIComponent(c.name)}">−</button>
          <span>${c.qty}</span>
          <button type="button" class="dl-qty-btn" data-act="plus" data-name="${encodeURIComponent(c.name)}">+</button>
        </div>
        <div class="dl-line-total">₹${c.price*c.qty}</div>
        <button type="button" class="dl-remove-btn" data-name="${encodeURIComponent(c.name)}" title="${pack.remove}">✕</button>
      </div>
    `).join('');

    list.querySelectorAll('.dl-qty-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const name = decodeURIComponent(btn.dataset.name);
        changeQty(name, btn.dataset.act === 'plus' ? 1 : -1);
      });
    });
    list.querySelectorAll('.dl-remove-btn').forEach(btn=>{
      btn.addEventListener('click', ()=> removeItem(decodeURIComponent(btn.dataset.name)));
    });

    const sub = cartSubtotal();
    const fee = currentDeliveryFee();
    const subEl = document.getElementById('dlSubtotalVal');
    const feeEl = document.getElementById('dlFeeVal');
    const totEl = document.getElementById('dlTotalVal');
    const hintEl = document.getElementById('dlFreeHint');
    if(subEl) subEl.textContent = '₹' + sub;
    if(feeEl) feeEl.textContent = fee === 0 ? pack.freeDelivery : ('₹' + fee);
    if(totEl) totEl.textContent = '₹' + (sub + fee);
    if(hintEl) hintEl.textContent = pack.freeDeliveryHint.replace('{amt}', FREE_DELIVERY_ABOVE);
  }

  /* ---------------------------------------------------------
     CHECKOUT / ORDERS
     --------------------------------------------------------- */
  function renderMyOrders(){
    const list = document.getElementById('dlMyOrders');
    if(!list) return;
    const pack = dlLang();
    if(!myOrders.length){
      list.innerHTML = `<div class="dl-empty-hint">${pack.noOrders}</div>`;
      return;
    }
    list.innerHTML = myOrders.map(o=>{
      const itemsLine = o.items.map(it => `${it.name} ×${it.qty}`).join(', ');
      return `
      <div class="dl-order">
        <div class="dl-order-top">
          <b>${pack.orderIdLabel}${o.id}</b>
          <span class="dl-order-status">${pack.statusConfirmed}</span>
        </div>
        <div class="dl-order-items">${itemsLine}</div>
        <div class="dl-order-meta">
          <span>${pack.placedOn} ${o.placedAt}</span>
          <span>${pack.estDelivery}: ${pack.etaText}</span>
        </div>
        <div class="dl-order-addr">${pack.orderedFrom !== undefined ? '' : ''}${o.address}</div>
        <div class="dl-order-total">₹${o.total}</div>
      </div>`;
    }).join('');
  }

  function handleCheckoutSubmit(e){
    e.preventDefault();
    if(!cart.length) return;
    const pack = dlLang();
    const nameEl = document.getElementById('dlName');
    const phoneEl = document.getElementById('dlPhone');
    const addrEl = document.getElementById('dlAddress');
    const cityEl = document.getElementById('dlCity');
    const pinEl = document.getElementById('dlPincode');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const addr = addrEl ? addrEl.value.trim() : '';
    const city = cityEl ? cityEl.value.trim() : '';
    const pin = pinEl ? pinEl.value.trim() : '';

    if(!name || !phone || !addr || !pin){
      const warn = document.getElementById('dlFormWarning');
      if(warn){ warn.textContent = pack.fillRequired; warn.style.display = 'block'; }
      return;
    }
    const warn = document.getElementById('dlFormWarning');
    if(warn) warn.style.display = 'none';

    const sub = cartSubtotal();
    const fee = currentDeliveryFee();
    const now = new Date();

    myOrders.unshift({
      id: orderSeq++,
      items: cart.map(c=>({ name:c.name, qty:c.qty })),
      subtotal: sub,
      deliveryFee: fee,
      total: sub + fee,
      address: `${name} · ${phone} · ${addr}, ${city} ${pin}`.replace(/ ,/g,','),
      placedAt: now.toLocaleDateString([], { day:'2-digit', month:'short' }) + ' ' + now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
    });

    cart = [];
    updateCartBadge();
    renderCart();
    renderMyOrders();

    const msg = document.getElementById('dlConfirmMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderCart();
    renderMyOrders();
    updateCartBadge();
    const form = document.getElementById('deliveryForm');
    if(form) form.addEventListener('submit', handleCheckoutSubmit);
  });

  // Called by script.js's gotoPage() whenever the Delivery page is
  // shown — nothing needs lazy sizing, but this mirrors the pattern
  // used by the Export/Weather modules for consistency.
  window.ksDeliveryPageShown = function(){
    renderCart();
    renderMyOrders();
  };

  // Called by script.js's applyLang() whenever the site language
  // changes, so the cart, summary, and order history — all built
  // dynamically in JS — re-render in the new language.
  window.ksDeliveryRefreshLang = function(){
    renderCart();
    renderMyOrders();
  };

})();
