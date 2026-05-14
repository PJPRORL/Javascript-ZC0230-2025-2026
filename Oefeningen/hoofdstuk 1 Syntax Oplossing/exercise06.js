const leeftijd = Number(prompt('Geef je leeftijd in: '))

switch (true) {
  case leeftijd < 5:
    console.log("Je ticket is gratis.")
    break
  case leeftijd < 12:
    console.log("Je betaalt je ticket aan halve prijs.")
    break
  case leeftijd <= 55:
    console.log("Je krijgt geen korting.")
    break
  case leeftijd > 55:
    console.log("Je ticket is gratis.")
    break
  default:
    console.log("Je hebt geen geldige leeftijd ingegeven.")
    break
}