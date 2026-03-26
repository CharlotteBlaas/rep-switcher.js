(function () {
  function normalize(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function showRepCard() {
    var holder = document.getElementById("repNameHolder");
    var fallback = document.getElementById("rep-fallback");
    var cards = document.querySelectorAll(".rep-highlight-card[data-rep]");

    var repNameRaw = holder ? (holder.getAttribute("data-rep") || "") : "";
    var repName = normalize(repNameRaw);

    // alles verbergen
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    if (fallback) fallback.style.display = "none";

    var matched = false;

    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var cardRepRaw = card.getAttribute("data-rep") || "";
      var cardRep = normalize(cardRepRaw);

      if (repName && cardRep === repName) {
        card.style.display = "flex";
        matched = true;
        break;
      }
    }

    if (!matched && fallback) {
      fallback.style.display = "flex";
    }

    window.__repSwitcherDebug = {
      repNameRaw: repNameRaw,
      repNameNormalized: repName,
      cardCount: cards.length,
      cards: Array.prototype.map.call(cards, function (card) {
        return {
          raw: card.getAttribute("data-rep"),
          normalized: normalize(card.getAttribute("data-rep"))
        };
      }),
      matched: matched
    };

    console.log("rep-switcher debug:", window.__repSwitcherDebug);
  }

  function initRepCard() {
    showRepCard();
    setTimeout(showRepCard, 250);
    setTimeout(showRepCard, 1000);
    setTimeout(showRepCard, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRepCard);
  } else {
    initRepCard();
  }

  window.addEventListener("load", initRepCard);
})();
