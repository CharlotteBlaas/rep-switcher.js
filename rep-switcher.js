(function () {
  function normalize(s) {
    return (s || "")
      .toString()
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function getRepNameFromDom() {
    var el = document.getElementById("repNameHolder");
    if (!el) return "";
    return el.getAttribute("data-rep") || "";
  }

  function showRepCard() {
    var repNameRaw = getRepNameFromDom();
    var repName = normalize(repNameRaw);

    var cards = document.querySelectorAll(".rep-highlight-card[data-rep]");
    if (!cards || !cards.length) return;

    // alles verbergen
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }

    var shown = false;
    var matchedRep = "";

    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var keyRaw = card.getAttribute("data-rep") || "";
      var key = normalize(keyRaw);

      if (key && repName && key === repName) {
        card.style.display = "flex";
        shown = true;
        matchedRep = keyRaw;
        break;
      }
    }

    // Debug object zodat je in console kunt zien wat hij “denkt”
    window.__repSwitcherDebug = {
      repNameRaw: repNameRaw,
      repNameNormalized: repName,
      matched: shown,
      matchedRep: matchedRep,
      allReps: Array.prototype.map.call(cards, function (c) { return c.getAttribute("data-rep"); })
    };

    // fallback (alleen als geen match)
    if (!shown) {
      cards[0].style.display = "flex";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showRepCard);
  } else {
    showRepCard();
  }
})();
