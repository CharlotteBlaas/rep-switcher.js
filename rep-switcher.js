(function () {
  function normalize(s) {
    return (s || "")
      .toString()
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function showRepCard() {
    // Deze placeholder wordt door jouw platform vervangen in de HTML vóórdat de pagina in de browser komt
    var repNameRaw = "{User.Vertegenwoordiger}";
    var repName = normalize(repNameRaw);

    var cards = document.querySelectorAll(".rep-highlight-card[data-rep]");
    if (!cards || !cards.length) return;

    // Alles verbergen
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }

    // Match tonen
    var shown = false;
    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var key = normalize(card.getAttribute("data-rep"));
      if (key && repName && key === repName) {
        card.style.display = "flex"; // jouw card is een flex-container
        shown = true;
        break;
      }
    }

    // Fallback: als er geen match is, toon de eerste kaart
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
