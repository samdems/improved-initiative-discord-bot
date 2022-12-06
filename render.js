export default (data) => {
    const output = [];
  data.Combatants.forEach((el, index) => {
    index++;
    el.active = data.ActiveCombatantId === el.Id;
    const HPDisplay = el.HPDisplay.replace(/<[^>]*>?/gm, "");
    let string = `│ ${index.toString().padEnd(2)} | ${el.Name.substr(
      0,
      15
    ).padEnd(15)} │ ${el.Initiative.toString().padEnd(2)} │ ${HPDisplay.substr(
      0,
      4
    ).padEnd(4)} │`;
    string = !el.active ? string : string.replaceAll(" ", "_");
    string = HPDisplay != "Defeated" ? string : string.replaceAll(" ", "#");
    output.push(string);
    output.push(
      `│ ${el.Tags.map((el) => el.Text)
        .join("|")
        .padEnd(33)}│`
    );
  });
  const msg =
    "```elm\n" +
    "┌".padEnd(35, "─") +
    "┐\n" +
    output.join("\n") +
    "\n" +
    "└".padEnd(35, "─") +
    "┘\n" +
    "\n```";
    return msg;
};
