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

    // Alle rep kaarten (die hebben data-rep)
    var repCards = document.querySelectorAll(".rep-highlight-card[data-rep]");
    // Fallback kaart (heeft geen data-rep)
    var fallbackCard = document.getElementById("rep-fallback");

    // Niets gevonden? dan stoppen
    if (!repCards || !repCards.length) return;

    // Alles verbergen
    for (var i = 0; i < repCards.length; i++) {
      repCards[i].style.display = "none";
    }
    if (fallbackCard) fallbackCard.style.display = "none";

    // Match zoeken
    var matched = false;
    for (var j = 0; j < repCards.length; j++) {
      var card = repCards[j];
      var key = normalize(card.getAttribute("data-rep"));
      if (repName && key === repName) {
        card.style.display = "flex"; // jouw design gebruikt flex
        matched = true;
        break;
      }
    }

    // Geen match of lege vertegenwoordiger? -> fallback tonen
    if (!matched && fallbackCard) {
      fallbackCard.style.display = "flex";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showRepCard);
  } else {
    showRepCard();
  }
})();
