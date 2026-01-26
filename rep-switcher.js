(function () {
  function normalize(s) {
    return (s || "")
      .toString()
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function showRepCard() {
    var holder = document.getElementById("repNameHolder");
    var repNameRaw = holder ? (holder.getAttribute("data-rep") || "") : "";
    var repName = normalize(repNameRaw);

    var cards = document.querySelectorAll(".rep-highlight-card[data-rep]");
    if (!cards.length) return;

    // alles verbergen
    for (var i = 0; i < cards.length; i++) cards[i].style.display = "none";

    var matched = false;
    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var key = normalize(card.getAttribute("data-rep"));
      if (repName && key === repName) {
        card.style.display = "flex";
        matched = true;
        break;
      }
    }

    // Debug naar window
    window.__repSwitcherDebug = {
      repNameRaw: repNameRaw,
      repNameNormalized: repName,
      cards: Array.prototype.map.call(cards, function (c) { return c.getAttribute("data-rep"); }),
      matched: matched
    };

    // GEEN fallback: als geen match → blijft alles verborgen
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showRepCard);
  } else {
    showRepCard();
  }
})();
