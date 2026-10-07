/* =========================================================
   KHETSETU EXPORT MODULE
   - Shows current overseas demand per crop (illustrative demo
     data): demand level, top destination countries, the price
     premium over today's mandi rate, and the paperwork needed.
   - Lets a farmer register a quantity of produce for export;
     the app "matches" it to the top destination for that crop
     and lists it under "My export listings".
   Reuses IMG from script.js (same global script scope) so
   thumbnails match the produce already shown elsewhere.
   ========================================================= */
(function(){

  const EXPORT_DATA = [
    { key:"tomato",  name:"Tomato",  img:IMG.tomato,  cat:"veg",   localPrice:32, demand:"medium", premium:15,
      destinations:["Bangladesh","Nepal","Sri Lanka"],
      requirements:["APEDA Registration","Phytosanitary Certificate"] },
    { key:"onion",   name:"Onion",   img:IMG.onion,   cat:"veg",   localPrice:24, demand:"high",   premium:28,
      destinations:["Bangladesh","Malaysia","UAE","Sri Lanka"],
      requirements:["APEDA Registration","Phytosanitary Certificate","Export Grading"] },
    { key:"potato",  name:"Potato",  img:IMG.potato,  cat:"veg",   localPrice:18, demand:"medium", premium:12,
      destinations:["Nepal","Sri Lanka","Malaysia"],
      requirements:["Phytosanitary Certificate","Cold-chain Packaging"] },
    { key:"mango",   name:"Mango",   img:IMG.mango,   cat:"fruit", localPrice:65, demand:"high",   premium:42,
      destinations:["UAE","United Kingdom","USA","Bangladesh"],
      requirements:["APEDA Registration","Vapour Heat Treatment","Residue Testing"] },
    { key:"banana",  name:"Banana",  img:IMG.banana,  cat:"fruit", localPrice:40, demand:"medium", premium:20,
      destinations:["UAE","Iran","Oman"],
      requirements:["APEDA Registration","Phytosanitary Certificate"] },
    { key:"wheat",   name:"Wheat",   img:IMG.wheat,   cat:"grain", localPrice:26, demand:"low",    premium:8,
      destinations:["Bangladesh","Nepal"],
      requirements:["FSSAI Quality Certificate"] },
    { key:"rice",    name:"Rice",    img:IMG.rice,    cat:"grain", localPrice:44, demand:"high",   premium:35,
      destinations:["Saudi Arabia","UAE","Iran","USA"],
      requirements:["APEDA Registration","Basmati Certification","Fumigation Certificate"] },
    { key:"spinach", name:"Spinach", img:IMG.spinach, cat:"veg",   localPrice:20, demand:"low",    premium:10,
      destinations:["Nepal","Bhutan"],
      requirements:["Phytosanitary Certificate","Cold-chain Packaging"] },
    { key:"grapes",  name:"Grapes",  img:IMG.grapes,  cat:"fruit", localPrice:58, demand:"high",   premium:38,
      destinations:["Netherlands","United Kingdom","Bangladesh","UAE"],
      requirements:["APEDA GrapeNet Registration","Residue Testing"] }
  ];

  /* ---------------------------------------------------------
     PLATFORM FEES — deducted from the export price shown above
     so a farmer always sees exactly what lands in their account.
     WEBSITE_FEE_PCT funds KhetSetu itself; UNION_FEE_PCT is
     remitted to the farmer's local union/cooperative, who verify
     quality grading and paperwork for export deals. Both are
     shown as separate, explicit line items — never bundled into
     one vague "fee" — and only apply to matched export deals,
     never to browsing demand data.
     --------------------------------------------------------- */
  const WEBSITE_FEE_PCT = 2;
  const UNION_FEE_PCT = 1;

  function feesFor(gross){
    const platformFee = +(gross * WEBSITE_FEE_PCT / 100).toFixed(2);
    const unionFee = +(gross * UNION_FEE_PCT / 100).toFixed(2);
    const net = +(gross - platformFee - unionFee).toFixed(2);
    return { platformFee, unionFee, net };
  }
  window.ksExportFeesFor = feesFor; // exposed for potential cross-module reuse

  const DEMAND_SCORE = { high:88, medium:56, low:28 };
  const COUNTRY_FLAG = {
    "Bangladesh":"🇧🇩","Nepal":"🇳🇵","Sri Lanka":"🇱🇰","Malaysia":"🇲🇾","UAE":"🇦🇪",
    "United Kingdom":"🇬🇧","USA":"🇺🇸","Iran":"🇮🇷","Oman":"🇴🇲","Saudi Arabia":"🇸🇦",
    "Netherlands":"🇳🇱","Bhutan":"🇧🇹"
  };

  /* ---------------------------------------------------------
     Destination-country and required-document names, translated.
     Keyed by the English string used in EXPORT_DATA so lookups
     (COUNTRY_FLAG, matching, etc.) still work off the English
     key; only the *display* text changes per language.
     --------------------------------------------------------- */
  const COUNTRY_I18N = {
    hi:{ "Bangladesh":"बांग्लादेश","Nepal":"नेपाल","Sri Lanka":"श्रीलंका","Malaysia":"मलेशिया","UAE":"यूएई",
      "United Kingdom":"यूनाइटेड किंगडम","USA":"अमेरिका","Iran":"ईरान","Oman":"ओमान","Saudi Arabia":"सऊदी अरब",
      "Netherlands":"नीदरलैंड","Bhutan":"भूटान" },
    te:{ "Bangladesh":"బంగ్లాదేశ్","Nepal":"నేపాల్","Sri Lanka":"శ్రీలంక","Malaysia":"మలేషియా","UAE":"యుఏఈ",
      "United Kingdom":"యునైటెడ్ కింగ్‌డమ్","USA":"అమెరికా","Iran":"ఇరాన్","Oman":"ఒమన్","Saudi Arabia":"సౌదీ అరేబియా",
      "Netherlands":"నెదర్లాండ్స్","Bhutan":"భూటాన్" },
    ta:{ "Bangladesh":"வங்காளதேசம்","Nepal":"நேபாளம்","Sri Lanka":"இலங்கை","Malaysia":"மலேசியா","UAE":"ஐக்கிய அரபு அமீரகம்",
      "United Kingdom":"ஐக்கிய இராச்சியம்","USA":"அமெரிக்கா","Iran":"ஈரான்","Oman":"ஓமான்","Saudi Arabia":"சவூதி அரேபியா",
      "Netherlands":"நெதர்லாந்து","Bhutan":"பூட்டான்" },
    ml:{ "Bangladesh":"ബംഗ്ലാദേശ്","Nepal":"നേപ്പാൾ","Sri Lanka":"ശ്രീലങ്ക","Malaysia":"മലേഷ്യ","UAE":"യുഎഇ",
      "United Kingdom":"യുണൈറ്റഡ് കിംഗ്ഡം","USA":"അമേരിക്ക","Iran":"ഇറാൻ","Oman":"ഒമാൻ","Saudi Arabia":"സൗദി അറേബ്യ",
      "Netherlands":"നെതർലാൻഡ്സ്","Bhutan":"ഭൂട്ടാൻ" },
    kn:{ "Bangladesh":"ಬಾಂಗ್ಲಾದೇಶ","Nepal":"ನೇಪಾಳ","Sri Lanka":"ಶ್ರೀಲಂಕಾ","Malaysia":"ಮಲೇಷಿಯಾ","UAE":"ಯುಎಇ",
      "United Kingdom":"ಯುನೈಟೆಡ್ ಕಿಂಗ್‌ಡಮ್","USA":"ಅಮೇರಿಕಾ","Iran":"ಇರಾನ್","Oman":"ಓಮನ್","Saudi Arabia":"ಸೌದಿ ಅರೇಬಿಯಾ",
      "Netherlands":"ನೆದರ್ಲ್ಯಾಂಡ್ಸ್","Bhutan":"ಭೂತಾನ್" }
  };

  const REQUIREMENT_I18N = {
    hi:{ "APEDA Registration":"APEDA पंजीकरण","Phytosanitary Certificate":"फाइटोसैनिटरी प्रमाणपत्र",
      "Export Grading":"निर्यात ग्रेडिंग","Cold-chain Packaging":"कोल्ड-चेन पैकेजिंग",
      "Vapour Heat Treatment":"वाष्प ताप उपचार","Residue Testing":"अवशेष परीक्षण",
      "FSSAI Quality Certificate":"FSSAI गुणवत्ता प्रमाणपत्र","Basmati Certification":"बासमती प्रमाणीकरण",
      "Fumigation Certificate":"धूमन प्रमाणपत्र","APEDA GrapeNet Registration":"APEDA ग्रेपनेट पंजीकरण" },
    te:{ "APEDA Registration":"APEDA నమోదు","Phytosanitary Certificate":"ఫైటోశానిటరీ సర్టిఫికేట్",
      "Export Grading":"ఎగుమతి గ్రేడింగ్","Cold-chain Packaging":"కోల్డ్-చైన్ ప్యాకేజింగ్",
      "Vapour Heat Treatment":"ఆవిరి ఉష్ణ చికిత్స","Residue Testing":"అవశేష పరీక్ష",
      "FSSAI Quality Certificate":"FSSAI నాణ్యత సర్టిఫికేట్","Basmati Certification":"బాస్మతి ధృవీకరణ",
      "Fumigation Certificate":"ధూమీకరణ సర్టిఫికేట్","APEDA GrapeNet Registration":"APEDA గ్రేప్‌నెట్ నమోదు" },
    ta:{ "APEDA Registration":"APEDA பதிவு","Phytosanitary Certificate":"தாவர சுகாதார சான்றிதழ்",
      "Export Grading":"ஏற்றுமதி தரப்படுத்தல்","Cold-chain Packaging":"குளிர்சாதன பேக்கேஜிங்",
      "Vapour Heat Treatment":"நீராவி வெப்ப சிகிச்சை","Residue Testing":"எச்ச பரிசோதனை",
      "FSSAI Quality Certificate":"FSSAI தரச் சான்றிதழ்","Basmati Certification":"பாஸ்மதி சான்றளிப்பு",
      "Fumigation Certificate":"புகைப்படுத்தல் சான்றிதழ்","APEDA GrapeNet Registration":"APEDA கிரேப்நெட் பதிவு" },
    ml:{ "APEDA Registration":"APEDA രജിസ്ട്രേഷൻ","Phytosanitary Certificate":"ഫൈറ്റോസാനിറ്ററി സർട്ടിഫിക്കറ്റ്",
      "Export Grading":"കയറ്റുമതി ഗ്രേഡിംഗ്","Cold-chain Packaging":"കോൾഡ്-ചെയിൻ പാക്കേജിംഗ്",
      "Vapour Heat Treatment":"നീരാവി താപ ചികിത്സ","Residue Testing":"അവശിഷ്ട പരിശോധന",
      "FSSAI Quality Certificate":"FSSAI ഗുണനിലവാര സർട്ടിഫിക്കറ്റ്","Basmati Certification":"ബസ്മതി സർട്ടിഫിക്കേഷൻ",
      "Fumigation Certificate":"ഫ്യൂമിഗേഷൻ സർട്ടിഫിക്കറ്റ്","APEDA GrapeNet Registration":"APEDA ഗ്രേപ്നെറ്റ് രജിസ്ട്രേഷൻ" },
    kn:{ "APEDA Registration":"APEDA ನೋಂದಣಿ","Phytosanitary Certificate":"ಫೈಟೊಸ್ಯಾನಿಟರಿ ಪ್ರಮಾಣಪತ್ರ",
      "Export Grading":"ರಫ್ತು ಗ್ರೇಡಿಂಗ್","Cold-chain Packaging":"ಕೋಲ್ಡ್-ಚೈನ್ ಪ್ಯಾಕೇಜಿಂಗ್",
      "Vapour Heat Treatment":"ಆವಿ ಶಾಖ ಚಿಕಿತ್ಸೆ","Residue Testing":"ಅವಶೇಷ ಪರೀಕ್ಷೆ",
      "FSSAI Quality Certificate":"FSSAI ಗುಣಮಟ್ಟ ಪ್ರಮಾಣಪತ್ರ","Basmati Certification":"ಬಾಸ್ಮತಿ ಪ್ರಮಾಣೀಕರಣ",
      "Fumigation Certificate":"ಫ್ಯೂಮಿಗೇಷನ್ ಪ್ರಮಾಣಪತ್ರ","APEDA GrapeNet Registration":"APEDA ಗ್ರೇಪ್‌ನೆಟ್ ನೋಂದಣಿ" }
  };

  function countryName(c){
    var l = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    return (COUNTRY_I18N[l] && COUNTRY_I18N[l][c]) || c;
  }
  function reqName(r){
    var l = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    return (REQUIREMENT_I18N[l] && REQUIREMENT_I18N[l][r]) || r;
  }

  /* ---------------------------------------------------------
     LANGUAGE PACK — labels and crop names this module builds
     dynamically in JS (cards, form, my-listings). The static
     page text (kicker, title, filters, form field labels) is
     handled separately by script.js's own `dict` + data-i18n
     system. Destination country names and required-document
     names are translated via COUNTRY_I18N / REQUIREMENT_I18N
     above (acronyms like APEDA/FSSAI are kept, matching how
     they appear in real Indian trade/government paperwork).
     --------------------------------------------------------- */
  const EX_I18N = {
    en:{ demand:{high:"High demand",medium:"Medium demand",low:"Low demand"},
      mandiPrice:"Mandi price", exportPrice:"Export price", premium:"Premium",
      platformFee:"Website commission (2%)", unionFee:"Farmer union commission (1%)", youReceive:"You receive",
      feeNote:"A small, transparent commission funds the platform and your farmer union — deducted only on a matched deal, shown before you list.",
      topDest:"Top destinations", docsNeeded:"Docs needed", listBtn:"List this crop for export →",
      noMatch:"No crops match this filter yet — try widening it.",
      emptyHint:"No export listings yet — register your produce below and we\u2019ll match it to a buyer.",
      matchedBuyerIn:"Matched buyer in ", est:"Est.", statusMatched:"Matched",
      gradeWord:"Grade", gradeShort:{A:"A",B:"B",Std:"Standard"},
      crop:{tomato:"Tomato",onion:"Onion",potato:"Potato",mango:"Mango",banana:"Banana",wheat:"Wheat",rice:"Rice",spinach:"Spinach",grapes:"Grapes"} },
    hi:{ demand:{high:"उच्च मांग",medium:"मध्यम मांग",low:"कम मांग"},
      mandiPrice:"मंडी मूल्य", exportPrice:"निर्यात मूल्य", premium:"प्रीमियम",
      platformFee:"वेबसाइट कमीशन (2%)", unionFee:"किसान संघ कमीशन (1%)", youReceive:"आपको मिलेगा",
      feeNote:"एक छोटा, पारदर्शी कमीशन प्लेटफ़ॉर्म और आपके किसान संघ को चलाने में मदद करता है — केवल मिलान हुए सौदे पर लिया जाता है, सूचीबद्ध करने से पहले ही दिखाया जाता है।",
      topDest:"शीर्ष गंतव्य", docsNeeded:"आवश्यक कागज़ात", listBtn:"इस फ़सल को निर्यात के लिए सूचीबद्ध करें →",
      noMatch:"इस फ़िल्टर से कोई फ़सल मेल नहीं खाती — दायरा बढ़ाकर देखें।",
      emptyHint:"अभी तक कोई निर्यात सूची नहीं — नीचे अपनी उपज पंजीकृत करें और हम इसे किसी खरीदार से मिलाएंगे।",
      matchedBuyerIn:"खरीदार से मिलान हुआ — ", est:"अनुमानित", statusMatched:"मिलान हुआ",
      gradeWord:"ग्रेड", gradeShort:{A:"A",B:"B",Std:"मानक"},
      crop:{tomato:"टमाटर",onion:"प्याज़",potato:"आलू",mango:"आम",banana:"केला",wheat:"गेहूँ",rice:"चावल",spinach:"पालक",grapes:"अंगूर"} },
    te:{ demand:{high:"అధిక డిమాండ్",medium:"మధ్యస్థ డిమాండ్",low:"తక్కువ డిమాండ్"},
      mandiPrice:"మండి ధర", exportPrice:"ఎగుమతి ధర", premium:"ప్రీమియం",
      platformFee:"వెబ్‌సైట్ కమీషన్ (2%)", unionFee:"రైతు సంఘం కమీషన్ (1%)", youReceive:"మీకు అందేది",
      feeNote:"చిన్న, పారదర్శక కమీషన్ ప్లాట్‌ఫారమ్‌ను మరియు మీ రైతు సంఘాన్ని నడపడానికి సహాయపడుతుంది — మ్యాచ్ అయిన డీల్‌పై మాత్రమే తీసుకోబడుతుంది, జాబితా చేయడానికి ముందే చూపబడుతుంది.",
      topDest:"ప్రధాన గమ్యస్థానాలు", docsNeeded:"అవసరమైన పత్రాలు", listBtn:"ఈ పంటను ఎగుమతికి జాబితా చేయండి →",
      noMatch:"ఈ ఫిల్టర్‌కు ఏ పంటలు సరిపోలలేదు — విస్తృతం చేసి చూడండి.",
      emptyHint:"ఇంకా ఎగుమతి జాబితాలు లేవు — కింద మీ ఉత్పత్తిని నమోదు చేయండి, మేము దానిని కొనుగోలుదారుతో సరిపోల్చుతాము.",
      matchedBuyerIn:"కొనుగోలుదారు సరిపోల్చబడింది — ", est:"అంచనా", statusMatched:"సరిపోల్చబడింది",
      gradeWord:"గ్రేడ్", gradeShort:{A:"A",B:"B",Std:"ప్రామాణికం"},
      crop:{tomato:"టమాటా",onion:"ఉల్లిపాయ",potato:"బంగాళదుంప",mango:"మామిడి",banana:"అరటి",wheat:"గోధుమ",rice:"బియ్యం",spinach:"పాలకూర",grapes:"ద్రాక్ష"} },
    ta:{ demand:{high:"அதிக தேவை",medium:"நடுத்தர தேவை",low:"குறைந்த தேவை"},
      mandiPrice:"மண்டி விலை", exportPrice:"ஏற்றுமதி விலை", premium:"பிரீமியம்",
      platformFee:"வலைத்தள கமிஷன் (2%)", unionFee:"விவசாயி சங்க கமிஷன் (1%)", youReceive:"உங்களுக்கு கிடைப்பது",
      feeNote:"ஒரு சிறிய, வெளிப்படையான கமிஷன் தளத்தையும் உங்கள் விவசாயி சங்கத்தையும் இயக்க உதவுகிறது — பொருந்திய ஒப்பந்தத்தில் மட்டுமே கழிக்கப்படும், பட்டியலிடும் முன் காட்டப்படும்.",
      topDest:"முதன்மை இலக்குகள்", docsNeeded:"தேவையான ஆவணங்கள்", listBtn:"இந்த பயிரை ஏற்றுமதிக்கு பட்டியலிடுங்கள் →",
      noMatch:"இந்த வடிகட்டிக்கு பயிர்கள் எதுவும் பொருந்தவில்லை — அதை விரிவுபடுத்தி முயற்சிக்கவும்.",
      emptyHint:"இதுவரை ஏற்றுமதி பட்டியல்கள் இல்லை — கீழே உங்கள் விளைபொருளை பதிவு செய்யுங்கள், நாங்கள் அதை ஒரு வாங்குபவருடன் பொருத்துவோம்.",
      matchedBuyerIn:"வாங்குபவருடன் பொருத்தப்பட்டது — ", est:"மதிப்பிடப்பட்ட", statusMatched:"பொருத்தப்பட்டது",
      gradeWord:"தரம்", gradeShort:{A:"A",B:"B",Std:"தரநிலை"},
      crop:{tomato:"தக்காளி",onion:"வெங்காயம்",potato:"உருளைக்கிழங்கு",mango:"மாம்பழம்",banana:"வாழைப்பழம்",wheat:"கோதுமை",rice:"அரிசி",spinach:"கீரை",grapes:"திராட்சை"} },
    ml:{ demand:{high:"ഉയർന്ന ആവശ്യം",medium:"ഇടത്തരം ആവശ്യം",low:"കുറഞ്ഞ ആവശ്യം"},
      mandiPrice:"മണ്ഡി വില", exportPrice:"കയറ്റുമതി വില", premium:"പ്രീമിയം",
      platformFee:"വെബ്സൈറ്റ് കമ്മീഷൻ (2%)", unionFee:"കർഷക യൂണിയൻ കമ്മീഷൻ (1%)", youReceive:"നിങ്ങൾക്ക് ലഭിക്കുന്നത്",
      feeNote:"ഒരു ചെറിയ, സുതാര്യമായ കമ്മീഷൻ പ്ലാറ്റ്‌ഫോമും നിങ്ങളുടെ കർഷക യൂണിയനും പ്രവർത്തിപ്പിക്കാൻ സഹായിക്കുന്നു — പൊരുത്തപ്പെട്ട ഇടപാടിൽ മാത്രമേ ഈടാക്കൂ, ലിസ്റ്റ് ചെയ്യുന്നതിന് മുമ്പേ കാണിക്കും.",
      topDest:"പ്രധാന ലക്ഷ്യസ്ഥാനങ്ങൾ", docsNeeded:"ആവശ്യമായ രേഖകൾ", listBtn:"ഈ വിള കയറ്റുമതിക്കായി ലിസ്റ്റ് ചെയ്യുക →",
      noMatch:"ഈ ഫിൽട്ടറിന് ഒരു വിളയും പൊരുത്തപ്പെടുന്നില്ല — വിശാലമാക്കി നോക്കുക.",
      emptyHint:"ഇതുവരെ കയറ്റുമതി ലിസ്റ്റിംഗുകൾ ഇല്ല — താഴെ നിങ്ങളുടെ ഉൽപ്പന്നം രജിസ്റ്റർ ചെയ്യുക, ഞങ്ങൾ അത് ഒരു വാങ്ങുന്നയാളുമായി പൊരുത്തപ്പെടുത്തും.",
      matchedBuyerIn:"വാങ്ങുന്നയാളുമായി പൊരുത്തപ്പെടുത്തി — ", est:"ഏകദേശം", statusMatched:"പൊരുത്തപ്പെടുത്തി",
      gradeWord:"ഗ്രേഡ്", gradeShort:{A:"A",B:"B",Std:"സ്റ്റാൻഡേർഡ്"},
      crop:{tomato:"തക്കാളി",onion:"സവാള",potato:"ഉരുളക്കിഴങ്ങ്",mango:"മാമ്പഴം",banana:"വാഴപ്പഴം",wheat:"ഗോതമ്പ്",rice:"അരി",spinach:"ചീര",grapes:"മുന്തിരി"} },
    kn:{ demand:{high:"ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ",medium:"ಮಧ್ಯಮ ಬೇಡಿಕೆ",low:"ಕಡಿಮೆ ಬೇಡಿಕೆ"},
      mandiPrice:"ಮಂಡಿ ಬೆಲೆ", exportPrice:"ರಫ್ತು ಬೆಲೆ", premium:"ಪ್ರೀಮಿಯಂ",
      platformFee:"ವೆಬ್‌ಸೈಟ್ ಕಮಿಷನ್ (2%)", unionFee:"ರೈತ ಸಂಘ ಕಮಿಷನ್ (1%)", youReceive:"ನಿಮಗೆ ಸಿಗುವುದು",
      feeNote:"ಒಂದು ಸಣ್ಣ, ಪಾರದರ್ಶಕ ಕಮಿಷನ್ ವೇದಿಕೆ ಮತ್ತು ನಿಮ್ಮ ರೈತ ಸಂಘವನ್ನು ನಡೆಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ — ಹೊಂದಾಣಿಕೆಯಾದ ಒಪ್ಪಂದದ ಮೇಲೆ ಮಾತ್ರ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ, ಪಟ್ಟಿ ಮಾಡುವ ಮೊದಲೇ ತೋರಿಸಲಾಗುತ್ತದೆ.",
      topDest:"ಪ್ರಮುಖ ಗಮ್ಯಸ್ಥಾನಗಳು", docsNeeded:"ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು", listBtn:"ಈ ಬೆಳೆಯನ್ನು ರಫ್ತಿಗೆ ಪಟ್ಟಿ ಮಾಡಿ →",
      noMatch:"ಈ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಬೆಳೆಗಳು ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ — ವಿಸ್ತರಿಸಿ ಪ್ರಯತ್ನಿಸಿ.",
      emptyHint:"ಇನ್ನೂ ರಫ್ತು ಪಟ್ಟಿಗಳಿಲ್ಲ — ಕೆಳಗೆ ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ನೋಂದಾಯಿಸಿ, ನಾವು ಅದನ್ನು ಒಬ್ಬ ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಿಸುತ್ತೇವೆ.",
      matchedBuyerIn:"ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಿಸಲಾಗಿದೆ — ", est:"ಅಂದಾಜು", statusMatched:"ಹೊಂದಿಸಲಾಗಿದೆ",
      gradeWord:"ದರ್ಜೆ", gradeShort:{A:"A",B:"B",Std:"ಪ್ರಮಾಣಿತ"},
      crop:{tomato:"ಟೊಮೇಟೊ",onion:"ಈರುಳ್ಳಿ",potato:"ಆಲೂಗಡ್ಡೆ",mango:"ಮಾವು",banana:"ಬಾಳೆಹಣ್ಣು",wheat:"ಗೋಧಿ",rice:"ಅಕ್ಕಿ",spinach:"ಪಾಲಕ್",grapes:"ದ್ರಾಕ್ಷಿ"} }
  };
  function exLang(){
    var l = (typeof currentLang !== 'undefined' && EX_I18N[currentLang]) ? currentLang : 'en';
    return EX_I18N[l];
  }
  function gradeKeyFor(val){ return val === 'Export A' ? 'A' : (val === 'B' ? 'B' : 'Std'); }

  let myExports = [];   // { cropKey, qty, gradeKey, destination, price }
  let listingSeq = 1;

  function exportPriceFor(d){ return Math.round(d.localPrice * (1 + d.premium/100)); }

  function renderDemandGrid(){
    const grid = document.getElementById('exGrid');
    if(!grid) return;
    const pack = exLang();
    const catEl = document.getElementById('exCatFilter');
    const demEl = document.getElementById('exDemandFilter');
    const sortEl = document.getElementById('exSortFilter');
    const cat = catEl ? catEl.value : 'all';
    const level = demEl ? demEl.value : 'all';
    const sortMode = sortEl ? sortEl.value : 'demand';

    let list = EXPORT_DATA.filter(d => (cat === 'all' || d.cat === cat) && (level === 'all' || d.demand === level));
    list = list.slice();
    if(sortMode === 'premiumHigh') list.sort((a,b)=> b.premium - a.premium);
    else if(sortMode === 'premiumLow') list.sort((a,b)=> a.premium - b.premium);
    else list.sort((a,b)=> DEMAND_SCORE[b.demand] - DEMAND_SCORE[a.demand]);

    if(!list.length){
      grid.innerHTML = `<div class="empty-note">${pack.noMatch}</div>`;
      return;
    }

    grid.innerHTML = list.map(d=>{
      const name = pack.crop[d.key] || d.name;
      const exportPrice = exportPriceFor(d);
      const fees = feesFor(exportPrice);
      const destChips = d.destinations.map(c=>`<span class="ex-chip">${COUNTRY_FLAG[c]||'🌍'} ${countryName(c)}</span>`).join('');
      const reqChips = d.requirements.map(r=>`<span class="ex-req-chip">${reqName(r)}</span>`).join('');
      return `
      <div class="ex-card">
        <div class="ex-card-head">
          <img src="${d.img||''}" alt="${name}" loading="lazy">
          <span class="ex-badge ex-${d.demand}">${pack.demand[d.demand]}</span>
        </div>
        <div class="ex-card-body">
          <h4>${name}</h4>
          <div class="ex-meter"><div class="ex-meter-fill ex-${d.demand}" style="width:${DEMAND_SCORE[d.demand]}%"></div></div>
          <div class="ex-price-row">
            <div><span class="l">${pack.mandiPrice}</span><span class="v">₹${d.localPrice}/kg</span></div>
            <div><span class="l">${pack.exportPrice}</span><span class="v up">₹${exportPrice}/kg</span></div>
            <div><span class="l">${pack.premium}</span><span class="v up">+${d.premium}%</span></div>
          </div>
          <div class="ex-fee-box">
            <div class="ex-fee-row"><span>${pack.platformFee}</span><span class="ex-fee-amt">−₹${fees.platformFee}/kg</span></div>
            <div class="ex-fee-row"><span>${pack.unionFee}</span><span class="ex-fee-amt">−₹${fees.unionFee}/kg</span></div>
            <div class="ex-net-row"><span>${pack.youReceive}</span><span class="ex-net-amt">₹${fees.net}/kg</span></div>
            <div class="ex-fee-note">${pack.feeNote}</div>
          </div>
          <div class="ex-sub">${pack.topDest}</div>
          <div class="ex-chip-row">${destChips}</div>
          <div class="ex-sub">${pack.docsNeeded}</div>
          <div class="ex-chip-row">${reqChips}</div>
          <button type="button" class="mini-btn ex-pick-btn" data-crop="${d.key}">${pack.listBtn}</button>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.ex-pick-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const sel = document.getElementById('exCropSelect');
        if(sel){ sel.value = btn.dataset.crop; }
        const form = document.getElementById('exportForm');
        if(form) form.scrollIntoView({ behavior:'smooth', block:'center' });
      });
    });
  }

  function populateCropSelect(){
    const sel = document.getElementById('exCropSelect');
    if(!sel) return;
    const pack = exLang();
    const prevValue = sel.value;
    sel.innerHTML = EXPORT_DATA.map(d=>`<option value="${d.key}">${pack.crop[d.key] || d.name}</option>`).join('');
    if(prevValue) sel.value = prevValue;
  }

  // Live "you'll receive ₹x/kg" hint on the register-for-export form,
  // updated whenever the selected crop changes, so the commission is
  // visible before the farmer submits.
  function updateExNetHint(){
    const sel = document.getElementById('exCropSelect');
    const hintEl = document.getElementById('exNetHint');
    if(!sel || !hintEl || !sel.value) { if(hintEl) hintEl.textContent=''; return; }
    const d = EXPORT_DATA.find(x => x.key === sel.value);
    if(!d) return;
    const pack = exLang();
    const fees = feesFor(exportPriceFor(d));
    hintEl.textContent = `${pack.platformFee} + ${pack.unionFee} → ${pack.youReceive}: ₹${fees.net}/kg`;
  }

  function renderMyExports(){
    const list = document.getElementById('exMyList');
    if(!list) return;
    const pack = exLang();
    if(!myExports.length){
      list.innerHTML = `<div class="ex-empty-hint">${pack.emptyHint}</div>`;
      return;
    }
    list.innerHTML = myExports.map(e=>{
      const fees = feesFor(e.price);
      return `
      <div class="ex-listing">
        <div class="ex-listing-main">
          <b>${pack.crop[e.cropKey] || e.cropKey}</b> · ${e.qty}kg · ${pack.gradeWord} ${pack.gradeShort[e.gradeKey] || e.gradeKey}
          <div class="ex-listing-sub">${pack.matchedBuyerIn}${COUNTRY_FLAG[e.destination]||'🌍'} ${countryName(e.destination)} · ${pack.est} ₹${e.price}/kg · <b>${pack.youReceive}: ₹${fees.net}/kg</b></div>
        </div>
        <span class="ex-status">${pack.statusMatched}</span>
      </div>
    `;}).join('');
  }

  function handleExportSubmit(e){
    e.preventDefault();
    const cropSel = document.getElementById('exCropSelect');
    const qtyEl = document.getElementById('exQty');
    const gradeEl = document.getElementById('exGrade');
    const d = EXPORT_DATA.find(x => x.key === (cropSel && cropSel.value));
    const qty = qtyEl ? qtyEl.value : '';
    const gradeKey = gradeKeyFor(gradeEl ? gradeEl.value : 'Export A');
    if(!d || !qty) return;

    myExports.unshift({
      id: listingSeq++,
      cropKey: d.key,
      qty,
      gradeKey,
      destination: d.destinations[0],
      price: exportPriceFor(d)
    });
    renderMyExports();

    const msg = document.getElementById('exConfirmMsg');
    if(msg){
      msg.classList.add('show');
      clearTimeout(msg._hideTimer);
      msg._hideTimer = setTimeout(()=> msg.classList.remove('show'), 6000);
    }
    e.target.reset();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    populateCropSelect();
    renderDemandGrid();
    renderMyExports();
    updateExNetHint();

    ['exCatFilter','exDemandFilter','exSortFilter'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.addEventListener('change', renderDemandGrid);
    });

    const cropSelect = document.getElementById('exCropSelect');
    if(cropSelect) cropSelect.addEventListener('change', updateExNetHint);

    const form = document.getElementById('exportForm');
    if(form) form.addEventListener('submit', handleExportSubmit);
  });

  // Kept for parity with the other page modules (weather, voicebot) —
  // nothing here needs to lazily size itself when the tab is shown,
  // but gotoPage() calls this if present.
  window.ksExportPageShown = function(){};

  // Called by script.js's applyLang() whenever the site language changes,
  // so the demand grid, crop dropdown, and "my export listings" — all
  // built dynamically in JS — re-render in the new language instead of
  // staying stuck in whatever language they first rendered in.
  window.ksExportRefreshLang = function(){
    populateCropSelect();
    renderDemandGrid();
    renderMyExports();
    updateExNetHint();
  };

})();
