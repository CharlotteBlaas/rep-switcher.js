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

    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }

    var shown = false;
    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var key = normalize(card.getAttribute("data-rep"));
      if (key && repName && key === repName) {
        card.style.display = "flex";
        shown = true;
        break;
      }
    }

    // Fallback: toon eerste kaart als er geen match is
    if (!shown) {
      cards[0].style.display = "flex";
      // Debug (optioneel):
      // console.warn("Geen match voor:", repNameRaw, "beschikbaar:", Array.from(cards).map(c => c.getAttribute("data-rep")));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showRepCard);
  } else {
    showRepCard();
  }
})();
